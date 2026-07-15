const TAX_KEYWORDS = [
  "tax",
  "income tax",
  "itr",
  "regime",
  "80c",
  "80d",
  "tds",
  "pan",
  "ais",
  "salary",
  "business income",
  "capital gains",
  "house property",
  "advance tax",
  "refund",
  "deduction",
  "form 16",
  "itr-1",
  "itr-2",
  "itr-3",
  "itr-4",
  "foreign assets",
  "rental income",
  "taxable income",
  "old regime",
  "new regime",
];

function isTaxRelatedQuestion(message = "") {
  const normalized = message.toLowerCase();
  return TAX_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

module.exports = { isTaxRelatedQuestion };
