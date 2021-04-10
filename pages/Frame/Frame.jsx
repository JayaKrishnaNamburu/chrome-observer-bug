/* eslint-disable no-underscore-dangle,no-console */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Content from './Content';

class Frame extends Component {
  static defaultProps = {
    head: null,
    children: undefined,
    contentDidMount: () => {},
    contentDidUpdate: () => {},
    initialContent: '<!DOCTYPE html><html><head></head><body></body></html>',
  };

  constructor(props, context) {
    super(props, context);
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;

    const doc = this.getDoc();
    if (doc && doc.readyState === 'complete') {
      this.forceUpdate();
    } else {
      this.node.addEventListener('load', this.handleLoad);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;

    this.node.removeEventListener('load', this.handleLoad);
  }

  getDoc() {
    return this.node.contentDocument;
  }

  handleLoad = () => {
    this.forceUpdate();
  };

  renderFrameContents() {
    if (!this._isMounted) {
      return null;
    }

    const doc = this.getDoc();

    const { contentDidMount, contentDidUpdate } = this.props;

    const initialRender = !this._setInitialContent;
    const contents = (
      <Content contentDidMount={contentDidMount} contentDidUpdate={contentDidUpdate}>
        {this.props.children}
      </Content>
    );

    if (initialRender) {
      doc.open('text/html', 'replace');
      doc.write(this.props.initialContent);
      doc.close();
      this._setInitialContent = true;
    }

    return [
      ReactDOM.createPortal(this.props.head, doc.head),
      ReactDOM.createPortal(contents, doc.body),
    ];
  }

  render() {
    const {
      head,
      initialContent,
      contentDidMount,
      contentDidUpdate,
      children,
      ...rest
    } = this.props;
    return (
      <iframe
        title="Frame"
        style={{ width: '100%' }}
        {...rest}
        ref={node => {
          this.node = node;
        }}
      >
        {this.renderFrameContents()}
      </iframe>
    );
  }
}

export default Frame;
