var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
var currentSheet = spreadSheet.getActiveSheet();

function onEdit(e){
  var range = e.range;
  var column = range.getColumn();
  var row = range.getRow();
  
  var startDateCell = currentSheet.getRange(row,3);
  var finishedDateCell = currentSheet.getRange(row,4);  
  var clockCell = currentSheet.getRange(row,5);  
  var timerCell = currentSheet.getRange(row,26);  

  var dropdown = currentSheet.getRange(row,1).getValue();  
  var currentTime = new Date().getTime();
  var lastTime = timerCell.getValue();
  var msTime = 0;  
  
  if(column != 1){
    return;
  }
  
  switch (dropdown) {
    case 'Start':
      startDateCell.setValue(new Date()).setNumberFormat('dd/MM/yyyy');
      finishedDateCell.setValue('');
      clockCell.setValue('');
      timerCell.setValue(currentTime);      
      break;
      
    case 'Pause':
      if (lastTime > 1000000000000){
        msTime = currentTime - lastTime;
        timerCell.setValue(msTime);      
      }      
      break;
      
    case 'Continue':
      if (lastTime < 1000000000000){
        msTime = timerCell.getValue();
        timerCell.setValue(currentTime - msTime);              
      }
      break;
      
    case 'Finished':
      var min = 0;
      var sec = 0;
      var hr = 0;
      var minStr = "";
      var hrStr = "";
      
      if (lastTime > 1000000000000){
        msTime = currentTime - lastTime;
        timerCell.setValue(msTime);
      } else {
        msTime = timerCell.getValue();
      }
      
      sec = Math.floor(msTime / 1000);
      min = Math.floor(sec / 60);
      hr = Math.floor(min / 60);
      min = Math.floor(min % 60);
      
      minStr = min > 9 ? String(min) : "0" + String(min);
      hrStr = hr > 9 ? String(hr) : "0" + String(hr);
      clockCell.setValue(hrStr + ":" + minStr);
      finishedDateCell.setValue(new Date()).setNumberFormat('dd/MM/yyyy');
      break;
  }
}
