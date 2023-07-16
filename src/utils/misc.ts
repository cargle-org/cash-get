import jwtDecode from "jwt-decode";

export const isObjectEmpty = (obj: Record<string, any>): boolean => {
  for (const _i in obj) return false;
  return true;
};

export const isAuthenticated = (token?: string | null) => {
  if (token) {
    try {
      const parsedToken = jwtDecode(token) as any;
      const date = new Date().getTime();
      const expirationDate = parsedToken?.exp * 1000;
      return date < expirationDate;
    } catch (error) {
      return false;
    }
  }
  return false;
};

export const nairaCurrencyFormatter = (num: number | string) => {
  return `₦${Intl.NumberFormat("en-US", {
    currencyDisplay: "symbol",
  }).format(parseFloat(`${num}`))}`;
};
