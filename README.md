# Apps-Script-Authorized-Custom-Function
  
This is a quick demo on how to write fully authenticated google spreadsheet custom functions.  
Spreadsheet custom fucntions run in a mode that limits access to most of the built-in google services such as DriveApp and DocumentApp.  
This is an example on how you can use these services in a custom function using the new Execution API service.  
  

The example uses the OAuth2 library `MswhXl8fVhTFUH_Q3UOJbXvxhMjh3Sh48`  
https://github.com/googlesamples/apps-script-oauth2  
  
  For this to work the user has to accept the scripts scopes twice. Once for the script (in this case an add-on) and once to make the execution API calls.  Look at the Add-on's menu for the second authorization.  
  
  There are some limitations to this method.  This will over-ride data in a multiuser sheet environment as the function will be calculated using the currently Authenticated user.  Also this can expose user's private data to others who has view capability in the sheet.  
