(function () {
	'use strict';

	var randomGuess = 0;
	var trialCount = 0;
	var guessTrials = [];
	var userGuess = 0;

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		if(randomGuess === 0) {	
			randomGuess = Math.floor(Math.random() * (max - min)) + min;

		}
		return randomGuess; 
	}

	function getUserGuess() {
		userGuess = +$("#js-user-guess").val();
		return userGuess;
	}

	/*--- Display the Feedback ---*/
	function displayFeedback (feedback) {
		$("#feedback").text(feedback);
	}

	function checkGuessValidity() {
		if(userGuess === 0 ) {	
			displayFeedback("Please Enter number!");

		} else if(userGuess >= 101 ) {
			displayFeedback("Oops! Your guess has to be a number between 1 and 100!");

		} else if(userGuess <= 0 ) {
			displayFeedback("Oops! Your guess has to be a number between 1 and 100!");

		}	else if($.inArray(userGuess, guessTrials) !== -1) {
			displayFeedback("Oops! You already guessed that number. Please try a new number.");

		} else{ 
			checkResultTemp();
			trialCount += 1;
			guessingCount(trialCount);
			guessTrials.push(userGuess);
			$("#guessList").append('<li class=" js-guess-list">' + userGuess +'</li>');
			$("#js-user-guess").val('');
		}
	}

	/*--- Check how far the guess is and provide feedback---*/
	function checkResultTemp() {
		var	userGuess = +$("#js-user-guess").val();
		var distanceFromNumber = (Math.abs(randomGuess - userGuess)); 	

		if (distanceFromNumber === 0) {
			displayFeedback("You Got It!!!");
			$("#js-user-guess").val(randomGuess + "!");

		} else if (distanceFromNumber < 2 ) {
			displayFeedback("Scalding!");

		} else if (distanceFromNumber < 4 ) {
			displayFeedback("Very Hot!");

		} else if (distanceFromNumber < 8 ) {
			displayFeedback("Hot!");

		} else if (distanceFromNumber < 13 ) {
			displayFeedback("Warm!");

		} else if (distanceFromNumber < 23 ) {
			displayFeedback("Luke Warm!");

		} else if (distanceFromNumber < 38 ) {
			displayFeedback("Cool!");

		} else if (distanceFromNumber < 54 ) {
			displayFeedback("Cold!");

		} else {
			displayFeedback("Ice Cold!");

		}
	}

	function guessingCount(count) {
		$(".js-guess-count").text(count);
	}

	function reset() {
		guessingCount(0);
		guessTrials = [];
		displayFeedback("Make your Guess!");
		userGuess = +$("#js-user-guess").val('')
		$(".js-guess-list").remove();
	}

	function handleInstructionsModal() {
		// fade in the instructions modal
		$('.js-what').click(function() {  
			$('.overlay').fadeIn(1000);
		});

		// fade out the instructions modal
		$('.js-close').click(function(){
			$(".overlay").fadeOut(1000);
		});
	}

	function gameHandeling() {
		$('.js-new-game').click(function() {
			reset();
			getRandomInt(0, 101);
		});

		$('#js-guess-submit').click(function(e){
			e.preventDefault();
			getRandomInt(0, 101);
			getUserGuess();
			checkGuessValidity();
		});
	}

	$(function(){  
		handleInstructionsModal();
		gameHandeling();
	});

})();
