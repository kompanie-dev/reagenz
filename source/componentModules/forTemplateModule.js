import { dataRegistry } from "../frameworkState.js";
import { TemplateModuleBase } from "./templateModuleBase.js";
import { TokenReplacer } from "../utilities/tokenReplacer.js";

export class ForTemplateModule extends TemplateModuleBase {
  matches(element) {
    return element.tagName === "TEMPLATE" && element.hasAttribute("for") === true;
  }

  handleTemplate(forTemplate) {
    const iteratorName = forTemplate.getAttribute("iterator") ?? "index";
    const valueName = forTemplate.getAttribute("as") ?? "value";
    const forId = forTemplate.getAttribute("for");

    const items = dataRegistry.get(forId);
    const iterationNodes = items.flatMap((value, index) => {
      const fragment = forTemplate.content.cloneNode(true);

      this.#replaceTextNodes(fragment, valueName, value, iteratorName, index);
      this.#replaceAttributes(fragment, valueName, value, iteratorName, index);
      
      return [...fragment.childNodes];
    });

    forTemplate.replaceWith(...iterationNodes);
  }

  #replaceAttributes(fragment, valueName, value, iteratorName, index) {
    const elements = fragment.querySelectorAll("*");

    for (const element of elements) {
      const elementAttributes = Array.from(element.attributes);

      for (const attribute of elementAttributes) {
        const replacementText = TokenReplacer.replacePlaceholdersInAttribute(attribute.value, valueName, value, iteratorName, index);

        if (replacementText !== null) {
          attribute.value = replacementText;
        }
      }
    }
  }

  #replaceTextNodes(fragment, valueName, value, iteratorName, index) {
    const treeWalker = document.createTreeWalker(fragment, NodeFilter.SHOW_TEXT, null);
    let node = treeWalker.nextNode();

    while (node !== null) {
      const next = treeWalker.nextNode();
      node.nodeValue = TokenReplacer.replacePlaceholdersInText(node.nodeValue ?? "", valueName, value, iteratorName, index);
      node = next;
    }
  }
}
