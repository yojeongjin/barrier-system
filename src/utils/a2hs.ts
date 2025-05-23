const HIDE_A2HS = 'HIDE_A2HS';

export const getA2HS = () => {
  return localStorage.getItem(HIDE_A2HS);
};

export const isValidateA2HS = () => {
  return Number(getA2HS()) > Date.now();
};

export const setInstallA2HS = () => {
  const afterWeek = new Date();
  afterWeek.setDate(afterWeek.getDate() + 7);
  localStorage.setItem(HIDE_A2HS, String(afterWeek.getTime()));
};

export const clearInstallA2HS = () => {
  localStorage.removeItem(HIDE_A2HS);
};
