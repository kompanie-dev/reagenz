export class HtmlPatcherModule {
  run({ component, template, eventBindings = [], dataAttributeObjects = [] }) {
    const cloned = template.content.cloneNode(true);
    const eventBindingMap = new WeakMap();
    const propertyBindingMap = new WeakMap();

    this.#handleDataAttributes(
      dataAttributeObjects,
      template,
      cloned,
      propertyBindingMap,
    );

    this.#handleEventAttributes(
      eventBindings,
      template,
      cloned,
      eventBindingMap,
    );

    this.#patchChildren(
      component,
      cloned,
      component,
      eventBindingMap,
      propertyBindingMap,
    );
  }

  #applyNodeBindingsDeep(node, propertyBindingMap, eventBindingMap, component) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      this.#syncProperties(node, node, propertyBindingMap);
      this.#syncEvents(node, node, component, eventBindingMap);
    }

    let child = node.firstChild;

    while (child) {
      this.#applyNodeBindingsDeep(
        child,
        propertyBindingMap,
        eventBindingMap,
        component,
      );

      child = child.nextSibling;
    }
  }

  #buildNodePath(node, stopNode) {
    const path = [];
    let current = node;

    while (current && current !== stopNode) {
      const parent = current.parentNode;

      if (!parent) {
        return null;
      }

      const index = Array.prototype.indexOf.call(parent.childNodes, current);

      if (index < 0) {
        return null;
      }

      path.unshift(index);
      current = parent;
    }

    return path;
  }

  #canPatchNode(templateNode, liveNode) {
    if (
      !templateNode ||
      !liveNode ||
      templateNode.nodeType !== liveNode.nodeType
    ) {
      return false;
    }

    if (templateNode.nodeType === Node.ELEMENT_NODE) {
      return templateNode.tagName === liveNode.tagName;
    }

    return templateNode.nodeType === Node.TEXT_NODE;
  }

  #cleanupNode(node, component) {
    this.#removeNodeListeners(node, component);

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    let child = node.firstChild;

    while (child) {
      this.#cleanupNode(child, component);
      child = child.nextSibling;
    }
  }

  #findNodeInClone(templateNode, templateRoot, clonedRoot) {
    const path = this.#buildNodePath(templateNode, templateRoot);

    if (!path) {
      return null;
    }

    return this.#getNodeByPath(clonedRoot, path);
  }

  #getNodeByPath(root, path) {
    let current = root;

    for (const index of path) {
      current = current.childNodes[index];

      if (!current) {
        return null;
      }
    }

    return current;
  }

  #handleDataAttributes(
    dataAttributeObjects,
    template,
    cloned,
    propertyBindingMap,
  ) {
    for (const binding of dataAttributeObjects) {
      const originalElement = binding.element;
      const propertyName = binding.propertyName;

      const target = this.#findNodeInClone(
        originalElement,
        template.content,
        cloned,
      );

      const entry = propertyBindingMap.get(target) ?? [];
      entry.push({ propertyName, value: binding.value });

      propertyBindingMap.set(target, entry);
    }
  }

  #handleEventAttributes(eventBindings, template, cloned, eventBindingMap) {
    for (const binding of eventBindings) {
      const originalElement = binding.element;
      const eventName = binding.eventName;
      const handler = binding.handler;

      const target = this.#findNodeInClone(
        originalElement,
        template.content,
        cloned,
      );

      const entry = eventBindingMap.get(target) ?? [];
      entry.push({ eventName, handler });
      eventBindingMap.set(target, entry);
    }
  }

  #patchChildren(
    parent,
    templateParent,
    component,
    eventBindingMap,
    propertyBindingMap,
  ) {
    const newChildren = Array.from(templateParent.childNodes);
    let currentChild = parent.firstChild;

    for (const newChild of newChildren) {
      if (!currentChild) {
        this.#applyNodeBindingsDeep(
          newChild,
          propertyBindingMap,
          eventBindingMap,
          component,
        );

        parent.appendChild(newChild);

        continue;
      }

      if (this.#canPatchNode(newChild, currentChild)) {
        this.#patchNode(
          newChild,
          currentChild,
          component,
          eventBindingMap,
          propertyBindingMap,
        );
        currentChild = currentChild.nextSibling;

        continue;
      }

      this.#applyNodeBindingsDeep(
        newChild,
        propertyBindingMap,
        eventBindingMap,
        component,
      );

      parent.insertBefore(newChild, currentChild);
    }

    while (currentChild) {
      const nextSibling = currentChild.nextSibling;
      this.#cleanupNode(currentChild, component);
      parent.removeChild(currentChild);
      currentChild = nextSibling;
    }
  }

  #patchNode(
    templateNode,
    liveNode,
    component,
    eventBindingMap,
    propertyBindingMap,
  ) {
    if (templateNode.nodeType === Node.TEXT_NODE) {
      if (liveNode.textContent !== templateNode.textContent) {
        liveNode.textContent = templateNode.textContent;
      }

      return;
    }

    if (templateNode.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    this.#syncAttributes(templateNode, liveNode);
    this.#syncProperties(templateNode, liveNode, propertyBindingMap);
    this.#syncEvents(templateNode, liveNode, component, eventBindingMap);

    if (typeof liveNode?.runModules === "function") {
      return;
    }

    this.#patchChildren(
      liveNode,
      templateNode,
      component,
      eventBindingMap,
      propertyBindingMap,
    );
  }

  #removeNodeListeners(node, component) {
    const bindings = component.eventAttributeListeners.get(node);

    if (!bindings) {
      return;
    }

    for (const [eventName, handler] of Object.entries(bindings)) {
      node.removeEventListener(eventName, handler);
    }

    component.eventAttributeListeners.delete(node);
  }

  #syncAttributes(templateNode, liveNode) {
    const existingAttributes = Array.from(liveNode.attributes ?? []);

    for (const attr of existingAttributes) {
      if (templateNode.hasAttribute(attr.name)) {
        continue;
      }

      liveNode.removeAttribute(attr.name);
    }

    const templateAttributes = Array.from(templateNode.attributes ?? []);

    for (const attr of templateAttributes) {
      if (liveNode.getAttribute(attr.name) === attr.value) {
        continue;
      }

      liveNode.setAttribute(attr.name, attr.value);
    }
  }

  #syncEvents(templateNode, liveNode, component, eventBindingMap) {
    const desiredBindings = eventBindingMap.get(templateNode) ?? [];
    const currentBindings = component.eventAttributeListeners.get(liveNode) ?? {};

    for (const [eventName, handler] of Object.entries(currentBindings)) {
      const stillNeeded = desiredBindings.some(
        (binding) => binding.eventName === eventName,
      );

      if (stillNeeded) {
        continue;
      }

      liveNode.removeEventListener(eventName, handler);
      delete currentBindings[eventName];
    }

    for (const binding of desiredBindings) {
      const boundHandler = (event) => binding.handler.call(component, event);

      if (currentBindings[binding.eventName]) {
        liveNode.removeEventListener(
          binding.eventName,
          currentBindings[binding.eventName],
        );
      }

      liveNode.addEventListener(binding.eventName, boundHandler);
      currentBindings[binding.eventName] = boundHandler;
    }

    const hasBindings = Object.keys(currentBindings).length > 0;

    if (hasBindings) {
      component.eventAttributeListeners.set(liveNode, currentBindings);
    } else if (component.eventAttributeListeners.has(liveNode)) {
      component.eventAttributeListeners.delete(liveNode);
    }
  }

  #syncProperties(templateNode, liveNode, propertyBindingMap) {
    if (liveNode?.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    const bindings = propertyBindingMap.get(templateNode);

    if (!bindings || bindings.length === 0) {
      return;
    }

    let shouldRerender = false;

    for (const { propertyName, value } of bindings) {
      if (
        !propertyName ||
        value === undefined ||
        liveNode[propertyName] === value
      ) {
        continue;
      }

      liveNode[propertyName] = value;
      shouldRerender = true;
    }

    if (shouldRerender && typeof liveNode.runModules === "function") {
      liveNode.runModules();
    }
  }
}
