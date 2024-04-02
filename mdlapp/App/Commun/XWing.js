import axios from 'axios';

export function XWing(firstAccessToken, RANGE, VALUES) {
  let acessToken = firstAccessToken;

  let acessTokenBody = {
    "client_secret":String(process.env.EXPO_PUBLIC_CLIENT_SECRET),
    "grant_type":"refresh_token",
    "refresh_token":String(process.env.EXPO_PUBLIC_REFRESH_TOKEN),
    "client_id":String(process.env.EXPO_PUBLIC_CLIENT_ID)
  };

  let postData = {
    "valueInputOption": "RAW",
    "data": [
      {
        "range": `${RANGE}`,
        "values": [
          VALUES
        ]
      }
    ]
  };

  let AuthorizationHeaders = {
    headers: {
      "Authorization": "Bearer " + acessToken,
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  };

  let spreadsheetsID = String(process.env.EXPO_PUBLIC_SPREADSHEET_ID);
  let APIkey = String(process.env.EXPO_PUBLIC_API_KEY);

  axios.post(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetsID}/values:batchUpdate?valueInputOption=USER_ENTERED&key=${APIkey}`, postData, AuthorizationHeaders)
  .then((resp) => {
  })
  .catch((erro) => {
    axios.post('https://oauth2.googleapis.com/token', acessTokenBody)
    .then((res) => {
      acessToken = res.data.access_token;
      AuthorizationHeaders = {
        headers: {
          "Authorization": "Bearer " + acessToken,
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      };
    
      axios.post(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetsID}/values:batchUpdate?valueInputOption=USER_ENTERED&key=${APIkey}`, postData, AuthorizationHeaders)
      .then((resp) => {
      })
      .catch((erro) => {
        console.log("AXIOS ERROR: ", erro);
      })
    })
    .catch((erro) => {
      console.log("AXIOS ERROR: ", erro);
    })
  })
}