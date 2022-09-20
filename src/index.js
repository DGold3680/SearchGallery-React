import React from "react";
import ReactDOM from "react-dom/client";

import axiosUnsplash from "./API/AxiosUnsplash";
import "./style.css";

import Search from "./components/Search"
import Title from "./components/Title"
import Gallery from "./components/Gallery"
import Infinityscroll from "./components/Infinityscroll";

class App extends React.Component {
  state = { searchTerm: "", searchTitle: "", searchResult: [], error:null};

  async requestPhotos(no) {
    try {
      const response = await axiosUnsplash({
        method: "get",
        url: "search/photos",
        params: {
          query: `${this.state.searchTerm}`,
          per_page: `${no}`,
        },
      });
      this.results = response.data.results;
      console.log(this.results);
      await this.setState({ searchResult: this.results });
    } catch (e) {
        console.log(e);
        this.setState({error:this.renderError()})
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    // if (this.state.searchTerm !== this.state.searchTitle) {
      await this.getPhotos(10);
      this.setState({ searchTitle: this.state.searchTerm });
    // }
  }

  async getPhotos(no) {
    await this.requestPhotos(no)
    if (this.results){
    return this.results.length}
  }

  handleInputChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  renderError(){
    return (<div className="error">Sorry, we could not find any images for that result.
       <p>Try a different search or Check your network and try again</p> 
       </div>)
       }
  

  render() {
    return (
      <div>
        <div className="app">
          <div>
            <Search
              handleSubmit={this.handleSubmit.bind(this)}
              handleInputChange={this.handleInputChange.bind(this)}
              inputValue={this.state.searchTerm}
            />
            <Title>Search Gallery</Title>
          </div>
          {this.state.searchResult.length ? 
            <Gallery images={this.state.searchResult} />
           : this.state.error}
        </div>
        <Infinityscroll
          requestMore={this.getPhotos.bind(this)}
          searchTitle={this.state.searchTitle}
        />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
