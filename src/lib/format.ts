export const formatPrice = (price: number, type: 'sale' | 'rent') => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });
  const formatted = formatter.format(price);
  return type === 'rent' ? `${formatted}/mo` : formatted;
};
