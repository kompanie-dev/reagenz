import { dataRegistry } from "../frameworkState.js";
import { TemplateModuleBase } from "./templateModuleBase.js";
import { TokenReplacer } from "../utils/tokenReplacer.js";

export class ForTemplateModule extends TemplateModuleBase {
  matches(el) {
    return el.tagName === "TEMPLATE" && el.hasAttribute("for");
  }

  handleTemplate(forTemplate) {
    const iteratorName = forTemplate.getAttribute("iterator") ?? "index";
    const valueName = forTemplate.getAttribute("as") ?? "value";
    const forId = forTemplate.getAttribute("for");

    const items = dataRegistry.get(forId);
    const iterationNodes = [];

    for (let index = 0; index !== items.length; index++) {
      const fragment = forTemplate.content.cloneNode(true);
      const value = items[index];

      const walker = document.createTreeWalker(fragment, NodeFilter.SHOW_TEXT, null);
      let node = walker.nextNode();

      while (node !== null) {
        const next = walker.nextNode();
        node.nodeValue = TokenReplacer.replacePlaceholdersInText(node.nodeValue ?? "", valueName, value, iteratorName, index);
        node = next;
      }

      const elements = fragment.querySelectorAll("*");

      for (const element of elements) {
        const elementAttributes = Array.from(element.attributes ?? []);

        for (const attribute of elementAttributes) {
          if (!attribute.name.startsWith(".")) {
            continue;
          }

          const replacement = TokenReplacer.replacePlaceholdersInAttribute(attribute.value, valueName, value, iteratorName, index);

          if (replacement !== null) {
            attribute.value = replacement;
          }
        }
      }

      iterationNodes.push(...fragment.childNodes);
    }

    forTemplate.replaceWith(...iterationNodes);
  }
}
