//Initailize array of objects.
let timestamps = [
  { id: 'hasMoved', Boolean: false },//0
  { id: 'StartGame', TimeStamp: "" },//1
  { id: 'L1FirstMove', TimeStamp: "" },//2
  { id: 'L1Complete', TimeStamp: "" },//3
  { id: 'L2FirstMove', TimeStamp: "" },//4
  { id: 'L2Complete', TimeStamp: "" },//5
  { id: 'L3FirstMove', TimeStamp: "" },//6
  { id: 'L3Complete', TimeStamp: "" },//7
  { id: 'L4FirstMove', TimeStamp: "" },//8
  { id: 'L4Complete', TimeStamp: "" },//9
  { id: 'L5FirstMove', TimeStamp: "" },//10
  { id: 'L5Complete', TimeStamp: "" },//11
  { id: 'L6FirstMove', TimeStamp: "" },//12
  { id: 'L6Complete', TimeStamp: "" },//13
  { id: 'L7FirstMove', TimeStamp: "" },//14
  { id: 'L7Complete', TimeStamp: "" },//15
  { id: 'EndGame', TimeStamp: "" },//16
  // redoes.
  { id: 'L1RedoCount', Count: 0 },//17
  { id: 'L2RedoCount', Count: 0 },//18
  { id: 'L3RedoCount', Count: 0 },//19
  { id: 'L4RedoCount', Count: 0 },//20
  { id: 'L5RedoCount', Count: 0 },//21
  { id: 'L6RedoCount', Count: 0 },//22
  { id: 'L7RedoCount', Count: 0 },//23
  // pipes used.
  { id: 'L1PipesUsed', Count: 0 },//24
  { id: 'L2PipesUsed', Count: 0 },//25
  { id: 'L3PipesUsed', Count: 0 },//26
  { id: 'L4PipesUsed', Count: 0 },//27
  { id: 'L5PipesUsed', Count: 0 },//28
  { id: 'L6PipesUsed', Count: 0 },//29
  { id: 'L7PipesUsed', Count: 0 }]//30

function saveToLocal(keyValue, numPipesUsed) {

  //Find index of specific object using findIndex method.    
  objIndex = timestamps.findIndex(obj => obj.id == keyValue);

  // FIRST MOVE.
  if (keyValue == 'hasMoved') {
    if (timestamps[objIndex].Boolean == true) {
      timestamps[objIndex].Boolean = false;
    } else {
      timestamps[objIndex].Boolean = true;
    }
  }
  // timestamps.
  else if (objIndex >= 1 && objIndex <= 16){
    timestamps[objIndex].TimeStamp = Date.now();
  } 
  // redo count.
  else if (objIndex >= 17 && objIndex <= 23){
    timestamps[objIndex].Count += 1;
  }
  // piped used.
  else {
    timestamps[objIndex].Count = numPipesUsed;
  }
   

  // save to local.
  localStorage["timestamps"] = JSON.stringify(timestamps);

  // console.
  console.log(localStorage);
}

// 0 if not done played.
function getTotalTimeSeconds() {
  var startTS = new Date(timestamps[1].TimeStamp);
  var endTS;
  if (timestamps[16].TimeStamp != "") {
    endTS = new Date(timestamps[16].TimeStamp);
    return (endTS.getTime() - startTS.getTime()) / 1000;
  }
  else {
    return 0;
  }

}
function displayTotalTimeSeconds() {
  console.log("Total time: " + getTotalTimeSeconds() + " seconds")
}

function Results(){
  
  var x = document.getElementById("Resultpanel");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

//Total game Time
   var resultsForDisplay =  calcTime(new Date(timestamps[16].TimeStamp),1) ;
   document.getElementById("TotalTime").innerHTML = resultsForDisplay;
//Level Times
   resultsForDisplay =  calcTime(new Date(timestamps[3].TimeStamp),2);
   document.getElementById("L1Time").innerHTML = resultsForDisplay;
   resultsForDisplay =  calcTime(new Date(timestamps[5].TimeStamp),4);
   document.getElementById("L2Time").innerHTML = resultsForDisplay;
   resultsForDisplay =   calcTime(new Date(timestamps[7].TimeStamp),6);
   document.getElementById("L3Time").innerHTML = resultsForDisplay;
   resultsForDisplay =  calcTime(new Date(timestamps[9].TimeStamp),8);
   document.getElementById("L4Time").innerHTML = resultsForDisplay;
   resultsForDisplay =  calcTime(new Date(timestamps[11].TimeStamp),10);
   document.getElementById("L5Time").innerHTML = resultsForDisplay;
   resultsForDisplay =  calcTime(new Date(timestamps[13].TimeStamp),12);
   document.getElementById("L6Time").innerHTML = resultsForDisplay;
   resultsForDisplay =  calcTime(new Date(timestamps[15].TimeStamp),14);
   document.getElementById("L7Time").innerHTML = resultsForDisplay;

//redos per level
  document.getElementById("L1Redos").innerHTML = (timestamps[17].Count);
  document.getElementById("L2Redos").innerHTML = (timestamps[18].Count);
  document.getElementById("L3Redos").innerHTML = (timestamps[19].Count);
  document.getElementById("L4Redos").innerHTML = (timestamps[20].Count);
  document.getElementById("L5Redos").innerHTML = (timestamps[21].Count);
  document.getElementById("L6Redos").innerHTML = (timestamps[22].Count);
  document.getElementById("L7Redos").innerHTML = (timestamps[23].Count);
  
//# of pipes used per level
  document.getElementById("L1Pipes").innerHTML = (timestamps[24].Count);
  document.getElementById("L2Pipes").innerHTML = (timestamps[25].Count);
  document.getElementById("L3Pipes").innerHTML = (timestamps[26].Count);
  document.getElementById("L4Pipes").innerHTML = (timestamps[27].Count);
  document.getElementById("L5Pipes").innerHTML = (timestamps[28].Count);
  document.getElementById("L6Pipes").innerHTML = (timestamps[29].Count);
  document.getElementById("L7Pipes").innerHTML = (timestamps[30].Count);
  
}

function calcTime(date, startIndex) {
  var startDate = timestamps[startIndex].TimeStamp;
  if (startDate != '') {
    var startTS = new Date(timestamps[startIndex].TimeStamp);
    let totalSeconds = (date.getTime() - startTS.getTime()) / 1000;      // seconds
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
  
    // format:
    minutes = String(minutes).padStart(2, "0");
    hours = String(hours).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    var stringResult = hours + ":" + minutes + ":" + seconds;
    return stringResult;
  }
  return "00:00:00";

}





    // if (keyName === false) {
    //     //local storage.
    //     var object = { value: "value", flag: "false" }
    //     localStorage.setItem("firstMove", JSON.stringify(object));
    // } else if (keyName === true) {
    //     //local storage.
    //     var object = { value: "value", flag: "true" }
    //     localStorage.setItem("firstMove", JSON.stringify(object));
    // }
    // else {
    // // timestamps.
    // var customTime = Date.now();
    // //local storage.
    // var object = { value: "value", timestamp: new Date(customTime) }
    // localStorage.setItem(keyName, JSON.stringify(object));

    // //retrieve
    // var objectOut = JSON.parse(localStorage.getItem(keyName));
    // var resultTS = objectOut.timestamp;

    // console.log(new Date(resultTS));
    // }