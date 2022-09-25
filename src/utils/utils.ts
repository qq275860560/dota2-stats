export const sortArrayByField = (
  list: { [key: string]: any }[],
  fieldName: string,
  fieldValueType: string,
  order: "ascending" | "descending"
): void => {
  if (fieldValueType === "number") {
    if (order === "ascending") {
      list.sort((a, b) => a[fieldName] - b[fieldName]);
    } else if (order === "descending") {
      list.sort((a, b) => b[fieldName] - a[fieldName]);
    }
    return;
  }

  if (fieldValueType === "string") {
    if (order === "ascending") {
      list.sort((a, b) => {
        let aValue = a[fieldName].toString().toUpperCase();
        let bValue = b[fieldName].toString().toUpperCase();
        if (aValue < bValue) {
          return -1;
        } else if (aValue > bValue) {
          return 1;
        }
        return 0;
      });
    } else if (order === "descending") {
      list.sort((a, b) => {
        let aValue = a[fieldName].toString().toUpperCase();
        let bValue = b[fieldName].toString().toUpperCase();
        if (aValue < bValue) {
          return 1;
        } else if (aValue > bValue) {
          return -1;
        }
        return 0;
      });
    }
    return;
  }
};
