import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../actions';


class PostDetail extends Component {

  componentDidMount() {
    this.props.getPost(this.props.match.params.postId);
  }
  render() {
    const {
      post: { title, timestamp, body, author, category, voteScore },
    } = this.props; 
    return (
      <article>
        <header>
          <h2 className="post-title">{title}</h2>
          <ul>
            <li>post date: <time className="post-timestamp">{timestamp}</time></li>
            <li>Category: {category}</li>
            <li>Author: {author}</li>
            <li>vote: {voteScore}</li>
          </ul>
        </header>
        <section className="post-body">
          {body}
        </section>
      </article>
    );
  }
}

const mapStateToProps = ({ posts, categories }, { match: { params: { postId } } }) => ({
  post: posts.byId[postId] || {},
});

const mapDispatchToProps = dispatch => ({
  getPost: id => dispatch(getPost(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetail);
