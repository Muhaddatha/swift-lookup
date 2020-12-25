let wordToLookup;

$(document).ready(function(){

    //when a word is entered into input, call function
    $('#word-form').submit(searchWord);


});


function searchWord(e){
    
    e.preventDefault();
    
    console.log("inside searchWord funciton");

    

   wordToLookup = document.getElementById("input-word").value;

   console.log("Word to look up: " + wordToLookup);

   //clear the input field
   document.getElementById("word-form").reset();
}