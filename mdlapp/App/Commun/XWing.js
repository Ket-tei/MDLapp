import axios from 'axios';

export function XWing(firstAccessToken, RANGE, VALUES) {
  let acessToken = firstAccessToken;

  let acessTokenBody = {
    "client_id":`${process.env.EXPO_PUBLIC_CLIENT_ID}`,
    "client_secret":`${process.env.EXPO_PUBLIC_CLIENT_SECRET}`,
    "refresh_token":`${process.env.EXPO_PUBLIC_REFRESH_TOKEN}`,
    "grant_type":"refresh_token"
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

  axios.post(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.EXPO_PUBLIC_SPREADSHEET_ID}/values:batchUpdate?valueInputOption=USER_ENTERED&key=${process.env.EXPO_PUBLIC_API_KEY}`, postData, AuthorizationHeaders)
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
    
      axios.post(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.EXPO_PUBLIC_SPREADSHEET_ID}/values:batchUpdate?valueInputOption=USER_ENTERED&key=${process.env.EXPO_PUBLIC_API_KEY}`, postData, AuthorizationHeaders)
      .then((resp) => {
      })
      .catch((erro) => {
        console.log("AXIOS ERROR: ", erro);
      })
    })
  })
}