const clientID = "c1577f2ee8ea40259966fbecd749bf07";
const redirectURI = "http://localhost:3000/";

let userAccessToken = '';
let Spotify = {
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken
    } else if (!userAccessToken) {
      window.location.href.match(/access_token=([^&]*)/, /expires_in=([^&]*)/);
      return
    } else if
  }
};

module.exports = Spotify;
