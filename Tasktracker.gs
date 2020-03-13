const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
const currentSheet = spreadSheet.getActiveSheet();

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
  var msTime;
  
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
      if (lastTime > 1000000000000){
        msTime = currentTime - lastTime;
        timerCell.setValue(msTime);
      } else {
        msTime = timerCell.getValue();
      }
      
      const getHour = (msTime) => {
        let sec = Math.floor(msTime / 1000);
        let min = Math.floor(sec / 60);
        return { hr: Math.floor(min / 60), min: Math.floor(min % 60) }
      }
      let clock = getHour(msTime);
      
      clockCell.setValue(clock.hr + ':' + (clock.min > 9 ? clock.min : '0' + clock.min));
      finishedDateCell.setValue(new Date()).setNumberFormat('dd/MM/yyyy');
      break;
  }
}
