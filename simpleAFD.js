const fin = "Sirul e acceptat";
const rej = "Sirul e respins: ";
const err = "Elementul respins: ";

var listDiv = null;

const simpleDFA = {
  a: {
    0:"a",
    1:"b",
    isAccept:false
  },
  b: {
    0:"c",
    1:"d",
    isAccept:true
  },
  c: {
    0:"c",
    1:"c",
    isAccept:false
  },
  d: {
    0:"e",
    1:"d",
    isAccept:true
  },
  e: {
    0:"c",
    1:"c",
    isAccept:true
  },  
  startState: "a",
  vocabulary: "01"
}

function getNextState(currentState, input){
  if(simpleDFA.vocabulary.includes(input)) {
   return simpleDFA[currentState][input];
  } else {
    return err + input;
  }
}

//recursive function that does the heavy lifting
function validateStream(inputString, currentState) {
  
  drawTransition("Starea curenta: " + currentState + ", Sirul ramas: " + inputString);
  if(inputString.length > 0) {
    var nextState = getNextState(currentState, inputString[0]);
    if(nextState.indexOf(err) !== -1){
      return nextState;
    } else {
      return validateStream(inputString.slice(1), nextState);
    }
  } else if (simpleDFA[currentState].isAccept == true) {
      return fin;
  } else {
    return rej + "sirul finisat la starea " + currentState;
  }
}

function drawTransition(output){
  var node = document.createElement("li");
  listDiv.appendChild(node);
  var text = document.createTextNode(output);
  node.appendChild(text);
}

function processInput(){
  var input = document.getElementById("streamInput").value;
  listDiv = document.getElementById("transitionList");
  listDiv.innerHTML = '';
  var output = validateStream(input.trim(), simpleDFA.startState);
  var text = document.createTextNode(output);
  var resultsNode = document.getElementById("results");
  resultsNode.innerHTML = '';
  resultsNode.appendChild(text);
}

