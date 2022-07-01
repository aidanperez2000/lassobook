import {loadCSSFromString, loadCSSFromURLAsync, initializeBlock, useBase, useRecords, useRecordById} from '@airtable/blocks/ui';
import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';

// Element creation functions
import CreateButtons from './CreateButtons';

//Supporting Functions
import normalizeDietaryRestrictions from './normalizeDietaryRestrictions';
import getDates from './getDates';
import ReactToPrint from 'react-to-print';
import ComponentToPrint from './ComponentToPrint';

// Create the summary table
export default function RanchersPerDay() {

    const base    = useBase();
    // Table: Reservations, use the ID so you can safely change the name
    //Production
    //const table   = base.getTable('tbln2S8fdRzr5ZQN7');
    //Staging
    const table = base.getTable("tblPZxU1LKmt0tOsI");
    const records = useRecords(table);
    const rows    = {};
  
    // Get dates for today, the next 10 days, and the next 30 days
    var today       = new Date();
    var todayPlus10 = new Date(today.setDate(today.getDate() + 10));
    today           = new Date();
    var todayPlus30 = new Date(today.setDate(today.getDate() + 30));
  
  
    // Find date ranges for the next 10 days and the next 30 days
    today           = new Date();
    var datesNext10 = getDates(today, todayPlus10);
    var datesNext30 = getDates(today, todayPlus30);
  
    // Loop through each record found and get a summary of data by date
    records.map(function(record) {
  
      // Field: Arrival Date, ID: fldc1vjDxZGQac6iP
      //Production
      //var arrivalDate         = record.getCellValue("fldc1vjDxZGQac6iP");
      //Staging
      var arrivalDate = record.getCellValue("fldEYa5p5StS5G4Xq")
  
      // Field: Departure Date, ID: fld8A2xm8TBT7zzYV
      //Production
      //var departureDate       = record.getCellValue("fld8A2xm8TBT7zzYV");
      //Staging
      var departureDate = record.getCellValue("fldAxHj8GMoV23xDw");
  
      // if no departure date, set to arrival date
      if (departureDate === null) {
        departureDate = arrivalDate;
      }
  
      var finalDate = new Date(departureDate);
      finalDate.setDate(finalDate.getDate() - 1);
  
      // if no arrival date, don't include it
      var dates = (arrivalDate === null) ? [] : getDates(new Date(arrivalDate), finalDate);
  
      // Find any dietary restrictions
      // Field: Dietary, ID: fldH9DhhnF9jOBddD
      //Staging
      //var dietaryRestrictions = record.getCellValueAsString("fldH9DhhnF9jOBddD");
      //Production
      var dietaryRestrictions = record.getCellValueAsString("fld96i33VyWlJ5bSe");
      dietaryRestrictions     = (dietaryRestrictions === null) ? '' : dietaryRestrictions;
  
      // Once we have found the date range, loop through each one
      // Set the base array and object
      // Then increment numbers
      var d = new Date().toISOString().slice(0, 10);
  
      // If date has already passed, skip it
      /*if (d < datesNext10[0]) {
        continue;
      }*/
  
      var customerId = [];
  
      rows[d] = {
        key: '',
        customer: '',
        season: '',
        date: '',
        guestsAdultBreakfast: 0,
        guestsTeenBreakfast: 0,
        guestsRidingKidBreakfast: 0,
        guestsNonRidingKidBreakfast: 0,
        guestsInfantBreakfast: 0,
        totalGuestsBreakfast: 0,
        guestsAdultLunch: 0,
        guestsTeenLunch: 0,
        guestsRidingKidLunch: 0,
        guestsNonRidingKidLunch: 0,
        guestsInfantLunch: 0,
        guestsAdultDinner: 0,
        guestsTeenDinner: 0,
        guestsRidingKidDinner: 0,
        guestsNonRidingKidDinner: 0,
        guestsInfantDinner: 0,
        totalGuests: 0,
        restrictionsArray: [],
        dietaryRestrictions: '',
        rowClasses: ['rowShowAll'],
      };
  
      // If the date is in the next 10 days, add new class
      for (var tx = 0; tx < datesNext10.length; tx++) {
        if (d == datesNext10[tx] && !rows[d].rowClasses.includes('rowShow10')) {
          rows[d].rowClasses.push('rowShow10');
        }
      }
  
      // If the date is in the next 30 days, add new class
      for (var tx = 0; tx < datesNext30.length; tx++) {
        if (d == datesNext30[tx] && !rows[d].rowClasses.includes('rowShow30')) {
          rows[d].rowClasses.push('rowShow30');
        }
      }
  
      // Increment each value found for a date
      rows[d].date = d;
      //Field: Season, ID: fldYx5HzCd33xU5Qo
      //Staging
      rows[d].season += record.getCellValue("fldYx5HzCd33xU5Qo");
      //Field: Customer, ID: fldFXPfLzx2H85Kj9
      //Staging 
      customerId = record.getCellValue("fldFXPfLzx2H85Kj9");
      rows[d].key = customerId;
      console.log(customerId);
      if (customerId != null) {
        rows[d].customer += customerId[0].name;
        console.log(customerId[0].name);
      }
      //If today is the arrival date, guests only get dinner
      if (new Date(arrivalDate) == new Date()) {
        // Field: Adult Travelers, ID: fldK1v5LE4rOxRszL
        //Production
        //rows[d].guestsAdultDinner += record.getCellValue("fldK1v5LE4rOxRszL");
        //Staging
        rows[d].guestsAdultDinner += record.getCellValue("fldcYaRxcXeQslqem");
  
        // Field: Teen Travelers, ID: fldCpX4stPrgebVUr
        //Production
        //rows[d].guestsTeenDinner += record.getCellValue("fldCpX4stPrgebVUr");
        //Staging
        rows[d].guestsTeenDinner += record.getCellValue("fld4mCQe1Iei9FTz2");
  
        // Field: 6-12 Travelers, ID: fldTugRzmgR64qpNp
        //Production
        //rows[d].guestsRidingKidDinner += record.getCellValue("fldTugRzmgR64qpNp");
        //Staging
        rows[d].guestsRidingKidDinner += record.getCellValue("fldlrVDlU9E8ZUns0")
  
        // Field: 3-5 Travelers, ID: fldRBm2z4ElG0MPF1
        //Production
        //rows[d].guestsNonRidingKidDinner += record.getCellValue("fldRBm2z4ElG0MPF1");
        //Staging
        rows[d].guestsNonRidingKidDinner += record.getCellValue("fldjy1OlCx8IVgNkC");
  
        // Field: Infant Travelers, ID: fld3aYa4i0rH6ZeOf
        //Production
        //rows[d].guestsInfantDinner += record.getCellValue("fld3aYa4i0rH6ZeOf");
        //Staging
        rows[d].guestsInfantDinner += record.getCellValue("fldv7DWQQTeJ1tctQ");
        //if today is the departure date, guests get breakfast
      } else if (new Date(departureDate) == new Date()) {
        // Field: Adult Travelers, ID: fldK1v5LE4rOxRszL
        //Production
        //rows[d].guestsAdultBreakfast += record.getCellValue("fldK1v5LE4rOxRszL");
        //Staging
        rows[d].guestsAdultBreakfast += record.getCellValue("fldcYaRxcXeQslqem");
  
        // Field: Teen Travelers, ID: fldCpX4stPrgebVUr
        //Production
        //rows[d].guestsTeenBreakfast += record.getCellValue("fldCpX4stPrgebVUr");
        //Staging
        rows[d].guestsTeenBreakfast += record.getCellValue("fld4mCQe1Iei9FTz2");
  
        // Field: 6-12 Travelers, ID: fldTugRzmgR64qpNp
        //Production
        //rows[d].guestsRidingKidBreakfast += record.getCellValue("fldTugRzmgR64qpNp");
        //Staging
        rows[d].guestsRidingKidBreakfast += record.getCellValue("fldlrVDlU9E8ZUns0")
  
        // Field: 3-5 Travelers, ID: fldRBm2z4ElG0MPF1
        //Production
        //rows[d].guestsNonRidingKidBreakfast += record.getCellValue("fldRBm2z4ElG0MPF1");
        //Staging
        rows[d].guestsNonRidingKidBreakfast += record.getCellValue("fldjy1OlCx8IVgNkC");
  
        // Field: Infant Travelers, ID: fld3aYa4i0rH6ZeOf
        //Production
        //rows[d].guestsInfantBreakfast += record.getCellValue("fld3aYa4i0rH6ZeOf");
        //Staging
        rows[d].guestsInfantBreakfast += record.getCellValue("fldv7DWQQTeJ1tctQ");
        //if the season is spring or fall, guests also get lunch
        if (rows[d].season.includes("fall") || rows[d].season.includes("spring")) {
          // Field: Adult Travelers, ID: fldK1v5LE4rOxRszL
          //Production
          //rows[d].guestsAdultLunch += record.getCellValue("fldK1v5LE4rOxRszL");
          //Staging
          rows[d].guestsAdultLunch += record.getCellValue("fldcYaRxcXeQslqem");
  
          // Field: Teen Travelers, ID: fldCpX4stPrgebVUr
          //Production
          //rows[d].guestsTeenLunch += record.getCellValue("fldCpX4stPrgebVUr");
          //Staging
          rows[d].guestsTeenLunch += record.getCellValue("fld4mCQe1Iei9FTz2");
  
          // Field: 6-12 Travelers, ID: fldTugRzmgR64qpNp
          //Production
          //rows[d].guestsRidingKidLunch += record.getCellValue("fldTugRzmgR64qpNp");
          //Staging
          rows[d].guestsRidingKidLunch += record.getCellValue("fldlrVDlU9E8ZUns0")
  
          // Field: 3-5 Travelers, ID: fldRBm2z4ElG0MPF1
          //Production
          //rows[d].guestsNonRidingKidLunch += record.getCellValue("fldRBm2z4ElG0MPF1");
          //Staging
          rows[d].guestsNonRidingKidLunch += record.getCellValue("fldjy1OlCx8IVgNkC");
  
          // Field: Infant Travelers, ID: fld3aYa4i0rH6ZeOf
          //Production
          //rows[d].guestsInfantLunch += record.getCellValue("fld3aYa4i0rH6ZeOf");
          //Staging
          rows[d].guestsInfantLunch += record.getCellValue("fldv7DWQQTeJ1tctQ");
        }
        //Otherwise, they get all three meals 
      } else {
        // Field: Adult Travelers, ID: fldK1v5LE4rOxRszL
        //Production
        //rows[d].guestsAdultBreakfast += record.getCellValue("fldK1v5LE4rOxRszL");
        //Staging
        rows[d].guestsAdultBreakfast += record.getCellValue("fldcYaRxcXeQslqem");
  
        // Field: Teen Travelers, ID: fldCpX4stPrgebVUr
        //Production
        //rows[d].guestsTeenBreakfast += record.getCellValue("fldCpX4stPrgebVUr");
        //Staging
        rows[d].guestsTeenBreakfast += record.getCellValue("fld4mCQe1Iei9FTz2");
  
        // Field: 6-12 Travelers, ID: fldTugRzmgR64qpNp
        //Production
        //rows[d].guestsRidingKidBreakfast += record.getCellValue("fldTugRzmgR64qpNp");
        //Staging
        rows[d].guestsRidingKidBreakfast += record.getCellValue("fldlrVDlU9E8ZUns0")
  
        // Field: 3-5 Travelers, ID: fldRBm2z4ElG0MPF1
        //Production
        //rows[d].guestsNonRidingKidBreakfast += record.getCellValue("fldRBm2z4ElG0MPF1");
        //Staging
        rows[d].guestsNonRidingKidBreakfast += record.getCellValue("fldjy1OlCx8IVgNkC");
  
        // Field: Infant Travelers, ID: fld3aYa4i0rH6ZeOf
        //Production
        //rows[d].guestsInfantBreakfast += record.getCellValue("fld3aYa4i0rH6ZeOf");
        //Staging
        rows[d].guestsInfantBreakfast += record.getCellValue("fldv7DWQQTeJ1tctQ");
  
        // Field: Adult Travelers, ID: fldK1v5LE4rOxRszL
        //Production
        //rows[d].guestsAdultLunch += record.getCellValue("fldK1v5LE4rOxRszL");
        //Staging
        rows[d].guestsAdultLunch += record.getCellValue("fldcYaRxcXeQslqem");
  
        // Field: Teen Travelers, ID: fldCpX4stPrgebVUr
        //Production
        //rows[d].guestsTeenLunch += record.getCellValue("fldCpX4stPrgebVUr");
        //Staging
        rows[d].guestsTeenLunch += record.getCellValue("fld4mCQe1Iei9FTz2");
  
        // Field: 6-12 Travelers, ID: fldTugRzmgR64qpNp
        //Production
        //rows[d].guestsRidingKidLunch += record.getCellValue("fldTugRzmgR64qpNp");
        //Staging
        rows[d].guestsRidingKidLunch += record.getCellValue("fldlrVDlU9E8ZUns0")
  
        // Field: 3-5 Travelers, ID: fldRBm2z4ElG0MPF1
        //Production
        //rows[d].guestsNonRidingKidLunch += record.getCellValue("fldRBm2z4ElG0MPF1");
        //Staging
        rows[d].guestsNonRidingKidLunch += record.getCellValue("fldjy1OlCx8IVgNkC");
  
        // Field: Infant Travelers, ID: fld3aYa4i0rH6ZeOf
        //Production
        //rows[d].guestsInfantLunch += record.getCellValue("fld3aYa4i0rH6ZeOf");
        //Staging
        rows[d].guestsInfantLunch += record.getCellValue("fldv7DWQQTeJ1tctQ");
  
        // Field: Adult Travelers, ID: fldK1v5LE4rOxRszL
        //Production
        //rows[d].guestsAdultDinner += record.getCellValue("fldK1v5LE4rOxRszL");
        //Staging
        rows[d].guestsAdultDinner += record.getCellValue("fldcYaRxcXeQslqem");
  
        // Field: Teen Travelers, ID: fldCpX4stPrgebVUr
        //Production
        //rows[d].guestsTeenDinner += record.getCellValue("fldCpX4stPrgebVUr");
        //Staging
        rows[d].guestsTeenDinner += record.getCellValue("fld4mCQe1Iei9FTz2");
  
        // Field: 6-12 Travelers, ID: fldTugRzmgR64qpNp
        //Production
        //rows[d].guestsRidingKidDinner += record.getCellValue("fldTugRzmgR64qpNp");
        //Staging
        rows[d].guestsRidingKidDinner += record.getCellValue("fldlrVDlU9E8ZUns0")
  
        // Field: 3-5 Travelers, ID: fldRBm2z4ElG0MPF1
        //Production
        //rows[d].guestsNonRidingKidDinner += record.getCellValue("fldRBm2z4ElG0MPF1");
        //Staging
        rows[d].guestsNonRidingKidDinner += record.getCellValue("fldjy1OlCx8IVgNkC");
  
        // Field: Infant Travelers, ID: fld3aYa4i0rH6ZeOf
        //Production
        //rows[d].guestsInfantDinner += record.getCellValue("fld3aYa4i0rH6ZeOf");
        //Staging
        rows[d].guestsInfantDinner += record.getCellValue("fldv7DWQQTeJ1tctQ");
      }
  
      // Field: Total Guests, ID: fldG3Uwik96n5Ls6r
      //Production
      //rows[d].totalGuests += record.getCellValue("fldG3Uwik96n5Ls6r");
      //Staging
      rows[d].totalGuests += record.getCellValue("fld80zi4S2Tp0fqL2");
  
      // Normalize all the dietary restrictions
      // See normalizeDietaryRestrictions.js for details
      if (dietaryRestrictions != '') {
        var restrictions = normalizeDietaryRestrictions(dietaryRestrictions);
        for (var x = 0; x < restrictions.length; x++) {
          var str = restrictions[x].name + ' | ' + restrictions[x].restrictions.join(', ');
  
          // Only add to the final array if it does not exist already
          if (!rows[d].restrictionsArray.includes(str)) {
            rows[d].restrictionsArray.push(str);
          }
        }
      }
  
      });
  
    // Get all the date keys from above and sort them
    const keys = Object.keys(rows);
    keys.sort();
  
    // Create the array to use for creating a table
    const tableRows = [];
    for (var x = 0; x < keys.length; x++) {
      var key      = keys[x];
      tableRows[x] = rows[key];
  
      // If no dietary restrictions, push None
      if (tableRows[x].restrictionsArray.length < 1) {
        tableRows[x].restrictionsArray.push('None');
      }
    }
  
    let componentRef = useRef()
  
    // Return the table of data
    return (
      <div style={{width: '98%', paddingTop:'1%', paddingBottom:'1%',paddingLeft:'1%'}}>
        <CreateButtons data={tableRows} />
        <ReactToPrint 
          trigger={() => <Button>Print</Button>}
          content={() => componentRef} />
        <h1 style={{textAlign: "center"}}>{tableRows[0].date}</h1>
        <ComponentToPrint ref={(el) => (componentRef = el)} data={tableRows} />
      </div>
    );
  
  }