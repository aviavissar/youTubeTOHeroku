export const findFromLocalStorageArray = (storageName, key, value) => {
  const tmpArray = JSON.parse(localStorage.getItem(storageName));
  const resolute = tmpArray.find((itm) => itm[key] == value);
  if (resolute === undefined) {
    return false;
  }
  return resolute;
};
