import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Modal,
  Button,
  Icon,
  Divider,
} from 'antd';
import { connect } from 'react-redux';
import { getPosts } from '../actions';

import AddPostModal from './AddPostModal';

const PostLink = ({ id, to, posts = {} }) => {
  const { title, category, author, voteScore, commentCount } = posts[id] || {};
  return (
    <div>
      <div>
        <Link
          to={`${category}/${id}`}
        >{title} - {author} - {category}
        </Link>
      </div>
      <div>
        <Icon type="like" /><Icon type="dislike" />({voteScore})
        <Divider type="vertical" />
        <Icon type="message" />{commentCount}
        <Divider type="vertical" />
        <Icon type="edit" />
        <Divider type="vertical" />
        <Icon type="delete" />
      </div>
    </div>
  )
};

class PostList extends Component {
  state = {
    isAddingPost: false,
  }

  componentDidMount() {
    this.props.getPosts(this.props.match.params.category);
  }

  showAddPost = () => this.setState({ isAddingPost: true })

  hideAddPost = () => this.setState({ isAddingPost: false })

  handleOk = () => {
    this.props.getPosts(this.props.match.params.category);
    this.hideAddPost();
  }

  render() {
    const {
      posts,
      categories,
      match: { params: { category }, url},
    } = this.props;

    const {
      isAddingPost,
    } = this.state;

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
        <Button onClick={this.showAddPost}>add post</Button>
        <ul>
          {displayPosts.map(id => (
            <li key={id}>
              <PostLink id={id} posts={posts.byId}/>
            </li>
          ))}
        </ul>
        <AddPostModal
          visible={isAddingPost}
          onOk={this.handleOk}
          onCancel={this.hideAddPost}
        />
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
