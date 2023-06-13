export const sanitizeArray = array => {
  return Array.isArray(array) ? array : [];
};

export const removeDuplicates = array => {
  return [...new Set(array)];
};
