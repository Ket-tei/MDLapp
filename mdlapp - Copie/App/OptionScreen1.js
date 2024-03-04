import * as gapi from "https://apis.google.com/js/api.js";
  /**
   * Sample JavaScript code for sheets.spreadsheets.values.append
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/code-samples#javascript
   */

  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("AIzaSyDzbsBHSRzvmAm07NDZeKn2jTTPTXWFZwc");
    return gapi.client.load("https://sheets.googleapis.com/$discovery/rest?version=v4")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.sheets.spreadsheets.values.append({
      "spreadsheetId": "1tJ8tZx0B9V9tzbIuFpom1u6545r-uvE6We7E8tCUtQI",
      "range": "A9",
      "valueInputOption": "USER_ENTERED",
      "resource": {
        "values": [
          [
            "8",
            "TE",
            "Te",
            "G1",
            "06111111",
            "Non",
            "Oui"
          ]
        ],
        "range": "A9",
        "majorDimension": "ROWS"
      }
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "150631068543-o7sh82itv0sqsoite7gk01aih22j5h88.apps.googleusercontent.com"});
  });
