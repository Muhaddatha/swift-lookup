let wordToLookup;
let enLink = "https://api.dictionaryapi.dev/api/v2/entries/en/";

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

   //create link
   enLink += wordToLookup;
   console.log("Link to look up: " + enLink);

   
   
}