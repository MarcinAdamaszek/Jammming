import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.state = {
      PlaylistName: '',
      PlaylistTracks: [
        {
          name: '',
          artist: '',
          album: '',
          id: '',
        }
      ],
      SearchResults: [
        {
          name: '',
          artist: '',
          album: '',
          id: ''
        },
        {
          name: '',
          artist: '',
          album: '',
          id: ''
        },
        {
          name: '',
          artist: '',
          album: '',
          id: ''
        }
      ]
    }
  }

  addTrack(track) {
    if (this.state.PlaylistTracks.find(savedTrack => {
      track.id === savedTrack.id;})) {
        return;
      } else {
        let newPlaylist = this.state.PlaylistTracks.push(track);
        this.setState({
          PlaylistTracks: newPlaylist
        })
      }
    }
  

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
          <SearchResults onAdd={this.addTrack} searchResults={this.state.SearchResults} />
          <Playlist playlistName={this.state.PlaylistName} playlistTracks={this.state.PlaylistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
