import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util//Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      PlaylistName: 'MojaListeczka',
      PlaylistTracks: [
        {
          name: 'Dzieci',
          artist: 'Elektryczne Gitary',
          album: 'Na krzywy ryj',
          id: '85',
        },
        {
          name: 'Killer',
          artist: 'Elektryczne Gitary',
          album: 'Killer',
          id: '20',
        }
      ],
      SearchResults: [
        {
          name: 'Dzieci',
          artist: 'Elektryczne Gitary',
          album: 'Na krzywy ryj',
          id: '85'
        },
        {
          name: 'Killer',
          artist: 'Elektryczne Gitary',
          album: 'Killer',
          id: '20'
        },
        {
          name: 'Hustawka',
          artist: 'Elektryczne Gitary',
          album: 'Hustawki',
          id: '38'
        }
      ]
    }
  }

  addTrack(track) {
    if (this.state.PlaylistTracks.some(savedTrack => {
       return savedTrack.id === track.id;
      })) {
        console.log('The song already exists');
        return;
      } else {   
      let newPlaylist = this.state.PlaylistTracks;
      newPlaylist.push(track);
      this.setState({
        PlaylistTracks: newPlaylist
      })
      }
    }

  removeTrack(track) {
    const newPlaylist = this.state.PlaylistTracks.filter(e => {
      return e !== track;
    })
    this.setState({
      PlaylistTracks: newPlaylist
    });
  }

  updatePlaylistName(name) {
    this.setState({
      PlaylistName: name
    })
  }

  savePlaylist() {
    const trackUris = this.state.PlaylistTracks.map(track => {
      return track.uri;
    });
    Spotify.savePlaylist(this.props.PlaylistName, trackUris);
    this.setState({
      PlaylistName: 'New Playlist',
      playlistTracks: []
    })
  }

  search(term) {
    Spotify.search(term)
    .then(searchResults => {
      this.setState({
        SearchResults: searchResults
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
          <SearchResults onAdd={this.addTrack} searchResults={this.state.SearchResults} />
          <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.PlaylistName} playlistTracks={this.state.PlaylistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
