import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts } from '../actions';

const PostLink = ({ id, to, posts = {} }) => {
  const { title, category, author, voteScore } = posts[id] || {};
  return (
    <div>
      <Link
        to={`${category}/${id}`}
      >{title} - {author} - (vote: {voteScore})
      </Link>
      <button disabled>x</button>
    </div>
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
      <div>
        <button disabled>add post</button>
        <ul>
          {displayPosts.map(id => (
            <li key={id}>
              <PostLink id={id} posts={posts.byId}/>
            </li>
          ))}
        </ul>
      </div>
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
