(function(){

	function initRequest() {
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  /* Make Ajax Call */
  function load() {
    initRequest();
    let url = "http://localhost:3000/feeds";
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = processResponse;
    xhr.send(null);
  }
  /* Call Back fucntion */
  function processResponse() {
    var division = "";
    if (xhr.readyState == 4 && xhr.status == 200) {
      response = JSON.parse(xhr.responseText);
      renderFeeds(response);
    }
  }

  function renderFeeds(response){
  	var userFeedCont = '', userFeedDesc = '';
  	for (let i = 0; i < response.length; i++) {
  		if(response[i].picture){
  			userFeedDesc = '<img src="'+response[i].picture+'" class="width-100-percent" />'
  		}else if(response[i].video){
  			userFeedDesc = 
  					'<video width="100%" height="240" controls>'+
  						'<source src="'+response[i].video+'">'+
  						'Your browser does not support the video tag.'+
						'</video>'
  		}else{
  			userFeedDesc = userFeedDesc = response[i].description;
  		}
  		userFeedCont += 
	  		'<div class="user-feed flex-row">'+
					'<div class="user-icon-container">'+
						'<img src="'+response[i].image+'" alt="Profile Image" />'+
					'</div>'+
					'<div class="flex-column width-100-percent ">'+
						'<div class="flex-row flex-space-between user-feed-header">'+
							'<div class="user-name">'+response[i].name+' <span class="user-id">'+response[i].userid+'</span></div>'+
							'<div class="feed-time">'+response[i].time+'</div>'+
						'</div>'+
						'<div class="flex-row feed-description width-100-percent">'+userFeedDesc+'</div>'+
						'<div class="flex-row flex-space-between">'+
							'<div class="flex-row feed-action-container">'+
									'<button id="action-reply" class="tweet-action"><i class="fas fa-reply"></i><span class="action-count"></span></button>'+
									'<button id="action-star" class="tweet-action"><i class="fas fa-star"></i><span class="action-count"></span></button>'+
									'<button id="action-retweet" class="tweet-action"><i class="fas fa-sync-alt"></i><span class="action-count">'+20+'</span></button>'+
									'<button id="action-more" class="tweet-action"><i class="fas fa-ellipsis-h"></i><span class="action-count"></span></button>'+
							'</div>'+
							'<div>'+
								'<button id="action-expand" class="tweet-action"><i class="fas fa-arrows-alt-v"></i></button>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
  	}
  	document.getElementById("user-feed-container").innerHTML = userFeedCont;
  }

	load();

// ajax after after every 10 secs.
  setInterval(function() {
  	load();
	}, 10000);

})();