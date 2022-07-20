
export default function exportCSV({data}) {

  // Set the filename
  const fileName = 'ranchersPerDay.csv';

  // Set the headers for the CSV
  const headers  = {
    customer: 'Customer',
    date: "Date",
    guestsAdultBreakfast: 'Total Adult Breakfast',
    guestsTeenBreakfast: 'Total Teens Breakfast',
    guestsRidingKidBreakfast: 'Total 6-12 Breakfast',
    guestsNonRidingKidBreakfast: 'Total 3-5 Breakfast',
    guestsInfantBreakfast: 'Total Infants Breakfast',
    guestsAdultLunch: 'Total Adult Lunch',
    guestsTeenLunch: 'Total Teens Lunch',
    guestsRidingKidLunch: 'Total 6-12 Lunch',
    guestsNonRidingKidLunch: 'Total 3-5 Lunch',
    guestsInfantLunch: 'Total Infants Lunch',
    guestsAdultDinner: 'Total Adult Dinner',
    guestsTeenDinner: 'Total Teens Dinner',
    guestsRidingKidDinner: 'Total 6-12 Dinner',
    guestsNonRidingKidDinner: 'Total 3-5 Dinner',
    guestsInfantDinner: 'Total Infants Dinner',
    totalGuests: 'Total Guests'
  };

  // Loop through the data and clean it up for CSV
  for (var x = 0; x < data.length; x++) {
    // Delete items we don't need for CSV
    delete(data[x].restrictionsArray);
    delete(data[x].rowClasses);
    delete(data[x].key);
    delete(data[x].dietaryRestrictions)
    delete(data[x].season);
  }

  // Add the headers as the first array element
  data.unshift(headers);

  // Turn your JSON into a string
  const jsonObject = JSON.stringify(data);

  // Create your CSV string
  const array = typeof jsonObject != 'object' ? JSON.parse(jsonObject) : jsonObject;
  var csv = '';

  for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
          if (line != '') line += ','
          line += array[i][index];
      }
      csv += line + '\r\n';
  }

  // Create the actual forced download of the file
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  //IE10+
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, fileName);

  // Everything else
  } else {
    var link = document.createElement('a');

    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // Reload the app to prevent a crash
  window.location.reload();

}
