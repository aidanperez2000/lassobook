import React from 'react';
import Table from 'react-bootstrap/Table';

export default function CreateTable({data}) {

  const finalRows = data.map(row => {

      const classNames = row.rowClasses.join(' ');

      return (
        <tr key={row.key} className={classNames}>
          <td style={{width: '15%'}}>{row.date}</td>
          <td style={{width: '10%'}}>{row.totalGuests}</td>
          <td style={{width: '10%'}}>{row.guestsAdult}</td>
          <td style={{width: '10%'}}>{row.guestsTeen}</td>
          <td style={{width: '10%'}}>{row.guestsRidingKid}</td>
          <td style={{width: '10%'}}>{row.guestsNonRidingKid}</td>
          <td style={{width: '10%'}}>{row.guestsInfant}</td>
          <td style={{width: '25%'}}><ul>{
            row.restrictionsArray.map(restriction => {
              return (
                <li>{restriction}</li>
              )
            })}</ul></td>
        </tr>
      );
  });

   // Return the table of data
   return (
     <Table bordered hover>
       <thead>
         <tr>
           <th style={{width: '15%'}}>Date</th>
           <th style={{width: '10%'}}>#Guests</th>
           <th style={{width: '10%'}}># Adults</th>
           <th style={{width: '10%'}}># Teens</th>
           <th style={{width: '10%'}}># 6-12 y/o</th>
           <th style={{width: '10%'}}># 3-5 y/o</th>
           <th style={{width: '10%'}}># Infants</th>
           <th style={{width: '25%'}}>Dietary Restrictions</th>
         </tr>
       </thead>
       <tbody>
       {finalRows}
       </tbody>
     </Table>
   );
}
