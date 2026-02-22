import { dataRegistry } from "../frameworkState.js";

export class TokenReplacer {
  static replacePlaceholdersInText(text, valueName, value, iteratorName, index) {
    const iteratorToken = `@${iteratorName}`;
    const valueToken = `@${valueName}`;
    const valueTokenWithPathRegex = new RegExp(`@${valueName}(?:\\.[A-Za-z_$][\\w$]*)+`, "g");

    let replaced = text.replace(valueTokenWithPathRegex, (match) => {
      const path = match.slice(valueToken.length + 1);
      const resolved = TokenReplacer.getPropertyPathValue(value, path);

      return resolved?.toString() ?? "";
    });

    if (replaced.includes(iteratorToken)) {
      replaced = replaced.split(iteratorToken).join(index.toString());
    }

    if (replaced.includes(valueToken)) {
      replaced = replaced.split(valueToken).join(value.toString());
    }

    return replaced;
  }

  static replacePlaceholdersInAttribute(attributeValue, valueName, value, iteratorName, index) {
    const valueToken = `@${valueName}`;
    const valueTokenWithPathRegex = new RegExp(`@${valueName}(?:\\.[A-Za-z_$][\\w$]*)+`, "g");

    if (attributeValue === valueToken) {
      const id = `dataID-${crypto.randomUUID()}`;
      dataRegistry.set(id, value);

      return id;
    }

    if (valueTokenWithPathRegex.test(attributeValue)) {
      const match = attributeValue.match(valueTokenWithPathRegex);

      if (match && match[0]) {
        const path = match[0].slice(valueToken.length + 1);
        const computed = TokenReplacer.getPropertyPathValue(value, path);

        if (computed !== undefined) {
          const id = `dataID-${crypto.randomUUID()}`;
          dataRegistry.set(id, computed);

          return id;
        }
      }
    }

    return null;
  }

  static getPropertyPathValue(obj, path) {
    const parts = path.split(".");
    let current = obj;

    for (const part of parts) {
      if (current === null || current === undefined) {
        return undefined;
      }

      current = current[part];
    }

    return current;
  }
}
