# Apps-Script-Authorized-Custom-Function
  
This is a quick demo on how to write fully authenticated google spreadsheet custom functions.  
Spreadsheet custom functions run in a mode that limits access to most of the built-in google services such as DriveApp and DocumentApp.  
This is an example on how you can use these services in a custom function using the new Execution API service.  
  
###Setup  

1) Copy code.gs and OAuth.gs to a new Spreadsheet script.

2) Add the OAuth2 library `MswhXl8fVhTFUH_Q3UOJbXvxhMjh3Sh48`  
https://github.com/googlesamples/apps-script-oauth2  

3) Generate a set of Oauth2 Creds. Save the clientId and clientSecret to the script properties.  

4) Enable the Google Apps Script Execution API.  

5) Deploy the script as an API Executable.  
  
6) For this to work the user has to accept the scripts scopes twice. Once for the script (in this case an add-on) and once to make the execution API calls.  Look at the Add-on's menu for the second authorization.  
  
7) Make a call in your sheet uing the =SEARCHFILES(searchTerm) method.  
  
  There are some limitations to this method.  This will over-ride data in a multiuser sheet environment as the function will be calculated using the currently Authenticated user.  Also this can expose user's private data to others who has view capability in the sheet.  
