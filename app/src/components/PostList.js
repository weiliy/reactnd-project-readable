import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../actions';

class PostList extends Component {
  componentDidMount() {
    this.props.getPosts(this.props.match.params.category);
  }

  render() {
    const {
      posts,
      categories,
      match: { params: { category } },
    } = this.props;

    let displayPosts = [];
    if (category) {
      if (categories[category] && categories[category].posts) {
        displayPosts = categories[category].posts.map(id => posts.byId[id]);
      }
    } else {
      displayPosts = posts.allIds.map(id => posts.byId[id]);
    }

    return (
      <ul>
        {displayPosts.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = ({ posts, categories }, { match: { params: { category } } }) => ({
  posts,
  categories: categories.byName,
});

const mapDispatchToProps = dispatch => ({
  getPosts: category => dispatch(getPosts(category)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostList);
