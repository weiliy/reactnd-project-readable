const headers = {
  Authorization: 'demo',
  'Content-Type': 'application/json; charset=utf-8',
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

export const getPost = id => fetch(`${root}/posts/${id}`, { headers })
  .then(response => response.json());

export const addPost = post => fetch(`${root}/posts`, {
  headers,
  method: 'POST',
  body: JSON.stringify(post),
}).then(response => response.json());

