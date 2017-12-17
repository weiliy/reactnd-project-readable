import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostList extends Component {
  render() {
    console.log(this.props)
    return <h1>Post List</h1>;
  }
}

function mapStateToProps({ posts,  }) {
  return { };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostList);
