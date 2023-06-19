export const allowDigitOnly = (event: any) => {
  if (
    !(
      (event.which >= 48 && event.which <= 57) || // 0 ~ 9
      (event.which >= 37 && event.which <= 40) || // arrow
      event.which == 8
    )
  ) {
    event.preventDefault();
  }
};


export const cryptoDecimalFormat = (amount: number) => {
  const text = amount.toLocaleString(undefined, {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 16,
  });

  return parseFloat(text.replace(/,/g, ''));
}

export const currencyDecimalFormat = (amount: number, currency: string = 'USD') => {
  const text = amount.toLocaleString(undefined, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return parseFloat(currency.replace(/,/g, ''));
}