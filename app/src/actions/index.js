import * as api from '../utils/api';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

export const getCategories = () => dispatch => (
  api
    .getCategories()
    .then(categories => dispatch(receiveCategories(categories)))
);
