export const getMaxVId = (vIds: string[]) => {
  let maxIndex = 0;
  vIds.forEach((vId: string) => {
    const index = vId.split('-')[1] as unknown as number;
    if (index) {
      if (index > maxIndex) {
        maxIndex = index + 1;
      }
    }
  });
  return maxIndex;
};
