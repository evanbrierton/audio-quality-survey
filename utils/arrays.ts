export const omit = <T>(arr: T[], i: number) =>
  arr.filter((_, index) => index !== i);

export const insert = <T>(arr: T[], i: number, item: T) => [
  ...arr.slice(0, i),
  item,
  ...arr.slice(i),
];

export const move = <T>(arr: T[], from: number, to: number) =>
  insert(omit(arr, from), to, arr[from]);
