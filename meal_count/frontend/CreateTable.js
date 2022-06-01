import React from 'react';
import Table from 'react-bootstrap/Table';

export default function CreateTable({data}) {

  const finalRows = data.map(row => {

      const classNames = row.rowClasses.join(' ');

      return (
        <tr key={row.key} className={classNames}>
          <td>{row.season}</td>
          <td>{row.date}</td>
          <td>{row.totalGuests}</td>
          <td>{row.guestsAdult}</td>
          <td>{row.guestsTeen}</td>
          <td>{row.guestsRidingKid}</td>
          <td>{row.guestsNonRidingKid}</td>
          <td>{row.guestsInfant}</td>
          <td>
            <a href={""}>View Restrictions</a>
          </td>
        </tr>
      );
  });

   // Return the table of data
   return (
     <Table bordered hover>
       <thead>
         <tr>
           <th>Season</th>
           <th>Date</th>
           <th>#Guests</th>
           <th># Adults</th>
           <th># Teens</th>
           <th># 6-12 y/o</th>
           <th># 3-5 y/o</th>
           <th># Infants</th>
           <th>Dietary Restrictions</th>
         </tr>
       </thead>
       <tbody>
       {finalRows}
       </tbody>
     </Table>
   );
}
