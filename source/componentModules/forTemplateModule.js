import { dataRegistry } from "../frameworkState.js";
import { TemplateModuleBase } from "./templateModuleBase.js";

export class ForTemplateModule extends TemplateModuleBase {
  matches(el) {
    return el.tagName === "TEMPLATE" && el.hasAttribute("for");
  }

  handleTemplate(forTemplate) {
    this.#renderForTemplate(forTemplate);
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

    for (const element of elements) {
      const elementAttributes = Array.from(element.attributes ?? []);

      for (const attribute of elementAttributes) {
        if (!attribute.name.startsWith(".")) {
          continue;
        }

        let computed;

        if (attribute.value === valueToken) {
          computed = value;
        }
        else if (valueTokenWithPathRegex.test(attribute.value)) {
          const match = attribute.value.match(valueTokenWithPathRegex);

          if (match && match[0]) {
            const path = match[0].slice(valueToken.length + 1);
            computed = this.#getPropertyPathValue(value, path);
          }
        }

        if (computed !== undefined) {
          const id = `dataID-${crypto.randomUUID()}`;
          dataRegistry.set(id, computed);
          attribute.value = id;
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
