

$(document).ready(function(){
	
	var pngIns = new png();
	pngIns.init();
	$('.selectpicker').selectpicker({
                'selectedText': 'cat'
            });
			
	$('.bxslider').bxSlider({
  mode: 'vertical',
  slideMargin: 5
});
		
	
	
	//alert("hola");
	
	
	});

var png = function(){
	var $menuLi= $("#menu1 li");
	var callHeadStart = true;
	var categoryId = 0;
	var totalItems = 0;
	
	//detect mobil or table
	
	var detectmob = function() {
	
	 if( navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	 || navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i)
	 || navigator.userAgent.match(/BlackBerry/i)
	 || navigator.userAgent.match(/Windows Phone/i)
	 ){
		return true;
	  }
	 else {
		return false;
	  }
	}
	
	
	var isMobile = detectmob();
	console.log("mm"+isMobile);
	var numOfGame = 8;
	var classImgWr = "col-xs-4 col-sm-4 col-lg-3 imgWrap";
	var index=0;
	
	var w = window;
	var d = document;
	var e = d.documentElement;
	var g = d.getElementsByTagName('body')[0];
	
	this.init = function(){
		$menuLi.click(this.init);
		
		 
		  if($menuLi.index(this) >= 0)
		  {
			index=$menuLi.index(this);
			$menuLi.attr('class', '');
			$($menuLi[index]).attr('class', 'active2');
			
		  }
		 
		 setCategoryToShow(index);
		 
		$.ajax({
		   url: 'dataGame.json',
		   dataType: 'json',
		   context: '#carousel',
		   success: function(data) {
			
				
			//loop counts the elements to show to know when it will finish and add the last </li>
			  $.each(data.json_items, function(j, jitem1) {
					if(categoryId == data.json_items[j].category_id || categoryId == -1)
					{
						totalItems++;
					}
				});
			
			  detectOrientation(data.json_items);
			  
		   },
		  statusCode: {
			 404: function() {
			   //alert('There was a problem with the server.  Try again soon!');
			 }
		   }
		});
		
	}
	
	var checkResolusion = function(){
		
		var	x = w.innerWidth || e.clientWidth || g.clientWidth,
			y = w.innerHeight|| e.clientHeight|| g.clientHeight;
			//alert(x);
			if(x<y && x<768)
			{
				//alert("x1: "+x);
				numOfGame = 16;
				classImgWr="col-xs-6 col-sm-4 col-lg-3 imgWrap";
			}
			
			else if(x>y && x<=768)
			{
				//alert("x2: "+x);
				numOfGame = 16;
				classImgWr="col-xs-4 col-sm-4 col-lg-3 imgWrap";
			}
			
			else if(x<y && x>768)
			{
				//alert("x3: "+x);
				numOfGame = 18;
				classImgWr="col-xs-4 col-sm-3 col-lg-3 imgWrap";
			}
			
			else if(x>y && x>768)
			{
				//alert("x4: "+x);
				numOfGame = 16;
				classImgWr="col-xs-4 col-sm-4 col-lg-3 imgWrap";
			}
			
			else if(x>y && x<=768)
			{
				//alert("Pen-ultimo: x<y && x>=768");
				numOfGame = 16;
				classImgWr="col-xs-4 col-sm-4 col-lg-3 imgWrap";
			}
			
			else if(x<y && x>=768)
			{
				//alert("ultimo: x<y && x>=768");
				numOfGame = 12;
				classImgWr="col-xs-4 col-sm-4 col-lg-3 imgWrap";
			}
			
			return [numOfGame, classImgWr]; 
		
	}
	
	var detectOrientation = function(di){
		
		////console.log("detec numgame:"+numOfGame);
		var position;
		var infoCheckResolusion;
		var startNumOfgame;
		
		if(isMobile){
			$(window).bind( 'orientationchange', function(e){
				infoCheckResolusion = checkResolusion();
				console.log(infoCheckResolusion[0]);
				position=jQuery.event.special.orientationchange.orientation();
						
				
				if(startNumOfgame != infoCheckResolusion[0])
				{
					liLoop(di,infoCheckResolusion[0],infoCheckResolusion[1]);
					startNumOfgame = infoCheckResolusion[0];
				}
				
				else
				{
					
					$(".imgWrap").attr('class',infoCheckResolusion[1]+" imgWrap");
					//callHead();
					
				}
			});
		}
		
		//first resolusion before event orientationchange is actived
		if(isMobile && (position==null || position===undefined)){
			infoCheckResolusion=checkResolusion();
			liLoop(di,infoCheckResolusion[0],infoCheckResolusion[1]);
			startNumOfgame = infoCheckResolusion[0];
			
		}
			
		if (!isMobile){
		
			liLoop(di,18,"col-xs-4 col-sm-4 col-lg-3 imgWrap");
		
		}
	
	}
	
	var liLoop = function(di, numOfGame, classImgWrapper){
		
		 var containerIndex=0;
		 var liClass="pane"+containerIndex;
		 var count=1;
		 var $pageCounterEl;
		 var $ulEl=createElement("ul","", "ulElId");
		 var idD;
		 var $parentPageCounter=$("#pageCounters");
		 //var i = 0;
		 var $carousel = $("#carousel");
		 var $li = "";
		 var findEl = false;
		 //$ulEl.fadeIn();
		 $("#pageCounters").html("");
		 
		 $carousel.html("").hide();
		 $("#loading").show();
		 
		 var $parent=$carousel;
		 $parent.append($ulEl);
			
		 $.each(di, function(i, jitem) {
			 
				if(categoryId==di[i].category_id || categoryId==-1)
					{
					  findEl = true;
					  if((count-1)%numOfGame==0 && (count-1) < totalItems && findEl)
						{
							findEl = false;
							checkCount=count;
							containerIndex++;
							////alert(containerIndex);
							liClass = "pane"+containerIndex;
							$li = createElement("li",liClass);
							addById($li,$ulEl);
							//idD = "divCounterPageEl"+i;
							idD = "divCounterPageEl";
							
							
							$pageCounterEl = createElement("div","divCounterPageEl",idD);
							addById($pageCounterEl,$parentPageCounter);
							//$("#"+idD).html(containerIndex);
						}
				  }
				 
				  if(categoryId==di[i].category_id || categoryId==-1)
					{
						var idA="imgWrapA"+i;
						var idB="imgWrapB"+i;
						var idC="gameName"+i;
						
						////console.log("detec numgame3:"+classImgWrapper);
						var $divImgWrap=createElement("div",classImgWrapper, idA);
						addByClass($divImgWrap,$li);
						$divImgWrap.css("display","none");
						
						var $divImgWrap2=createElement("div","span_10_pic", idB);
						addById($divImgWrap2,$divImgWrap);
						
						
						var $img=createElement("img","span_12_pic", di[i].pictureUrl+"-"+i+"img","img/"+di[i].pictureUrl+".png",di[i].id);
						var $divName=createElement("div","span_12_pic divName", di[i].name+"-"+i);
						$($divName).html(di[i].name);
						addById($img,$divImgWrap2);
						addById($divName,$divImgWrap2);
						
							var $description=createElement("div","description", di[i].pictureUrl+"-"+i,"",di[i].id);
							$description.css("padding","1%");
							$description.css("visibility","visible").hide().fadeIn();
							addById($description,$divImgWrap2);
							$($description).html(di[i].description);
							
							var $button1 = createElement("button","button", di[i].id,"Demo",di[i].id);
							$($button1).html("Demo");
							var styles = { padding : "1%",
								margin: "4px"
										 };
							$button1.css(styles);
							
							$description.append($button1);
							
						if(isMobile)
						{
							$(".description").css("display","none");
						}
						
						count++;
						//console.log(count);
					}   
			  });
			  
			  callHead();
			  $("#loading").hide();
			  $(".imgWrap").css("display","block");
			  $carousel.show();
			  
	}
	
	
	var createElement = function (typeOfElement, classCss, idCss, srcImg,gId){
		var $el2=$(document.createElement(typeOfElement));
		$el2.addClass(classCss);
		$el2.attr( 'id', idCss );
		$el2.attr( 'data-gameId', gId);
		if(typeOfElement=="img"){
			$el2.attr( 'src', srcImg );
			}
			
		if(typeOfElement=="button"){
			$el2.attr( 'type', classCss);
			$el2.attr( 'data-gameId',idCss);
			}
		return $el2;
		
	}
		
	var addById = function(from, to){
		var $par=$("#"+$(to).attr('id'));
		$par.append(from);
		
	}
	
	var addByClass = function(from, to){
		var $par = $("."+$(to).attr('class'));
		$par.append(from);
		
	}
	
	var setCategoryToShow = function (indexMenu){
		
			  switch(indexMenu)
				{
					case 0:
					 categoryId = -1;
					break;
					
					case 1:
						categoryId = 1;
					break;
					
					case 2:
					 categoryId = 2;
					break;
					
					case 3:
					 categoryId = 3;
					break;
					
					case 4:
					 categoryId = 4;
					break;
					
					case 4:
					 categoryId = 4;
					break;
					
					default:
					  categoryId = -1;
				}
	
			 return categoryId;
		 }
		
	var callHead = function() {
		
		  if(callHeadStart){
			   
			   head.js("js/head.min.js","js/jquery.js","js/jquery.mobile-1.3.2.min.js","js/hammer/modernizr.js", "js/hammer/jquery.hammer.js", "js/hammer/hammerCarousel.js", "js/bootstrap.min.js", "js/holder.js","js/hammer/ga.js",
			   function(){
					addEventClickPageCounter();
				 }
			);
			}
			
			else{
				head.js("js/head.min.js","js/hammer/modernizr.js", "js/hammer/jquery.hammer.js", "js/hammer/hammerCarousel.js","js/hammer/ga.js",
					   function(){
							addEventClickPageCounter();
						 }
					  );
		}
		
		callHeadStart = false;
	}
	
	var addEventClickPageCounter = function(){
		var $pageCounters= $("#pageCounters div");
		$($pageCounters[0]).attr("class","divCounterPageEl actived");
		
		$pageCounters.click(function(){
			
			if($pageCounters.index(this) >= 0){
			index = $pageCounters.index(this);
			carousel.showPane(index,true);
			$($pageCounters).attr("class","divCounterPageEl");
			$($pageCounters[index]).attr("class","divCounterPageEl actived");
			
		 }
			
	  });
	  
	  var $pageCountersDiv;
	  if(isMobile){
		
	   $pageCountersDiv = $('#ulElId li div div>img');
	  }
	  else{
		$pageCountersDiv = $('#ulElId li div div div>button');
	  }
		
		$pageCountersDiv.click(function(){
			console.log($(this).attr("data-gameid"));
			goToPlay2($(this).attr("data-gameid"));
			
	  });
	  
	}
	
	var goToPlay2 = function (i){
		var url="";
		i=i.toString();
		
		switch(i)
		{
			case "1":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=5xmagicmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "2":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=aceofspadesmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "3":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=aztecidolsmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "4":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=belloffortunemobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "5":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=blackjackmhmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "6":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=casinoholdemmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "7":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=casinostudpokermobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "8":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=deuceswildprbmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "9":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=dragonshipmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "10":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=enchantedmeadowmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "11":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=europeanroulettemobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "12":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=fortunetellermobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "13":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=giftshopmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "14":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=goldengoalmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "15":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=goldtrophy2mobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "16":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=gumballmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "17":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=holeinonemobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "18":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=irishgoldmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "19":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=jackpotpokerprbmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "20":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=jacksorbetterprbmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "21":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=jewelboxmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "22":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=jokerpokerprbmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "23":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=jollyrogermobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "24":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=kenomobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "25":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=leprechaungoesegyptmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "26":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=luckydiamondsmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "27":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=minibaccaratmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "28":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=mythmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "29":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=ninjafruitsmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "30":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=pearllagoonmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "31":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=richesoframobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "32":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=scratchahoymobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "33":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=speedcashmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "34":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=treycardpokermobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "35":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=triplechancehilomobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "36":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=trollhuntersmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "37":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=wildbloodmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			case "38":
			url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=wildmelonmobile&ctx=AllGames&lang=en_GB&practice=1";
			break;
			default:
			  url = "http://m2.playngonetwork.com/casino/PlayMobile?pid=2&gid=wildmelonmobile&ctx=AllGames&lang=en_GB&practice=1";
		}
		////alert(url);
		window.location.assign(url);
		
	}
	
	var redirectToGame = function(){
        var objElement = document.getElementById("gamesInSelect");
        var selectedText = objElement.options[objElement.selectedIndex].text;
        goToPlay2(objElement.selectedIndex+1);
    }
	
	
	$( "#gamesInSelect" ).change(function() {
  		redirectToGame();
	});
	
	var goToPlay = function(index1){
		
		var idDiv = "playGame"+index1;
		var $playGameDiv = createElement("div","playGame","playGame");
		var $backArrow = createElement("div","backArrow","backArrow");
		var beforeContent = $("#carousel").html();
		//console.log(beforeContent);
		$("#carousel").html("");
		
		var $parent = $("#showGame");
		$parent.append($playGameDiv);
		$("#playGame").html("Here we will show the game num: "+index1);
		
		$parent=$("#playGame");
		$parent.append($backArrow);
		$("#backArrow").click(function(){
			
			$(".coverflow").css("display", "block");
			
			$("#wrapperPageCounters").css("display", "block");
			$("nav").show();
		
			$("footer").show();
			$("#carousel").html(beforeContent);
			callHead();
			$("#playGame").remove();
			
		 }
	   ); 
		
	}
	
	
	var createDivDescription = function(el){
		var getArrowToShow;
		var $myId;
		var idString=(el.id).toString();
		var idSubstring=idString.substring(0,(idString.length)-3);
		
		//console.log("id "+idSubstring);
		getArrowToShow=document.getElementById(idSubstring);
		
		return getArrowToShow;
		
		}

}



