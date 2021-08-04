
//Initailize array of objects.
let timestamps = [
    {id: 'hasMoved', Boolean: false},
    {id: 'StartGame', TimeStamp: ""},
    {id: 'L1FirstMove', TimeStamp: ""},
    {id: 'L1Complete', TimeStamp: ""},
    {id: 'L2FirstMove', TimeStamp: ""},
    {id: 'L2Complete', TimeStamp: ""},
    {id: 'L3FirstMove', TimeStamp: ""},
    {id: 'L3Complete', TimeStamp: ""},
    {id: 'L4FirstMove', TimeStamp: ""},
    {id: 'L4Complete', TimeStamp: ""},
    {id: 'L5FirstMove', TimeStamp: ""},
    {id: 'L5Complete', TimeStamp: ""},
    {id: 'L6FirstMove', TimeStamp: ""},
    {id: 'L6Complete', TimeStamp: ""},
    {id: 'L7FirstMove', TimeStamp: ""},
    {id: 'L7Complete', TimeStamp: ""},
    {id: 'EndGame', TimeStamp: ""}
  ]
  
function saveToLocal(keyValue) {

    //Find index of specific object using findIndex method.    
    objIndex = timestamps.findIndex(obj => obj.id == keyValue);

    // FIRST MOVE.
    if (keyValue == 'hasMoved'){
        if (timestamps[objIndex].Boolean == true){
            timestamps[objIndex].Boolean = false;
        }else{
            timestamps[objIndex].Boolean = true;
        }
    }
    else{
    // TIMESTAMPS.
    // update timestamp.
    timestamps[objIndex].TimeStamp = Date.now();
    }

    // save to local.
    localStorage["timestamps"] = JSON.stringify(timestamps);

    // console.
    console.log(localStorage);
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


