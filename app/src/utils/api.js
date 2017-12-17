const headers = {
  Authorization: 'demo',
}

const root = '//localhost:3001';

export function getCategories() {
  return fetch(`${root}/categories`, { headers })
    .then(response => response.json())
    .then(({ categories }) => categories);
}
