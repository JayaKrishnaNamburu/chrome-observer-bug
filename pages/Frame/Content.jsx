import React, { Component, Children } from 'react'; // eslint-disable-line no-unused-vars

class Content extends Component {
  componentDidMount() {
    this.props.contentDidMount();
  }

  componentDidUpdate() {
    this.props.contentDidUpdate();
  }

  render() {
    return Children.only(this.props.children);
  }
}

export default Content;
