export class IfTemplateModule {
  run({ template }) {
    this.#processIfTemplates(template.content);
  }

  #processIfTemplates(rootFragment) {
    while (true) {
      const deepest = this.#findDeepestIfTemplate(rootFragment);

      if (!deepest) {
        break;
      }

      if (deepest.getAttribute("if") === "true") {
        const fragment = deepest.content.cloneNode(true);
        deepest.replaceWith(...fragment.childNodes);
      }
      else {
        deepest.remove();
      }
    }
  }

  #findDeepestIfTemplate(root) {
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
          if (el.hasAttribute("if")) {
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
}
