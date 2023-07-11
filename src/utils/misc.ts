export const isObjectEmpty = (obj: Record<string, any>): boolean => {
  for (const _i in obj) return false;
  return true;
};
