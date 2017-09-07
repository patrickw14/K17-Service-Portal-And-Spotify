(function(query) {
	var results = [];
	/* Calculate your results here. */
	var tokenRequest = new sn_ws.RESTMessageV2();
	tokenRequest.setEndpoint('https://hello.service-now.com/api/snc/spotifytoken');
	tokenRequest.setHttpMethod('GET');
	tokenRequest.setRequestHeader("Accept","application/json");

	var tokenResponse = tokenRequest.execute();
	var tokenBody = new JSON().decode(tokenResponse.getBody());
	var token = tokenBody.result;
	
	var url = "https://api.spotify.com/v1/search?type=artist&q=" + encodeURI(query);
	var ws = new GlideHTTPRequest(url);
	ws.addHeader("Authorization", "Bearer " + token);
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
