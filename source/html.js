import { dataRegistry } from "./frameworkState.js";

const storeInDataRegistry = (idPrefix, value) => {
  const id = `${idPrefix}-${crypto.randomUUID()}`;
  dataRegistry.set(id, value);

  return id;
};

export const html = (strings, ...values) =>
  strings
    .map((s, i) => {
      const value = values[i];
      let rendered;

      if (/\s\.\w+\s*=\s*["']?$/.test(s)) {
        rendered = storeInDataRegistry("dataID", value);
      }
      else if (/@\w+\s*=\s*["']?$/.test(s)) {
        rendered = storeInDataRegistry("eventID", value);
      }
      else if (/\sfor\s*=\s*["']?$/.test(s)) {
        rendered = storeInDataRegistry("forID", value);
      }
      else {
        rendered = typeof value === "boolean" || typeof value === "number" || typeof value === "string" ? value : "";
      }

      return s + rendered;
    })
    .join("");
