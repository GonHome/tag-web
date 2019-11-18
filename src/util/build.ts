export const showOptions = (options: string) => {
  const optionDom: any[] = [];
  try {
    const optionList: any[] = JSON.parse(options);
    if (optionList instanceof Array) {
      optionList.forEach((option: any) => {
        optionDom.push({ key: option.key, text: option.text });
      })
    }
  } catch (e) {
    console.error(e);
  }
  return optionDom;
};

export const onFormatDate = (date?: Date): string => {
  if (date) {
    return date.getFullYear() + '-' + ((Array(2).join('0') + date.getMonth() + 1).slice(-2)) + '-' + ((Array(2).join('0') + date.getDate()).slice(-2));
  }
  return '';
};
