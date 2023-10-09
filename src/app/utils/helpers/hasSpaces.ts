export const hasSpaces = (value: string): boolean => {
  const isValid = new RegExp(/\s/);
  return isValid.test(value);
};
