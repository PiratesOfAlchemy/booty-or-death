
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const getPrompts = async (id) => {
  const res = await fetch(`http://localhost:7890/api/v1/plots/${id}`);
  const body = await res.json();
  return body;
};

const postUsername = async (username) => {
  await fetch('http://localhost:7890/api/v1/users', { 
    method: 'POST',
    body: JSON.stringify({ username }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

module.exports = { getPrompts, postUsername };
