var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var request = require('request');
var Promise = require("bluebird");
var rp = require('request-promise');

var totalNumberOfRequestsCompleted=0;
var totalNumberOfRequestsNeedToBeMade=0;
var dataToBeAnalyzedForRelevance={};
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.post('/getFinalMeaning', function(req, res, next) {
  var id=req.body.id;
  var searchUri='https://www.wikidata.org/wiki/Special:EntityData/'+id+'.json';
  console.log(searchUri);
  request(searchUri, function (error, response, body) {
    if (!error && response.statusCode == 200) {
          var description=dataToBeAnalyzedForRelevance["description"]=getDescription(body,id);
        var fullData=dataToBeAnalyzedForRelevance["fullData"]=processEntityData(body,id);
       var onlyPandQ=dataToBeAnalyzedForRelevance["onlyPandQ"]=processFullData(fullData);
         processOnlyPandQ(onlyPandQ,res);

    }
  });
});

function getDescription(data,searchString){

  var obj = JSON.parse(data);
  var description=obj["entities"][searchString]["descriptions"]["en"]["value"];
  return description;
}

function processEntityData(data,id){
  var obj = JSON.parse(data);
  var claims=obj["entities"][id]["claims"];
  var objToBeReturned={};
  for (var firstTempVarForKeyRunover in claims) {
  if (claims.hasOwnProperty(firstTempVarForKeyRunover)) {
    tempStorageForClaimsObj=claims[firstTempVarForKeyRunover];
    var counterforTempArray=0;
    var tempArrayToStoreMultipleObjects=[];
     for (var secondTempVarForKeyRunover in tempStorageForClaimsObj) {
       if (tempStorageForClaimsObj.hasOwnProperty(secondTempVarForKeyRunover)) {
         if(tempStorageForClaimsObj[secondTempVarForKeyRunover]["mainsnak"]["datavalue"] !== undefined){
         tempArrayToStoreMultipleObjects[counterforTempArray++]=
         tempStorageForClaimsObj[secondTempVarForKeyRunover]["mainsnak"]["datavalue"]["value"];
       }
       }
     }
     objToBeReturned[firstTempVarForKeyRunover]=tempArrayToStoreMultipleObjects;

  }

}

  return objToBeReturned;

}


function processFullData(fullData) {
  var objToBeReturned={};


  for (var firstTempVarForKeyRunover in fullData) {
    if (fullData.hasOwnProperty(firstTempVarForKeyRunover)) {
      var tempArrayToStoreMultipleObjects=[];
      totalNumberOfRequestsNeedToBeMade++;
      for (var i = 0; i < fullData[firstTempVarForKeyRunover].length; i++) {
        if(fullData[firstTempVarForKeyRunover][i]["numeric-id"] !== undefined){
          totalNumberOfRequestsNeedToBeMade++;
          tempArrayToStoreMultipleObjects[i]=fullData[firstTempVarForKeyRunover][i]["numeric-id"];
        }
        else{
          totalNumberOfRequestsNeedToBeMade--;
        }
      }

    }
    if (tempArrayToStoreMultipleObjects.length > 0) {
      objToBeReturned[firstTempVarForKeyRunover]=tempArrayToStoreMultipleObjects;
    }
  }

  return objToBeReturned;
}

function processOnlyPandQ(onlyPandQ,res){
  var tempObjForItemAndString={};
  var replacePandQWithStringsFucntionNotCalled=true;
  var flatOnlyPandQ=[];
  var arrayOfRequestsToBeMadeToWikidata=[];
  var arrayOfRequestsToBePromised=[];
  var indexForFlatOnlyPandQ=0;

  for (var firstTempVarForKeyRunover in onlyPandQ) {
    if (onlyPandQ.hasOwnProperty(firstTempVarForKeyRunover)) {
      flatOnlyPandQ[indexForFlatOnlyPandQ]=firstTempVarForKeyRunover;
      arrayOfRequestsToBeMadeToWikidata[indexForFlatOnlyPandQ]=
                                                              'https://www.wikidata.org/wiki/Special:EntityData/'+
                                                              flatOnlyPandQ[indexForFlatOnlyPandQ]+
                                                              '.json';

      indexForFlatOnlyPandQ++;
      for (var i = 0; i < onlyPandQ[firstTempVarForKeyRunover].length; i++) {
        flatOnlyPandQ[indexForFlatOnlyPandQ]='Q'+onlyPandQ[firstTempVarForKeyRunover][i];
        arrayOfRequestsToBeMadeToWikidata[indexForFlatOnlyPandQ]=
                                                                'https://www.wikidata.org/wiki/Special:EntityData/'+
                                                                flatOnlyPandQ[indexForFlatOnlyPandQ]+
                                                                '.json';
        indexForFlatOnlyPandQ++;
      }
    }
  }
  for (var i = 0; i < arrayOfRequestsToBeMadeToWikidata.length; i++) {

    arrayOfRequestsToBePromised.push(rp(arrayOfRequestsToBeMadeToWikidata[i])
      .then(function (body) {
                    var obj = JSON.parse(body);
                    var entityId;
                    for (var secondTempVarForKeyRunover in obj["entities"]) {
                      if (obj["entities"].hasOwnProperty(secondTempVarForKeyRunover)) {
                        entityId=secondTempVarForKeyRunover;
                      }
                    }
                    tempObjForItemAndString[entityId]=obj["entities"][entityId]["labels"]["en"]["value"];

      })
      .catch(function (err) {
          // Crawling failed...
      }));
  }
  Promise.all(arrayOfRequestsToBePromised).then(function() {
    dataToBeAnalyzedForRelevance["pAndQStringified"]=replacePandQWithStrings(tempObjForItemAndString,onlyPandQ);
    analyzeEntityAndReturnMostRelevantFields(dataToBeAnalyzedForRelevance,res);
});
  }

  function replacePandQWithStrings(tempObjForItemAndString,onlyPandQ){
  var pAndQStringified={};
  var anotherCopyOfOnlyPandQ;

  anotherCopyOfOnlyPandQ=onlyPandQ;

  for (var firstTempVarForKeyRunover in onlyPandQ) {
    var tempArrayToStoreMultipleObjects=[];

    if (onlyPandQ.hasOwnProperty(firstTempVarForKeyRunover)) {


      for (var i = 0; i < onlyPandQ[firstTempVarForKeyRunover].length; i++) {
        tempArrayToStoreMultipleObjects[i]=
        tempObjForItemAndString['Q'+onlyPandQ[firstTempVarForKeyRunover][i]];
         console.log('Q'+onlyPandQ[firstTempVarForKeyRunover][i]);
        console.log(tempObjForItemAndString['Q'+onlyPandQ[firstTempVarForKeyRunover][i]]);
      }
      pAndQStringified[tempObjForItemAndString[firstTempVarForKeyRunover]]=tempArrayToStoreMultipleObjects;

    }
  }

  return pAndQStringified;
}

