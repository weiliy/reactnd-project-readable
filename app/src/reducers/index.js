import { combineReducers } from 'redux';
import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  RECEIVE_POST,
} from '../actions';


const initialCategories = {
  allNames: [],
  byName: {}
};

function categories (state = initialCategories, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES :
      const { categories } = action;
      return categories.reduce((acc, cur) => ({
        allNames: [...acc.allNames, cur.name],
        byName: {
          ...acc.byName,
          [cur.name]: cur
        },
      }), initialCategories);
    case RECEIVE_POSTS :
      const { posts = [], category } = action;
      if (category) {
        return {
          ...state,
          byName: {
            ...state.byName,
            [category]: {
              ...state.byName[category],
              posts: posts.map(post => post.id),
            }
          },
        };
      } else {
        return state;
      }
    default :
      return state;
  }
}

const initialPosts = {
  allIds: [],
  byId: {},
}

function posts (state = initialPosts, action) {
  switch (action.type) {
    case RECEIVE_POSTS :
      const { posts = [], category } = action;
      const byId = posts.reduce((acc, cur) => ({
        ...acc,
        [cur.id]: cur
      }), {});

      if(!category) {
        return {
          ...state,
          allIds: posts.map(post => post.id),
          byId,
        };
      } else {
        return {
          ...state,
          byId: {
            ...state.byId,
            ...byId,
          },
        }
      }

    case RECEIVE_POST :
      const { post } = action;
      return {
        ...state,
        byId: {
          ...state.byId,
          [post.id]: post,
        },
      }
    default :
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
})
