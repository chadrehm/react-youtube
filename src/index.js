import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';

// Custom Files
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyCSuZqrWDOmOcT8JP99uFA8TMSN7ONQgx8';



// Create new component. This component should produce some Html
class App extends Component{
  constructor(props){
    super(props);

    this.state = { 
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('surfboards')
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render(){
    const videoSearch= _.debounce( term => { this.videoSearch(term)}, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}


// Take this component's generated Html and put it onto the DOM
ReactDOM.render(<App/>, document.querySelector('.container'));
