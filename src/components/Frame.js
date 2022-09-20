import React from "react";
class Frame extends React.Component {
    constructor(props) {
      super(props);
      this.state = { height: "0" };
      this.img = "";
    }
    getFrameHeight() {
      return this.img.height;
    }
    setFrameHeight(e) {
      this.img = e.target;
      this.setState({ height: this.getFrameHeight() });
    }
    setGridRowEnd() {
      let span = Math.ceil(this.state.height / this.props.gridRowEnd);
      this.img.style.gridRowEnd = `span ${span}`;
    }
    componentDidUpdate(pP, pS) {
      if (pS !== this.state) {
        this.setGridRowEnd();
      }
    }
    render() {
      return (
        <img
          className="frame"
          onLoad={this.setFrameHeight.bind(this)}
          src={this.props.src}
          alt={this.props.description}
        />
      );
    }
  }

export default Frame