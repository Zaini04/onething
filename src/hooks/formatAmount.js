export const formatAmount = (num) => {
  if (num === null || num === undefined) return "0";

  if (num >= 10000000) {
    return (num / 10000000).toFixed(2) + " Cr";
  } else if (num >= 100000) {
    return (num / 100000).toFixed(2) + " Lac";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + " K";
  } else {
    return num.toString();
  }
};