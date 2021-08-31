export const groupBy = (arr: Array<any>, key: string) =>
  arr.reduce(
    (memo, val: Object) => ({
      ...memo,
      [val[key]]: val,
    }),
    {},
  );

export const groupById = (arr: Array<any>) => groupBy(arr, 'id');

export default groupBy;
