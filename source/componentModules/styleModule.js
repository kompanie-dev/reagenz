export class StyleModule {
  run({ component, template }) {
    if (component.styles === undefined) {
      return;
    }

    const styleElement = document.createElement("style");
    styleElement.innerHTML = component.styles;

    template.content.prepend(styleElement);
  }
}
