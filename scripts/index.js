let wordToLookup;
let dataFromAPI;


$(document).ready(function(){

    //when a word is entered into input, call function
    $('#word-form').submit(searchWord);


});


function searchWord(e){

    //reset all previous word pronunciation details and extra tabs
    resetEverything();

    let enLink = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    
    e.preventDefault();
    
    console.log("inside searchWord funciton");

    

   wordToLookup = document.getElementById("input-word").value;

   console.log("Word to look up: " + wordToLookup);

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
            console.log("Success! 200 level reply");

            //clear the input field
            document.getElementById("word-form").reset();
            
            // ok response receivede
            return res.json();
            // turning the response into readable json format
        }
        else{
            console.log("Not successful. 404 error");
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

    makePrimaryTab(dataFromAPI);

    if(dataFromAPI.length > 1){
        console.log("More than one version of " + wordToLookup + " received.");
        
        makeSecondaryTabs(dataFromAPI);
    
    }
   
}

let makePrimaryTab = dataFromAPI => {

    $('#myTab').append('<li class="nav-item"><a class="nav-link active" id="word-to-look-up-tab" data-toggle="tab" href="#word-to-look-up-div" role="tab" aria-controls="home" aria-selected="true">Word</a></li>');

    $('#myTabContent').append('<div class="tab-pane fade show active" id="word-to-look-up-div" role="tabpanel" aria-labelledby="home-tab"></div>');

    console.log("Inside make primary tag function");


    //added all pronunciation details including the word, phonetics, and audio
    if(dataFromAPI.length == 1){
        $("#word-to-look-up-tab").html(dataFromAPI[0].word.charAt(0).toUpperCase() + dataFromAPI[0].word.slice(1));
    }
    else{
        $("#word-to-look-up-tab").html(dataFromAPI[0].word);
    }

    //word if that index has a definition
    // phenetics
    //audio
    let phoneticsText;
    let audioLink;
    if(dataFromAPI[0].phonetics[0] === undefined){
        console.log("Primary tab: phonetics missing.");
    }
    else{
        phoneticsText = dataFromAPI[0].phonetics[0].text;
        audioLink = dataFromAPI[0].phonetics[0].audio;
        console.log("Phonetics of " + wordToLookup + ": " + phoneticsText);
        console.log("Audio of " + wordToLookup + ": " + audioLink);
        $("#word-to-look-up-div").append('<audio controls id="audio-section"> <source id="audio-link" src="' + audioLink + '" /> </audio>', '<p class="phonetics" title="phonetics for ' + wordToLookup + '">' + phoneticsText + '</p>', '<hr>');

    }
  
    
    
    //iterate through meanings based on part of speech
    for(let j = 0; j < dataFromAPI[0].meanings.length; j++){

        $('#word-to-look-up-div').append('<p class="part-of-speech">As: <span>' + dataFromAPI[0].meanings[j].partOfSpeech + '</span></p>');

        for(let k = 0; k < dataFromAPI[0].meanings[j].definitions.length; k++){

            $('#word-to-look-up-div').append('<p>' + dataFromAPI[0].meanings[j].definitions[k].definition + '<p>');

            if(dataFromAPI[0].meanings[j].definitions[k].example === undefined){
                console.log("No examples exist");
            }
            else{
                $('#word-to-look-up-div').append('<div class="indented-block"><p>Example: "' + dataFromAPI[0].meanings[j].definitions[k].example + '"</p></div>');

            }
            

            
            if(dataFromAPI[0].meanings[j].definitions[k].synonyms === undefined){
                console.log("No synonyms exist");
            }
            else{
                //put space in between synonyms
                for(synonym in dataFromAPI[0].meanings[j].definitions[k].synonyms){
                    dataFromAPI[0].meanings[j].definitions[k].synonyms[synonym] = " " + dataFromAPI[0].meanings[j].definitions[k].synonyms[synonym];
                }

                $('#word-to-look-up-div').append('<div class="indented-block"><p>Synonyms: ' + dataFromAPI[0].meanings[j].definitions[k].synonyms + '</p></div>');
            }
            
            
        }

        $('#word-to-look-up-div').append('<hr></hr>');
    }

    return;

}



let makeSecondaryTabs = dataFromAPI => {

    console.log("Inside make secondary tabs function");

    for(let p = 1; p < dataFromAPI.length;p++){

        $('#myTab').append('<li class="nav-item"><a class="nav-link" id="word-defintions-tab"' + p + '" data-toggle="tab" href="#word-defintions' + p + '" role="tab" aria-controls="profile" aria-selected="false">' + dataFromAPI[p].word + '</a></li>');

        $('#myTabContent').append('<div class="tab-pane fade" id="word-defintions' + p + '" role="tabpanel" aria-labelledby=profile-tab"></div>');

        if(dataFromAPI[p].phonetics[0] === undefined){
            console.log("Missing phonetics secondary tabs");
        }
        else{
            let phoneticsText1 = dataFromAPI[p].phonetics[0].text;
            let audioLink1 = dataFromAPI[p].phonetics[0].audio;
            console.log("Phonetics of secondary tab " + wordToLookup + ": " + phoneticsText1);
            console.log("Audio of secondary tab " + wordToLookup + ": " + audioLink1);

            
            
            $('#myTabContent div:last').append('<audio controls id="audio-section' + p + '"> <source id="audio-link" src="' + audioLink1 + '" /> </audio>', '<p class="phonetics' + p + '" title="phonetics for ' + wordToLookup + '">' + phoneticsText1 + '</p>', '<hr>');
        }
        

        
        //iterate through meanings based on part of speech
        for(let j = 0; j < dataFromAPI[p].meanings.length; j++){

            //check this selector
            $('#myTabContent div:last').append('<p class="part-of-speech">As: <span>' + dataFromAPI[p].meanings[j].partOfSpeech + '</span></p>');

            for(let k = 0; k < dataFromAPI[p].meanings[j].definitions.length; k++){

                $('#myTabContent div:last').append('<p>' + dataFromAPI[p].meanings[j].definitions[k].definition + '<p>');

                if(dataFromAPI[p].meanings[j].definitions[k].example === undefined){
                    console.log("No examples exist");
                }
                else{
                    $('#myTabContent div:last').append('<div class="indented-block"><p>Example: "' + dataFromAPI[p].meanings[j].definitions[k].example + '"</p></div>');

                }
            

                
                if(dataFromAPI[p].meanings[j].definitions[k].synonyms === undefined){
                    console.log("No synonyms exist");
                }
                else{

                    //put space in between synonyms
                    for(synonym in dataFromAPI[p].meanings[j].definitions[k].synonyms){
                        dataFromAPI[p].meanings[j].definitions[k].synonyms[synonym] = " " + dataFromAPI[p].meanings[j].definitions[k].synonyms[synonym];
                    }


                    $('#myTabContent div:last').append('<div class="indented-block"><p>Synonyms: ' + dataFromAPI[p].meanings[j].definitions[k].synonyms + '</p></div>');
                }
            }
            
        }

        $('#myTabContent').append('<hr></hr>');
    }

    

    //tabs as many as useful objects in array
    //in each tab
    //defintion, example, any thing else useful and a link to dictionary and maybe to sentence dict
    //a function to reste everything


}


let resetEverything = () =>{

    $('#myTab').empty();
    $('#myTabContent').empty();
}