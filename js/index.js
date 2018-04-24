document.querySelector('#searcher').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      var x = document.getElementById("searcher").value;
			document.getElementById("title").style.margin = "20px";
			document.getElementById("h").style.display = "none";
			document.getElementById("btn").style.display = "none";
			document.getElementById("footer").style.display = "none";
			document.getElementById("links").style.display = "block";
			ajax(x);
	}
});

function ajax (keyword) {
			$.ajax({ 
				url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&prop=info&inprop=url&utf8=&format=json",
			 dataType: "jsonp",
			 success: function(response) {
					 console.log(response.query);
					 if (response.query.searchinfo.totalhits === 0) {
						 showError(keyword);
					 }
					 else {
						 showResults(response);
					 }
			},
			 error: function () {
				alert("Error retrieving search results, please refresh the page");
			 }

		 });
}

function showResults(response){
	var m = "";
	for(var i = 0 ; i < response['query']['search'].length; i++){
		m += "<div class='row'><div class='col-xs-12'><div class='anchors'>"+
			"<h3><a href='https://en.wikipedia.org/wiki/" + response.query.search[i].title 
			+ "' target='_blank'>" + response.query.search[i].title
			+ "</a></h3><p class='snippet'>" + response.query.search[i].snippet
			+ "</p></div></div></div>";
	}
	document.getElementById("links").innerHTML = m;
}

function showError(keyword){
	var m = "";
	m = "<div class='row'><div class='col-xs-12'><h3 style='color:white;'>No results for :<span style='color:#03A9F4;font-weight:bold;'> "
		+ keyword +"</span></h3><p class='snippet'>you may search again.</p>";
	document.getElementById("links").innerHTML = m;
}

function random(){
	window.open('https://en.wikipedia.org/wiki/Special:Random','_blank');
}