export const isDate = (val: Date): boolean => {
  return val instanceof Date && !isNaN(val.getDay());
};

export const stringifyParams = data =>
  Object.keys(data).reduce<{ [param: string]: string }>((obj, key) => {
    if (data[key] !== null) {
      if (isDate(data[key])) {
        obj[key] = data[key].toISOString();
      } else if (Array.isArray(data[key])) {
        if (data[key].length !== 0) {
          obj[key] = data[key].filter(x => x !== null);
        }
      } else {
        obj[key] = data[key]?.toString();
      }
    }
    return obj;
  }, {});


export const getBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
