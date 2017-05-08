(function(query) {
	var results = [];
	/* Calculate your results here. */
	var url = "https://api.spotify.com/v1/search?type=artist&q=" + encodeURI(query);
	var ws = new GlideHTTPRequest(url);
	var jsonOutput = ws.get();
	if (jsonOutput) {
		var response = new JSON().decode(jsonOutput.getBody());
		results = response.artists.items;
		var score = 100;
		results.forEach(function(result) {
			result.url = "?id=spotify_artist&artist=" + result.id;
			result.primary = result.name;
			result.score = score--;
		});
	}

	return results;
})(query);
