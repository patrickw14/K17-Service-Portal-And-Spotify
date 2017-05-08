(function() {
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */
	data.artistID = options.artist || $sp.getParameter("artist");

	if (!data.artistID) {
		data.error = "No artist ID provided";
		return;
	}	
})();