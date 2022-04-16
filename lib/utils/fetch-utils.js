const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const getPrompts = async (id) => {
  const res = await fetch(`http://localhost:7890/api/v1/plots/${id}`);
  const body = await res.json();
  return body;
};

module.exports = { getPrompts };
