export const shortenNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }

  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }

  return num.toString();
};

export const addThousandSeparators = (num: string): string => {
  const number = parseInt(num, 10);

  return number.toLocaleString("us-EN");
};
