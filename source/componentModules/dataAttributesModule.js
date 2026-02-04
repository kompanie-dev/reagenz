import { dataRegistry } from "../frameworkState.js";

export class DataAttributesModule {
  run(context) {
    const elements = context.template.content.querySelectorAll("*");
    context.dataAttributeObjects = [];

    for (const element of elements) {
      const attributes = Array.from(element.attributes);

      for (const attribute of attributes) {
        if (attribute.name.startsWith(".") === false) {
          continue;
        }

        const propertyName = attribute.name.slice(1);
        const dataId = attribute.value;
        const value = dataRegistry.get(dataId);

        context.dataAttributeObjects.push({ element, propertyName, value });

        element.removeAttribute(attribute.name);
      }
    }
  }
}
