function getDriveService() {
  return OAuth2.createService('drive')
      .setAuthorizationBaseUrl('https://accounts.google.com/o/oauth2/auth')
      .setTokenUrl('https://accounts.google.com/o/oauth2/token')
      .setClientId(PropertiesService.getScriptProperties().getProperty("clientId"))
      .setClientSecret(PropertiesService.getScriptProperties().getProperty("clientSecret"))
      .setCallbackFunction('authCallback')
      .setPropertyStore(PropertiesService.getUserProperties())
      .setScope('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/script.storage https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/script.external_request https://www.googleapis.com/auth/script.scriptapp')
     // .setParam('login_hint', Session.getActiveUser().getEmail())
      .setParam('access_type', 'offline')
      .setParam('approval_prompt', 'force');
}

function authSidebar() {
  var driveService = getDriveService();
  if (!driveService.hasAccess()) {
    var authorizationUrl = driveService.getAuthorizationUrl();
    var template = HtmlService.createTemplate(
        '<a href="<?= authorizationUrl ?>" target="_blank">Authorize</a>.');
    template.authorizationUrl = authorizationUrl;
    var page = template.evaluate();
    SpreadsheetApp.getUi().showSidebar(page);
  } else {
      var template = HtmlService.createTemplate("Authorization Successful");
    template.authorizationUrl = authorizationUrl;
    var page = template.evaluate();
    SpreadsheetApp.getUi().showSidebar(page);
  }
}


function authCallback(request) {
  var driveService = getDriveService();
  var isAuthorized = driveService.handleCallback(request);
  authSidebar();
  if (isAuthorized) {     
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}


function clearAuth(){
 OAuth2.createService('drive')
  .setPropertyStore(PropertiesService.getUserProperties())
  .reset();
  onOpen();
}
