import React from "react";
import Footer from "./Footer"

class Infinityscroll extends React.Component {
    constructor(props) {
      super(props);
      this.footer = React.createRef();
      this.state = { no: null, offsetY: "" };
      this.count = 1;
      this.initCount = 0;
    }
  
    options = {
      root: null,
      rootMargin: '400px',
      threshold: 0.2,
    };
  
    //counter towards result limit
    resetRequest() {
      this.count = 1;
      this.initCount = 0;
      this.setState({ no: 20 });
    }
  
    async requestMore() {
      if (
        this.footer.current.offsetTop > this.state.offsetY  &&
        this.count > this.initCount
      ) {
        console.log(this.footer.current.offsetTop,this.state.offsetY);
        this.initCount = this.count;
        this.count = await this.props.requestMore(this.state.no);
        this.setState({ no: this.state.no + 10 });
      }
    }
  
    watchFooter() {
      this.observer.observe(this.footer.current);
    }
  
    setOffsetY() {
      this.setState({ offsetY: this.footer.current.offsetTop });
      console.log("set");
    }
  
    componentDidMount() {
      (async () => {
        this.setOffsetY();
        this.observer = new IntersectionObserver(
          this.requestMore.bind(this),
          this.options
        );
        this.watchFooter();
      })();
    }
  
    componentDidUpdate(pP) {
      if (pP.searchTitle !== this.props.searchTitle) {
        this.resetRequest();
      }
    }
  
    render() {
      return (
        <div ref={this.footer}>
          <Footer>Gold's Gallery</Footer>
        </div>
      );
    }
  }

export default Infinityscroll