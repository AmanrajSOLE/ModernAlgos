
export const getSymbolLotMap = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        NIFTY: 65,
        BANKNIFTY: 30,
        RELIANCE: 500,
        SBIN: 750,
        TATASTEEL: 5500,
      });
    }, 400); 
  });
};
