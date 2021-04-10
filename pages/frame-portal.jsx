import React from "react";
import { ResizeObserver } from "./observer";
import Frame from "./Frame";

export default class App extends React.Component {
  state = {
    height: 0
  };

  handleFrameContentRender = () => {
    if (!this.boxEl || this.ro) {
      return;
    }

    this.ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.setState({ height: entry.contentRect.height });
      }
    });
    this.ro.observe(this.boxEl);
  };

  componentWillUnmount() {
    if (this.ro) {
      this.ro.disconnect();
      this.ro = null;
    }
  }

  render() {
    return (
      <div className="App">
        <h2>Box height: {this.state.height}</h2>
        <Frame
          style={{
            width: "90vw",
            height: "90vh"
          }}
          contentDidMount={this.handleFrameContentRender}
          contentDidUpdate={this.handleFrameContentRender}
        >
          <div
            ref={el => {
              this.boxEl = el;
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100px",
              background: "#666666",
              color: "#fff"
            }}
          >
            <div
              style={{
                display: "block",
                width: "100%",
                padding: "15px"
              }}
              contentEditable
            >
              Enter more text
            </div>
          </div>
        </Frame>
      </div>
    );
  }
}
