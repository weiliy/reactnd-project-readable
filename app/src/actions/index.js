import * as api from '../utils/api';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

export const getCategories = () => dispatch => (
  api
    .getCategories()
    .then(categories => dispatch(receiveCategories(categories)))
);

export const receivePosts = (posts, category) => ({
  type: RECEIVE_POSTS,
  posts,
  category,
});

export const getPosts = category => dispatch => (
  api
    .getPosts(category)
    .then(posts => dispatch(receivePosts(posts, category)))
);

export const getPost = id => dispatch => (
  api
    .getPost(id)
    .then(post => dispatch(receivePost(post)))
);

export const receivePost = post => ({
  type: RECEIVE_POST,
  post,
});

