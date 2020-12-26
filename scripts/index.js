let wordToLookup;
let dataFromAPI;


$(document).ready(function(){

    //when a word is entered into input, call function
    $('#word-form').submit(searchWord);


});


function searchWord(e){

    let enLink = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    
    e.preventDefault();
    
    console.log("inside searchWord funciton");

    

   wordToLookup = document.getElementById("input-word").value;

   console.log("Word to look up: " + wordToLookup);

   //clear the input field
   document.getElementById("word-form").reset();

   //create link
   enLink += wordToLookup;
   console.log("Link to look up: " + enLink);

   connectToAPI(enLink);

}


//arrow function to retrieve JSON data
let connectToAPI = theLink => {

    let success = true;

    console.log("Inside the connect to API function");

    fetch(theLink) //fetch only catches network errors not 404 errors
    .then(res => {
        if(res.ok){
            console.log("Success!");
            // ok response receivede
            return res.json() 
            // turning the response into readable json format
        }
        else{
            console.log("Not successful");
            success = false;
            // got a 404 response
            //inform user word was not correct
        }
        
    })
    .then(dataFromAPI => {
        if(success){
            console.log(dataFromAPI);
        }
        else{
            console.log("error occured! word spelled incorrectly");
        }
        
    })

    console.log("Returning json data from connect to API function")
    // return data;

}