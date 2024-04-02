const DataAPI = async (WORKSHEET_NAME) => {
  const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
  const SPREADSHEET_ID = process.env.EXPO_PUBLIC_SPREADSHEET_ID;

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${WORKSHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`;
  try {
    let data = await fetch(
      url
    );
    let { values } = await data.json();
    let [, ...Data] = values.map((data) => data);
    return Data;
  } catch {
    console.log("Error");
  }
};
export default DataAPI;