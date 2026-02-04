import { dataRegistry } from "../frameworkState.js";

export class EventAttributesModule {
  run(context) {
    if (context.component.eventAttributeListeners === undefined) {
      context.component.eventAttributeListeners = new WeakMap();
    }

    const elements = context.template.content.querySelectorAll("*");
    context.eventBindings = [];

    for (const element of elements) {
      const attributes = Array.from(element.attributes);

      for (const attribute of attributes) {
        if (attribute.name.startsWith("@") === false) {
          continue;
        }

        const eventName = attribute.name.slice(1);
        const eventId = attribute.value;
        const handler = dataRegistry.get(eventId);

        context.eventBindings.push({ element, eventName, handler });

        element.removeAttribute(attribute.name);
      }
    }
  }

  dispose(component) {
    delete component.eventAttributeListeners;
  }
}
