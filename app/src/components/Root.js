import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect, 
} from 'react-router-dom';

import Categories from './Categories';
import PostList from './PostList';
import PostDetail from './PostDetail';

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/:category?" component={Categories} />
        <Switch>
          <Route exact path="/:category?" component={PostList} />
          <Route exact path="/:category/:postId" component={PostDetail} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
