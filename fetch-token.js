var tokenRequest = new sn_ws.RESTMessageV2();
tokenRequest.setEndpoint('https://hello.service-now.com/api/snc/spotifytoken');
tokenRequest.setHttpMethod('GET');
tokenRequest.setRequestHeader("Accept","application/json");

var tokenResponse = tokenRequest.execute();
var tokenBody = new JSON().decode(tokenResponse.getBody());
var token = tokenBody.result;

// Then later... we add the appropriate header to our request
artistURLRequest.addHeader("Authorization", "Bearer " + token);
