const fetch = require('cross-fetch');

const getPrompts = async (id) => {
  const res = await fetch('http://localhost:7890/api/v1/plots', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  });
  console.log(res);
  return res;
};

module.exports = { getPrompts };
