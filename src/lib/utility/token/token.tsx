export default function convertTokenToEuro(amount: string) {
  const value = parseFloat(amount);
  if (Number.isNaN(value)) {
    return 0;
  } else {
    return value;
  }
}
