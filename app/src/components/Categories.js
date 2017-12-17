import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCategories,
  getPosts,
} from '../actions';

class App extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })).isRequired,
  }

  componentDidMount() {
    this.props.getCategories();
  }

  getPosts = category => this.props.getPosts(category)

  render() {
    const { categories } = this.props;

    return (
      <div className="categores">
        <ul>
          <li>
            <Link to="/posts" onClick={() => this.getPosts()}>all</Link>
          </li>
          {categories.map(({name, path}) => (
            <li key={name}>
              <Link
                to={`/${path}/posts`}
                onClick={() => this.getPosts(path)}
              >{name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: categories.allNames.map(name => categories.byName[name]),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(getCategories()),
    getPosts: category => dispatch(getPosts(category)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);