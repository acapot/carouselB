// JavaScript Document

/*function LoadJS(nomarch, nomid) {
	
	var ele = document.getElementById(nomid);
	if (ele == undefined) {
		var tagjs = document.createElement("script");
		tagjs.setAttribute("type", "text/javascript");
		tagjs.setAttribute("id", nomid); // no te olvides del "id", que sí, que soy un pesado...
		tagjs.setAttribute("src", nomarch);
		//document.getElementsByTagName("head")[0].appendChild(tagjs);
		document.getElementsByTagName("head")[0].appendChild(tagjs);
		//document.getElementById("loadJShtml").appendChild(tagjs);
	}
}*/

function LoadJS(nomarch, nomid) {
	
	var ele = document.getElementById(nomid);
	if (ele == undefined) {
		var tagjs = document.createElement("link");
		tagjs.setAttribute("rel", "stylesheet");
		tagjs.setAttribute("id", nomid); // no te olvides del "id", que sí, que soy un pesado...
		tagjs.setAttribute("href", nomarch);
		//document.getElementsByTagName("head")[0].appendChild(tagjs);
		document.getElementsByTagName("head")[0].appendChild(tagjs);
		//document.getElementById("loadJShtml").appendChild(tagjs);
	}
}


/*
 function LoadAllJS(){



LoadJS("js/hammer/modernizr.js","jsContainer1");
LoadJS("js/hammer/jquery.hammer.js","jsContainer2");
LoadJS("js/hammer/hammerCarousel.js","jsContainer3");
LoadJS("js/hammer/hammerCarousel.js","jsContainer4");
LoadJS("js/jquery.js","jsContainer5");
LoadJS("js/bootstrap.min.js","jsContainer6");
LoadJS("js/holder.js","jsContainer7");
LoadJS("js/helperFunction.js","jsContainer8");
LoadJS("js/hammer/ga.js","jsContainer9");
	 
}*/

$(window).ready(function() {

    LoadJS("pp.css","cssCarousel");

  });

/*

$(window).ready(function() {

    LoadAllJS();
  });*/