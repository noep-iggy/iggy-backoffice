export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}
export function hiddenText(
  text?: string,
  isVisible?: boolean
): string | undefined {
  if (isVisible || !text) {
    return text;
  }
  const isEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let hiddenPart = '';
  let visiblePart = '';
  let atIndex = 0;

  switch (true) {
    case isEmail.test(text):
      atIndex = text.indexOf('@');
      hiddenPart = text.substring(1, atIndex);
      if (hiddenPart.length > 4) {
        hiddenPart = hiddenPart.substring(0, 4);
      }
      hiddenPart = hiddenPart.replace(/[a-zA-Z0-9]/g, '*');
      visiblePart = text.charAt(0);
      return visiblePart + hiddenPart + text.substring(atIndex);

    case text.trim().length > 0:
      hiddenPart = text.substring(1);
      if (hiddenPart.length > 4) {
        hiddenPart = hiddenPart.substring(0, 4);
      }
      hiddenPart = hiddenPart.replace(/./g, '*');
      visiblePart = text.charAt(0);
      return visiblePart + hiddenPart;

    default:
      return '';
  }
}
