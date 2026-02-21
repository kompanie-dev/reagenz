export class TemplateModuleBase {
  run({ template }) {
    this.#processTemplates(template.content);
  }

  #processTemplates(rootFragment) {
    while (true) {
      const deepest = this.#findDeepestTemplate(rootFragment);

      if (!deepest) {
        break;
      }

      this.handleTemplate(deepest);
    }
  }

  #findDeepestTemplate(root) {
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
        
        if (this.matches(el) && depth > maxDepth) {
            maxDepth = depth;
            deepest = el;
        }

        if (el.tagName === "TEMPLATE") {
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
