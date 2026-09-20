export function formatCount(value: number): string {
  if (value < 1000) {
    return String(value);
  }

  const thousands = value / 1000;
  const rounded = Math.round(thousands * 10) / 10;

  return `${String(rounded)}K`;
}

export function formatRating(value: number): string {
  return value.toFixed(1);
}
