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
        <Route path="/:category?/posts" component={Categories} />
        <Switch>
          <Route exact path="/:category?/posts" component={PostList} />
          <Route exact path="/:category?/posts/:postId" component={PostDetail} />
          <Redirect from="/" to="/posts" />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
