export const allowDigitOnly = (event: any) => {
  if (
    !(
      (event.which >= 48 && event.which <= 57) || // 0 ~ 9
      (event.which >= 37 && event.which <= 40) || // arrow
      event.which == 8
    )
  ) {
    event.preventDefault()
  }
}