export function calculateTotal(
  items: { price: string }[]
): number {
  return items.reduce((sum, item) => {
    const num = parseInt(item.price);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);
}
