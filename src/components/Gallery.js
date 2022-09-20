import React from "react";
import Frame from "./Frame";

class Gallery extends React.Component {
    constructor(props) {
      super(props);
      this.state = { image: [] };
      this.gallery = React.createRef();
    }
  
    showImage() {
      return this.props.images.map((image) => {
        console.log("ran");
        return (
          <Frame
            src={image.urls.small}
            key={image.id}
            description={image.description}
            gridRowEnd={this.setGridAutoRow()}
          />
        );
      });
    }
  
    setImage() {
      this.setState({ image: this.showImage() });
    }
  
    setGridAutoRow() {
      const gridline = 1;
      this.gallery.current.style.gridAutoRow = `${gridline}px`;
      return gridline;
    }
  
    componentDidMount() {
      this.setImage();
      this.setGridAutoRow();
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevProps.images !== this.props.images) this.setImage();
    }
    render() {
      return (
        <div className="gallery" ref={this.gallery}>
          {this.state.image}
        </div>
      );
    }
  }

export default Gallery