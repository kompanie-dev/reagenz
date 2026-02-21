export class TemplateModuleBase {
  run({ template }) {
    while (true) {
      const deepest = this.#findDeepestTemplate(template.content);

      if (deepest === null) {
        break;
      }

      this.handleTemplate(deepest);
    }
  }

  #findDeepestTemplate(rootElement) {
    let deepest = null;
    let maxDepth = -1;

    const visit = (node, depth) => {
      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        for (const child of node.childNodes) {
          if (child.nodeType === Node.ELEMENT_NODE) {
            visit(child, depth);
          }
        }

        return;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        if (this.matches(node) && depth > maxDepth) {
            maxDepth = depth;
            deepest = node;
        }

        if (node.tagName === "TEMPLATE") {
          visit(node.content, depth + 1);

          return;
        }

        for (const child of node.children) {
          visit(child, depth + 1);
        }
      }
    };

    visit(rootElement, 0);

    return deepest;
  }

  /*
   * Subclasses should override these
   */
  matches(element) {
    return false;
  }

  handleTemplate(templateElement) {
    // no-op
  }
}
