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
  { id: 'L8FirstMove', TimeStamp: "" },//16
  { id: 'L8Complete', TimeStamp: "" },//17
  { id: 'L9FirstMove', TimeStamp: "" },//18
  { id: 'L9Complete', TimeStamp: "" },//19
  { id: 'L10FirstMove', TimeStamp: "" },//20
  { id: 'L10omplete', TimeStamp: "" },//21
  { id: 'L11FirstMove', TimeStamp: "" },//22
  { id: 'L11Complete', TimeStamp: "" },//23
  { id: 'L12FirstMove', TimeStamp: "" },//24
  { id: 'L12Complete', TimeStamp: "" },//25
  { id: 'L13FirstMove', TimeStamp: "" },//26
  { id: 'L13Complete', TimeStamp: "" },//27
  { id: 'L14FirstMove', TimeStamp: "" },//28
  { id: 'L14Complete', TimeStamp: "" },//29
  { id: 'L15FirstMove', TimeStamp: "" },//30
  { id: 'L15Complete', TimeStamp: "" },//31
  { id: 'L16FirstMove', TimeStamp: "" },//32
  { id: 'L16Complete', TimeStamp: "" },//33
  { id: 'EndGame', TimeStamp: "" },//34

  // redoes.
  { id: 'L1RedoCount', Count: 0 },//35
  { id: 'L2RedoCount', Count: 0 },//36
  { id: 'L3RedoCount', Count: 0 },//37
  { id: 'L4RedoCount', Count: 0 },//38
  { id: 'L5RedoCount', Count: 0 },//39
  { id: 'L6RedoCount', Count: 0 },//40
  { id: 'L7RedoCount', Count: 0 },//41
  { id: 'L8RedoCount', Count: 0 },//42
  { id: 'L9RedoCount', Count: 0 },//43
  { id: 'L10RedoCount', Count: 0 },//44
  { id: 'L11RedoCount', Count: 0 },//45
  { id: 'L12RedoCount', Count: 0 },//46
  { id: 'L13RedoCount', Count: 0 },//47
  { id: 'L14RedoCount', Count: 0 },//48
  { id: 'L15RedoCount', Count: 0 },//49
  { id: 'L16RedoCount', Count: 0 },//50
  
  // pipes used.
  { id: 'L1PipesUsed', Count: 0 },//51
  { id: 'L2PipesUsed', Count: 0 },//52
  { id: 'L3PipesUsed', Count: 0 },//53
  { id: 'L4PipesUsed', Count: 0 },//54
  { id: 'L5PipesUsed', Count: 0 },//55
  { id: 'L6PipesUsed', Count: 0 },//56
  { id: 'L7PipesUsed', Count: 0 },//57
  { id: 'L8PipesUsed', Count: 0 },//58
  { id: 'L9PipesUsed', Count: 0 },//59
  { id: 'L10PipesUsed', Count: 0 },//60
  { id: 'L11PipesUsed', Count: 0 },//61
  { id: 'L12PipesUsed', Count: 0 },//62
  { id: 'L13PipesUsed', Count: 0 },//63
  { id: 'L14PipesUsed', Count: 0 },//64
  { id: 'L15PipesUsed', Count: 0 },//65
  { id: 'L16PipesUsed', Count: 0 },//66
  
]

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
  else if (objIndex >= 1 && objIndex <= 34){
    timestamps[objIndex].TimeStamp = Date.now();
  } 
  // redo count.
  else if (objIndex >= 35 && objIndex <= 50){
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
    endTS = new Date(timestamps[34].TimeStamp);
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
  
  

//Total game Time
   var resultsForDisplay =  calcTime(new Date(timestamps[34].TimeStamp),1) ;
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
   resultsForDisplay =  calcTime(new Date(timestamps[17].TimeStamp),16);
   document.getElementById("L8Time").innerHTML = resultsForDisplay;
   resultsForDisplay =  calcTime(new Date(timestamps[19].TimeStamp),18);
   document.getElementById("L9Time").innerHTML = resultsForDisplay;
   resultsForDisplay =  calcTime(new Date(timestamps[21].TimeStamp),20);
   document.getElementById("L10Time").innerHTML = resultsForDisplay;
   resultsForDisplay =  calcTime(new Date(timestamps[23].TimeStamp),22);
   document.getElementById("L11Time").innerHTML = resultsForDisplay;
   resultsForDisplay =  calcTime(new Date(timestamps[25].TimeStamp),24);
   document.getElementById("L12Time").innerHTML = resultsForDisplay;
   resultsForDisplay =  calcTime(new Date(timestamps[27].TimeStamp),26);
   document.getElementById("L13Time").innerHTML = resultsForDisplay;
   resultsForDisplay =  calcTime(new Date(timestamps[29].TimeStamp),28);
   document.getElementById("L14Time").innerHTML = resultsForDisplay;
   resultsForDisplay =  calcTime(new Date(timestamps[31].TimeStamp),30);
   document.getElementById("L15Time").innerHTML = resultsForDisplay;
   resultsForDisplay =  calcTime(new Date(timestamps[33].TimeStamp),32);
   document.getElementById("L16Time").innerHTML = resultsForDisplay;
   
//redos per level
  document.getElementById("L1Redos").innerHTML = (timestamps[35].Count);
  document.getElementById("L2Redos").innerHTML = (timestamps[36].Count);
  document.getElementById("L3Redos").innerHTML = (timestamps[37].Count);
  document.getElementById("L4Redos").innerHTML = (timestamps[38].Count);
  document.getElementById("L5Redos").innerHTML = (timestamps[39].Count);
  document.getElementById("L6Redos").innerHTML = (timestamps[40].Count);
  document.getElementById("L7Redos").innerHTML = (timestamps[41].Count);
  document.getElementById("L8Redos").innerHTML = (timestamps[42].Count);
  document.getElementById("L9Redos").innerHTML = (timestamps[43].Count);
  document.getElementById("L10Redos").innerHTML = (timestamps[44].Count);
  document.getElementById("L11Redos").innerHTML = (timestamps[45].Count);
  document.getElementById("L12Redos").innerHTML = (timestamps[46].Count);
  document.getElementById("L13Redos").innerHTML = (timestamps[47].Count);
  document.getElementById("L14Redos").innerHTML = (timestamps[48].Count);
  document.getElementById("L15Redos").innerHTML = (timestamps[49].Count);
  document.getElementById("L16Redos").innerHTML = (timestamps[50].Count);
  
//# of pipes used per level
  document.getElementById("L1Pipes").innerHTML = (timestamps[51].Count);
  document.getElementById("L2Pipes").innerHTML = (timestamps[52].Count);
  document.getElementById("L3Pipes").innerHTML = (timestamps[53].Count);
  document.getElementById("L4Pipes").innerHTML = (timestamps[54].Count);
  document.getElementById("L5Pipes").innerHTML = (timestamps[55].Count);
  document.getElementById("L6Pipes").innerHTML = (timestamps[56].Count);
  document.getElementById("L7Pipes").innerHTML = (timestamps[57].Count);
  document.getElementById("L8Pipes").innerHTML = (timestamps[58].Count);
  document.getElementById("L9Pipes").innerHTML = (timestamps[59].Count);
  document.getElementById("L10Pipes").innerHTML = (timestamps[60].Count);
  document.getElementById("L11Pipes").innerHTML = (timestamps[61].Count);
  document.getElementById("L12Pipes").innerHTML = (timestamps[62].Count);
  document.getElementById("L13Pipes").innerHTML = (timestamps[63].Count);
  document.getElementById("L14Pipes").innerHTML = (timestamps[64].Count);
  document.getElementById("L15Pipes").innerHTML = (timestamps[65].Count);
  document.getElementById("L16Pipes").innerHTML = (timestamps[66].Count);
  
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