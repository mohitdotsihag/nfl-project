const SPREADSHEET_ID = '1L8ehMOHE0k1Z4GlJCKxxDpbOGi1tUQRooLUWRvBG8zs';


function doGet() {
  return HtmlService
    .createHtmlOutputFromFile('Index')
    .setTitle('Canned Response Tool');
}

function getResponses() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName('Responses');

  if (!sheet) {
    throw new Error("Could not find a sheet/tab named 'Responses'");
  }

  const data = sheet.getDataRange().getValues();

  // Remove the header row
  data.shift();

  return data
    .filter(row => row[0] && row[1] && row[3])
    .map(row => ({
      category: String(row[0]).trim(),
      situation: String(row[1]).trim(),
      description: String(row[2]).trim(),
      response: String(row[3]).trim()
    }));
}
