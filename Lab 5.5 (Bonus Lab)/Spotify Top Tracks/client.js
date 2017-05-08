function($sce, SpotifyApi) {
  /* widget controller */
  var c = this;
	
	SpotifyApi.getArtist(c.data.artistID).then(function(response) {
		c.data.artist = response;
	});

	SpotifyApi.getTopTracks(c.data.artistID).then(function(response) {
		c.data.topTracks = response.tracks;
		
		c.data.topTracks.forEach(function(track) {
			track.embeddedPlayerURL = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=" + track.uri);
		});
	});
	
	c.openTrackPlayer = function(index) {
		c.data.topTracks.forEach(function(track, i) {
			track.selected = (i === index);
		})
	}
}