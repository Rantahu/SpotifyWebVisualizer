chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// make visualizer screen
			var visDisplay = document.createElement("DIV");
			visDisplay.id = "visDisplay";
			visDisplay.className = "hidden";

			var hideDisplay = document.createElement("BUTTON");
			hideDisplay.className = "control-button control-button--circled"
			hideDisplay.id = "hideDisplay";
			hideDisplay.innerHTML = "X";

			hideDisplay.addEventListener("click", function(){
				visDisplay.classList.add("hidden");
			});

			var artworkElem = document.createElement("IMG");
			artworkElem.id = "artwork-elem"

			var titleElem = document.createElement("H1");
			titleElem.id = "title-elem";
			titleElem.innerHTML = "Title";

			var artistElem = document.createElement("H2");
			artistElem.id = "artist-elem";
			artistElem.innerHTML = "Artist";

			var spotifyLogo = document.createElement("A");
			spotifyLogo.className = "logo absolute-pos";
			spotifyLogo.href = "/browse";
			spotifyLogo.innerHTML = '<svg viewBox="0 0 167.5 167.5"><title>Spotify</title><path fill="currentColor" d="M83.7 0C37.5 0 0 37.5 0 83.7c0 46.3 37.5 83.7 83.7 83.7 46.3 0 83.7-37.5 83.7-83.7S130 0 83.7 0zM122 120.8c-1.4 2.5-4.6 3.2-7 1.7-19.8-12-44.5-14.7-73.7-8-2.8.5-5.6-1.2-6.2-4-.2-2.8 1.5-5.6 4-6.2 32-7.3 59.6-4.2 81.6 9.3 2.6 1.5 3.4 4.7 1.8 7.2zM132.5 98c-2 3-6 4-9 2.2-22.5-14-56.8-18-83.4-9.8-3.2 1-7-1-8-4.3s1-7 4.6-8c30.4-9 68.2-4.5 94 11 3 2 4 6 2 9zm1-23.8c-27-16-71.6-17.5-97.4-9.7-4 1.3-8.2-1-9.5-5.2-1.3-4 1-8.5 5.2-9.8 29.6-9 78.8-7.2 109.8 11.2 3.7 2.2 5 7 2.7 10.7-2 3.8-7 5-10.6 2.8z"></path></svg>'
			
			visDisplay.appendChild(hideDisplay);
			visDisplay.appendChild(spotifyLogo);
			visDisplay.appendChild(artworkElem);
			visDisplay.appendChild(titleElem);
			visDisplay.appendChild(artistElem);

			// make toggle
			var revealBtn = document.createElement("BUTTON");
			revealBtn.id = "revealButton";
			revealBtn.className = "btn btn-green"
			revealBtn.innerHTML = "Visualize";

			revealBtn.addEventListener("click", function(){
				visDisplay.classList.remove("hidden");
			});

			$('body').append(visDisplay);	
			$('body').append(revealBtn);	

			// data structure
			var CURRENT_PLAYING ={
				"title" : "",
				"artist" : "",
				"artwork" : ""
			}

			// mutation target
			var target = $(".now-playing")[0];

			// check for mutation
			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {

					// update data structure
					CURRENT_PLAYING['artwork']  =  $('.now-playing__cover-art')[0].childNodes[0].childNodes[1].style.backgroundImage.replace('url("','').replace('")','');
					CURRENT_PLAYING['title'] = $('div.track-info__name').text();
					CURRENT_PLAYING['artist'] = $('div.track-info__artists').text();

					artworkElem.src = CURRENT_PLAYING['artwork']
					titleElem.innerHTML = CURRENT_PLAYING['title']
					artistElem.innerHTML = CURRENT_PLAYING['artist']

				});
			});

			var config = {
				attributes: true,
				childList: true,
				characterData: true,
				subtree: true
			};

			observer.observe(target, config);

		}
	}, 10);
});