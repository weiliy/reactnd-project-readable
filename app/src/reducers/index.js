import { combineReducers } from 'redux';
import {
  RECEIVE_CATEGORIES,
} from '../actions';


const initialCategories = {
  allNames: [],
  byName: {}
};

function categories(state = initialCategories, action) {
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
    default :
      return state;
  }
}

export default combineReducers({
  categories,
})
