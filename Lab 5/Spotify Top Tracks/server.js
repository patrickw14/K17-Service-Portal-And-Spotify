(function() {
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */
	var artistID = options.artist || $sp.getParameter("artist");

	if (!artistID) {
		data.error = "No artist ID provided";
		return;
	}
	
	var tokenRequest = new sn_ws.RESTMessageV2();
	tokenRequest.setEndpoint('https://hello.service-now.com/api/snc/spotifytoken');
	tokenRequest.setHttpMethod('GET');
	tokenRequest.setRequestHeader("Accept","application/json");

	var tokenResponse = tokenRequest.execute();
	var tokenBody = new JSON().decode(tokenResponse.getBody());
	var token = tokenBody.result;
	
	var artistURL = "https://api.spotify.com/v1/artists/" + artistID;
	var artistURLRequest = new GlideHTTPRequest(artistURL);
	artistURLRequest.addHeader("Authorization", "Bearer " + token);
	var artistJSONResponse = artistURLRequest.get();
	if (artistJSONResponse) {
		data.artist = new JSON().decode(artistJSONResponse.getBody());
		if (data.artist.error) {
			data.error = "That might not be a valid request."
			return;
		}
	} else {
		data.error = "Something went wrong with the request. Try again later.";
		return;
	}
	
	var topTracksURL = "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=US";
	var topTracksURLRequest = new GlideHTTPRequest(topTracksURL);
	topTracksURLRequest.addHeader("Authorization", "Bearer " + token);
	var topTracksJSONResponse = topTracksURLRequest.get();
	if (topTracksJSONResponse) {
		data.topTracks = new JSON().decode(topTracksJSONResponse.getBody());
		if (data.topTracks.error) {
			data.error = "That might not be a valid request."
		} else {
			data.topTracks = data.topTracks.tracks;
		}
	} else {
		data.error = "Something went wrong with the request. Try again later."
	}
})();
