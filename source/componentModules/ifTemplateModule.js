import { TemplateModuleBase } from "./templateModuleBase.js";

export class IfTemplateModule extends TemplateModuleBase {
  matches(el) {
    return el.tagName === "TEMPLATE" && el.hasAttribute("if");
  }

  handleTemplate(templateEl) {
    if (templateEl.getAttribute("if") === "true") {
      const fragment = templateEl.content.cloneNode(true);
      templateEl.replaceWith(...fragment.childNodes);
    } else {
      templateEl.remove();
    }
  }
}
