import { dataRegistry } from "./frameworkState.js";

const storeInDataRegistry = (idPrefix, value) => {
  const id = `${idPrefix}-${crypto.randomUUID()}`;
  dataRegistry.set(id, value);

  return id;
};

const renderValue = (str, value) => {
  if (/\s\.\w+\s*=\s*["']?$/.test(str)) {
    return storeInDataRegistry("dataID", value);
  }

  if (/@\w+\s*=\s*["']?$/.test(str)) {
    return storeInDataRegistry("eventID", value);
  }

  if (/\sfor\s*=\s*["']?$/.test(str)) {
    return storeInDataRegistry("forID", value);
  }

  return (typeof value === "boolean" || typeof value === "number" || typeof value === "string") ? value : "";
};

export const html = (strings, ...values) =>
  strings.map((s, i) => s + renderValue(s, values[i])).join("");
