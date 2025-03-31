export function getCookie(name: string) {
  const cookieArr = document.cookie.split("; ");
  for (let cookie of cookieArr) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return value;
    }
  }
  return null;
}