function analyzeEntityAndReturnMostRelevantFields(dataToBeAnalyzedForRelevance,res){
  var description=filterDescription(dataToBeAnalyzedForRelevance["description"]);
  var stringContainingAllDetails=dataToBeAnalyzedForRelevance["pAndQStringified"];
  var onlyPandQ=dataToBeAnalyzedForRelevance["onlyPandQ"];

  var arrayOfObjForRelevantFields={};
  var arrayOfObjForRelevantFieldsReverseLookup={};


  var tempStorageForKeys=Object.keys(onlyPandQ);
  var counterForIteratingOverOnlyPandQ=-1;
  var counterForStoringInArrayOfObj=0;
  var counterForStoringInArrayOfObjReverse=0;
  var boolForStatusForSearch=false;
  var tempStorageForInstanceOf={};


  for (var firstTempVarForKeyRunover in stringContainingAllDetails) {
    if(stringContainingAllDetails.hasOwnProperty(firstTempVarForKeyRunover)){
      counterForIteratingOverOnlyPandQ++;
      for (var i = 0; i < description.length; i++) {
        for (var j = 0; j < stringContainingAllDetails[firstTempVarForKeyRunover].length; j++) {
          if(stringContainingAllDetails[firstTempVarForKeyRunover][j] !== undefined){
          var tempArrayToStoreDetails=stringContainingAllDetails[firstTempVarForKeyRunover][j].split(" ");
          if(tempArrayToStoreDetails.indexOf(description[i]) > -1){
            console.log("Straight search");
            console.log(tempArrayToStoreDetails);
            boolForStatusForSearch=true;
            var tempObjForPQAndString={};
            var qNum='Q'+onlyPandQ[tempStorageForKeys[counterForIteratingOverOnlyPandQ]][j];

            tempObjForPQAndString["pNum"]=
                              tempStorageForKeys[counterForIteratingOverOnlyPandQ];
            tempObjForPQAndString["qNum"]=
                              qNum;
            tempObjForPQAndString["pString"]=
                              firstTempVarForKeyRunover;
            tempObjForPQAndString["qString"]=
                              stringContainingAllDetails[firstTempVarForKeyRunover][j];

            arrayOfObjForRelevantFields[qNum]=tempObjForPQAndString;

            counterForStoringInArrayOfObj++;

          }
          else if (tempArrayToStoreDetails.indexOf(description[i]) <= -1) {
            for (var k = 0; k < tempArrayToStoreDetails.length; k++) {
              if(description[i].indexOf(tempArrayToStoreDetails[k]) > -1){
                console.log("Reverse search");
                console.log(tempArrayToStoreDetails);

                var tempObjForPQAndString={};
                var qNum='Q'+onlyPandQ[tempStorageForKeys[counterForIteratingOverOnlyPandQ]][j];


                tempObjForPQAndString["pNum"]=
                                  tempStorageForKeys[counterForIteratingOverOnlyPandQ];
                tempObjForPQAndString["qNum"]=
                                              qNum;
                tempObjForPQAndString["pString"]=
                                  firstTempVarForKeyRunover;
                tempObjForPQAndString["qString"]=
                                  stringContainingAllDetails[firstTempVarForKeyRunover][j];

                arrayOfObjForRelevantFields[qNum]=tempObjForPQAndString;
                break;
              }
            }
          }
          else if (tempStorageForKeys[counterForIteratingOverOnlyPandQ] === "P31") {
            tempStorageForInstanceOf["pNum"]=
                              tempStorageForKeys[counterForIteratingOverOnlyPandQ];
            tempStorageForInstanceOf["qNum"]=
                              onlyPandQ[tempStorageForKeys[counterForIteratingOverOnlyPandQ]][j];
            tempStorageForInstanceOf["pString"]=
                              firstTempVarForKeyRunover;
            tempStorageForInstanceOf["qString"]=
                              stringContainingAllDetails[firstTempVarForKeyRunover][j];
          }
        }
      }
      }
    }
  }
  console.log(arrayOfObjForRelevantFields);
    res.send(arrayOfObjForRelevantFields);
}

function filterDescription(description){
  var questionSplittedIntoWords=description.replace(',','').split(' ');
  return questionSplittedIntoWords;
}



module.exports = router;
