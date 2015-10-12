function onInstall() {
   onOpen();
}

function onOpen(){
  var addonMenu = SpreadsheetApp.getUi().createAddonMenu();
  if(getDriveService().hasAccess()){
    addonMenu.addItem("Deauthorize", "clearAuth") 
  }else{
    addonMenu.addItem("Authorize", "authSidebar")
  }
  addonMenu.addToUi();
}


/**
 * Search For Files in drive
 *
 * @param {search term} Search term in file title.
 * @return [name,id,url]
 * @customfunction
 */
function SEARCHFILES(SearchTerm){
  var url = 'https://script.googleapis.com/v1/scripts/'+ScriptApp.getProjectKey()+':run';

  var payload = JSON.stringify({"function": "getFiles","parameters":[SearchTerm], "devMode": true});

  var params={method:"POST",
              contentType:"application\json",
              headers:{Authorization: "Bearer "+ getDriveService().getAccessToken()},
              payload:payload,
              muteHttpExceptions:true};
  var results = UrlFetchApp.fetch(url, params);
 return JSON.parse(results).response.result;
}


function getFiles(SearchTerm){
  var params = 'title contains "'+SearchTerm+'"'
  var returnFiles = [];
  var files = DriveApp.searchFiles(params);
  var thisFile;
  
  while(files.hasNext()){
    thisFile = files.next();
    returnFiles.push([thisFile.getName(),thisFile.getId(),thisFile.getUrl()]);
  }
  return returnFiles;
}
