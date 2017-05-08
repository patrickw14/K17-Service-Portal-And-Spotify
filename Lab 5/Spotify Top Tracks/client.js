function($sce) {
  /* widget controller */
  var c = this;
	
	c.openTrackPlayer = function(index) {
		c.data.topTracks.forEach(function(track, i) {
			track.selected = (i === index);
		})
	}
}