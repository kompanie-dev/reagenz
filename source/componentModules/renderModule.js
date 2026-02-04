export class RenderModule {
  run(context) {
    const template = document.createElement("template");
    template.innerHTML = context.component.render();

    context.template = template;
  }
}
