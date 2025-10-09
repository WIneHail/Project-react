
export const translateLanguageToFullname = (input: string) => {
  const languageDisplayNames = new Intl.DisplayNames(['ru'], { type: 'language' });
  if (!input) return 'Неизвестный'
  const resultLanguage = languageDisplayNames.of(input.toString());
  if (resultLanguage) {
    return resultLanguage.charAt(0).toUpperCase() + resultLanguage.slice(1)
  }
  return 'Неизвестный'
}

export const translateCurrency = (input: string | null) => {
  if (!input) return "Неизвестно"
  const resultAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(input));
  let formatedAmout = resultAmount.slice(1) + " " + resultAmount.charAt(0)
  return formatedAmout.replace(/[\,]/g, ' ')
}