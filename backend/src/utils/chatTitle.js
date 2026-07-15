function createChatTitle(message = "") {
  const cleaned = message
    .replace(/[\r\n]+/g, " ")
    .replace(/[^\u0000-\u007f]/g, "")
    .trim();

  if (!cleaned) {
    return "Tax Chat";
  }

  const words = cleaned.split(/\s+/).slice(0, 6);
  const title = words.join(" ");
  return title.length > 42 ? `${title.slice(0, 39)}...` : title;
}

module.exports = { createChatTitle };
