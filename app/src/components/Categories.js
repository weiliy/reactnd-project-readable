import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../actions';

class App extends Component {
  static propTypes = {
    categories: PropTypes.shape({
      allNames: PropTypes.arrayOf(PropTypes.string).isRequired,
      byName: PropTypes.object.isRequired,
    }).isRequired,
  }

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { categories } = this.props;

    return (
      <div className="categores">
        <ul>
          {categories.allNames.map(name=> (
            <li key={name}>
              {name}
            </li>)
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return { categories };
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(getCategories()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
