const API_KEY = process.env.REACT_APP_SHEET_API_KEY;

const url = "https://sheets.googleapis.com/v4/spreadsheets/1tJ8tZx0B9V9tzbIuFpom1u6545r-uvE6We7E8tCUtQI/values/StatutMDL?valueRenderOption=FORMATTED_VALUE&key=AIzaSyDzbsBHSRzvmAm07NDZeKn2jTTPTXWFZwc";

const DataAPI = async () => {
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