const convertMsToHM = (milliseconds: number) =>
  parseFloat((milliseconds / 1000 / 60 / 60).toFixed(2));

const groupBy = (xs: any, key: string) => {
    return xs.reduce(function(rv: any, x: any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

export { convertMsToHM, groupBy };
