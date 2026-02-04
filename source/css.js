export const css = (strings, ...values) =>
  strings.map((s, i) => s + values[i]).join("");
