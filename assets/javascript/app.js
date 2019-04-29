//reate and display the button options for different giphys
//when user clicks on a certain option display 10 giphys related to the button pressed
//when images/giphys are diplayed user can click on image 
//when image is clicked it will play when clicked again it will pause
//user can also search for giphys

//const apikey = "vI6t6bnm2ub1Y9ilRA0ug79X2DsiuTDr";
//const queryURL = "https://api.giphy.com/v1/gifs/search?q=";

const movieTopics = ["Nemo", "Aladin", "Cinderella", "Rapunzel", "snow white"];

function renderButtons(){
    $("#gifButtons").empty();
    
    for(var i = 0; i < movieTopics.length; i++){
        var giphybuttons = $("<buttons>");
        giphybuttons.addClass("option");
        giphybuttons.addClass("btn btn-primary")
        giphybuttons.attr("data-name", movieTopics[i]);
        giphybuttons.text(movieTopics[i]);
        $("#gifButtons").append(giphybuttons);
    }
}


//renderButtons();
function displayMovieTopics(){
     // clear any previous elements that were generated
 // $("#gifsView").empty();
    var movie = $(this).attr("data-name");
    console.log('the movie ',typeof movie);
    //The below for loop is intended for movie titles with spaces.
   // for(var i = 0; i < movie.length; i++){}
    var queryURL = `https://api.giphy.com/v1/gifs/search?&api_key=vI6t6bnm2ub1Y9ilRA0ug79X2DsiuTDr&q=${movie}&limit=10`;
    console.log(queryURL);
	$.ajax({
		url: queryURL, 
		method: "GET"
	}).done (function(response){
        // debugger;
        $("#gifsView").empty();
        var results = response.data;
        console.log(results);
        for(var i = 0; i < results.length; i++){

            var giphyDiv = $("<div>");

            // Creating and storing an image tag
            var giphyImage = $("<img>");
            
            // Setting the src attribute of the image to a property pulled off the result item
            giphyImage.attr("src", results[i].images.fixed_height.url);
            
            giphyImage.attr("data-still", results[i].images.original_still.url);
            giphyImage.attr("data-animate", results[i].images.original.url);
            giphyImage.attr("data-state", "still");
            giphyImage.attr("class", "gif");

            $("#gifsView").append(giphyDiv);
            giphyDiv.append(giphyImage);

            
          
        }
       
    })
    
}

function changeState(){
  var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
}

function newGiphys(){
  $("#addGiphy").on("click", function(){
  var action = $("#action-input").val().trim();
  if (action == ""){
    return false; 
  }
  movieTopics.push(action);
  renderButtons();
  displayMovieTopics();
  return false;
  });
}
newGiphys();

$(document).on("click", ".option", displayMovieTopics);
// Calling the renderButtons function to display the intial buttons
renderButtons();
$(document).on("click", ".gif", changeState);