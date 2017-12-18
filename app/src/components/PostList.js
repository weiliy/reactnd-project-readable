import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts } from '../actions';

const PostLink = ({ id, to, posts = {} }) => {
  const { title, author, voteScore } = posts[id] || {};
  return (
    <Link
      to={to}
    >{title} - {author} - (vote: {voteScore})
    </Link>
  )
};

class PostList extends Component {
  componentDidMount() {
    this.props.getPosts(this.props.match.params.category);
  }

  render() {
    const {
      posts,
      categories,
      match: { params: { category }, url},
    } = this.props;

    let displayPosts = [];
    if (category) {
      if (categories[category] && categories[category].posts) {
        displayPosts = categories[category].posts || [];
      }
    } else {
      displayPosts = posts.allIds || [];
    }

    return (
      <ul>
        {displayPosts.map(id => (
          <li key={id}>
            <PostLink to={`${url}/${id}`} id={id} posts={posts.byId}/>
          </li>
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
