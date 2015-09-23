setTitle = (title) => {
  const base = 'Scalable';

  if (title) {
    return document.title = `${title} - ${base}`;
  }
  return document.title = base;
};
