const headers = {
  Authorization: 'demo',
}

const root = `//${global.location.hostname}:3001`;

export function getCategories () {
  return fetch(`${root}/categories`, { headers })
    .then(response => response.json())
    .then(({ categories }) => categories);
}

export function getPosts (category) {
  let url;
  if (category) {
    url = `${category}/posts`;
  } else {
    url = 'posts';
  }

  return fetch(`${root}/${url}`, { headers })
    .then(response => response.json());
}
