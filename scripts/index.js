let wordToLookup;
let dataFromAPI;


$(document).ready(function(){

    //when a word is entered into input, call function
    $('#word-form').submit(searchWord);


});


function searchWord(e){

    //reset all previous word pronunciation details and extra tabs
    //set first tab to 'Word'

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
        }
        
    })
    .then(dataFromAPI => {
        if(success){
            console.log(dataFromAPI);
            parseJSONinformation(dataFromAPI);
        }
        else{
            console.log("error occured! word spelled incorrectly");
            //inform user word was not valid
            informUserOfInvalidWord();
        }
        
    })

    console.log("Returning json data from connect to API function")
    // return data;

}


let informUserOfInvalidWord = () => {
    console.log("Inside informUserOfInvalidWord function\nand word to look up is: " + wordToLookup);
    alert("The word entered (" + wordToLookup + ") is not valid.\nPlease enter a valid word.");
    document.getElementById("input-word").value = wordToLookup;

    //make input box red?

}


//precondition: the word entered by the user is valid 
//wordToLookup has a length of altleast 1 character
let parseJSONinformation = dataFromAPI => {
    console.log("Inside parseJSONinformation function : dataFromAPI " + dataFromAPI);
    console.log(dataFromAPI);

    console.log("Length of dataFromAPI is: " + dataFromAPI.length);
    for(let i = 0; i < dataFromAPI.length; i++){
        console.log("dataFromAPI[" + i + "]: ");
        console.log(dataFromAPI[i]);
        //makeTab(dataFromAPI[i]);
    }

    //word if that index has a definition
    // phenetics
    //audio
    let phoneticsText = dataFromAPI[0].phonetics[0].text;
    let audioLink = dataFromAPI[0].phonetics[0].audio;
    console.log("Phonetics of " + wordToLookup + ": " + phoneticsText);
    console.log("Audio of " + wordToLookup + ": " + audioLink);

    
    //added all pronunciation details including the word, phonetics, and audio
    
    $("#word-to-look-up-tab").html(wordToLookup.charAt(0).toUpperCase() + wordToLookup.slice(1));
    
    $("#word-to-look-up-div").append('<span id="phonetics">Phonetics ' + phoneticsText + '</span>', '<audio controls id="audio-section"> <source id="audio-link" src="' + audioLink + '" /> </audio>');

   
    
    //tabs as many as useful objects in array
    //in each tab
    //defintion, example, any thing else useful and a link to dictionary and maybe to sentence dict
    //a function to reste everything


}
