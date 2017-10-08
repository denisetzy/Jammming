import React, { Component } from 'react';
import './App.css';
import {Playlist} from '../Playlist/Playlist';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
          {
            name: '',
            artist: '',
            album: ''
          },
          {
            name: '',
            artist: '',
            album: ''
          },
          {
            name: '',
            artist: '',
            album: ''
          }
      ],
      playlistName: 'My Playlist',
      playlistTracks: [
        {
          name: '',
          artist: '',
          album: ''
        },
        {
          name: '',
          artist: '',
          album: ''
        },
        {
          name: '',
          artist: '',
          album: ''
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let playlistTracks = this.state.playlistTracks;
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    playlistTracks.push({track});
    this.setState({playlistTracks: playlistTracks});
  }

  removeTrack(track) {
    let playlistTracks = this.state.playlistTracks;
    let newPlaylistTracks = playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({playlistTracks: newPlaylistTracks});
  }

  updatePlaylistName(name) {
    this.state.playlistName = name;
  }

  savePlaylist() {
    let playlistTracks = this.state.playlistTracks;
    let trackURIs = playlistTracks.map(function(track) {
      return track.uri
    });
  }

  search(term) {
    console.log(term)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
        <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
        <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
        </div>
        </div>
      </div>
    );
  }
}
