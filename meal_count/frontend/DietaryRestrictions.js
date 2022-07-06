import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useBase, useRecords } from '@airtable/blocks/ui';
import normalizeDietaryRestrictions from './normalizeDietaryRestrictions';

export default function DietaryRestrictions() {
    const base = useBase();
    const table = base.getTable("tblPZxU1LKmt0tOsI");
    const records = useRecords(table);
    const rows    = {};
    var params = useParams();
    var customerId = params.customerId;

    records.map((record) => {
        // Field: Arrival Date, ID: fldc1vjDxZGQac6iP
        ``//Production
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

        // Find any dietary restrictions
        // Field: Dietary, ID: fldH9DhhnF9jOBddD
        //Staging
        //var dietaryRestrictions = record.getCellValueAsString("fldH9DhhnF9jOBddD");
        //Production
        var dietaryRestrictions = record.getCellValueAsString("fld96i33VyWlJ5bSe");
        dietaryRestrictions     = (dietaryRestrictions === null) ? '' : dietaryRestrictions;

        var d = new Date().toISOString().slice(0, 10);
        rows[d] = {
            key: '',
            restrictionsArray: [],
            dietaryRestrictions: '',
        }
        rows[d].key = customerId;
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
    })
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
    console.log(tableRows);
  
    return (
        <div>
            <Link to = {"/"}>Back to Meal Count</Link>
            <ul>{
                tableRows[0].restrictionsArray.map(restriction => {
                    return (
                        <li>{restriction}</li>
                    )
                })}
            </ul>
        </div>
    );
}