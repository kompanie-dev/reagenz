import { TemplateModuleBase } from "./templateModuleBase.js";

export class IfTemplateModule extends TemplateModuleBase {
  matches(element) {
    return element.tagName === "TEMPLATE" && element.hasAttribute("if") === true;
  }

  handleTemplate(ifTemplate) {
    if (ifTemplate.getAttribute("if") === "true") {
      const fragment = ifTemplate.content.cloneNode(true);

      ifTemplate.replaceWith(...fragment.childNodes);
    }
    else {
      ifTemplate.remove();
    }
  }
}
