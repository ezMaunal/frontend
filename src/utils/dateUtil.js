export const formatToLocalDateTime = (date) => {
  const iso = new Date(date).toISOString();
  return iso.slice(0, 16).replace("T", " ");
};
