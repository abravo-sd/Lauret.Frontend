export const removeItemFromArr = (arr: any, item: any) => {
  var i = arr.indexOf(item);
  if (i !== -1) {
    arr.splice(i, 1);
  }
  return arr;
};
