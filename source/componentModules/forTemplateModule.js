import { dataRegistry } from "../frameworkState.js";

export class ForTemplateModule {
  run({ template }) {
    this.#processForTemplates(template.content);
  }

  #processForTemplates(rootFragment) {
    while (true) {
      const deepest = this.#findDeepestForTemplate(rootFragment);

      if (!deepest) {
        break;
      }

      this.#renderForTemplate(deepest);
    }
  }

  #findDeepestForTemplate(root) {
    let deepest = null;
    let maxDepth = -1;

    const visit = (node, depth) => {
      if (!node) {
        return;
      }

      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        for (const child of node.childNodes) {
          if (child.nodeType === Node.ELEMENT_NODE) {
            visit(child, depth);
          }
        }

        return;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node;
        if (el.tagName === "TEMPLATE") {
          if (el.hasAttribute("for")) {
            if (depth > maxDepth) {
              maxDepth = depth;
              deepest = el;
            }
          }

          visit(el.content, depth + 1);

          return;
        }

        for (const child of el.children) {
          visit(child, depth + 1);
        }
      }
    };

    visit(root, 0);

    return deepest;
  }

  #renderForTemplate(forTemplate) {
    const iteratorName = forTemplate.getAttribute("iterator") ?? "index";
    const valueName = forTemplate.getAttribute("as") ?? "value";
    const forId = forTemplate.getAttribute("for");

    const items = dataRegistry.get(forId);
    const iterationNodes = [];

    for (let index = 0; index !== items.length; index++) {
      const fragment = forTemplate.content.cloneNode(true);
      const value = items[index];

      this.#replaceTokensInFragment(fragment, valueName, value, iteratorName, index);

      iterationNodes.push(...fragment.childNodes);
    }

    forTemplate.replaceWith(...iterationNodes);
  }

  #replaceTokensInFragment(fragment, valueName, value, iteratorName, index) {
    const iteratorToken = `@${iteratorName}`;
    const valueToken = `@${valueName}`;
    const valueTokenWithPathRegex = new RegExp(`@${valueName}(?:\\.[A-Za-z_$][\\w$]*)+`, "g");

    const walker = document.createTreeWalker(fragment, NodeFilter.SHOW_TEXT, null);
    let node = walker.nextNode();

    while (node !== null) {
      const next = walker.nextNode();

      let replaced = node.nodeValue ?? "";

      replaced = replaced.replace(valueTokenWithPathRegex, (match) => {
        const path = match.slice(valueToken.length + 1);
        const resolved = this.#getPropertyPathValue(value, path);

        return resolved.toString();
      });

      if (replaced.includes(iteratorToken)) {
        replaced = replaced.split(iteratorToken).join(index.toString());
      }

      if (replaced.includes(valueToken)) {
        replaced = replaced.split(valueToken).join(value.toString());
      }

      node.nodeValue = replaced;

      node = next;
    }

    // Also replace tokens inside property-binding attribute values (e.g., .todo="@value" or .todo="@value.path")
    const elements = fragment.querySelectorAll("*");

    for (const el of elements) {
      const attrs = Array.from(el.attributes ?? []);

      for (const attr of attrs) {
        if (!attr.name.startsWith(".")) {
          continue;
        }

        let computed;

        if (attr.value === valueToken) {
          computed = value;
        } else if (valueTokenWithPathRegex.test(attr.value)) {
          const match = attr.value.match(valueTokenWithPathRegex);
          if (match && match[0]) {
            const path = match[0].slice(valueToken.length + 1);
            computed = this.#getPropertyPathValue(value, path);
          }
        }

        if (computed !== undefined) {
          const id = `dataID-${crypto.randomUUID()}`;
          dataRegistry.set(id, computed);
          el.setAttribute(attr.name, id);
        }
      }
    }
  }

  #getPropertyPathValue(obj, path) {
    const parts = path.split(".");
    let current = obj;

    for (const part of parts) {
      if (current === null) {
        return undefined;
      }

      current = current[part];
    }

    return current;
  }
}
