const generateFavicon = (emoji, {
    background = null,
    fontFamily = "Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif",
    fontSize = 56,
    size = 64
  } = {}) => {
  const canvas = document.createElement("canvas");
  canvas.height = size;
  canvas.width = size;

  const context = canvas.getContext("2d");

  if (background !== null) {
    context.fillStyle = background;
    context.fillRect(0, 0, size, size);
  }

  context.font = `${fontSize}px ${fontFamily}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(emoji, size / 2, size / 2);

  const dataUrl = canvas.toDataURL("image/png");

  let link = document.querySelector("link[rel~=\"icon\"]");

  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  link.href = dataUrl;
}

generateFavicon("🧪");
