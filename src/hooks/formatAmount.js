export const formatAmount = (num) => {
  if (num === null || num === undefined) return "0";

  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + " B";
  } 
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + " M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + " K";
  } else {
    return num.toString();
  }
};