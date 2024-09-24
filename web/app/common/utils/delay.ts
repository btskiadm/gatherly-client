export const delay = (ms: number): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
};
