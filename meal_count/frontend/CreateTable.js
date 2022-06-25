import React from 'react';
import Table from 'react-bootstrap/Table';

export default function CreateTable({data}) {

  const finalRows = data.map(row => {

      const classNames = row.rowClasses.join(' ');

      return (
        <tr key={row.key} className={classNames}>
          <td>{row.customer}</td>
          <td>{row.totalGuests}</td>
          <td>{row.guestsAdultBreakfast}</td>
          <td>{row.guestsTeenBreakfast}</td>
          <td>{row.guestsRidingKidBreakfast}</td>
          <td>{row.guestsNonRidingKidBreakfast}</td>
          <td>{row.guestsInfantBreakfast}</td>
          <td>{row.guestsAdultLunch}</td>
          <td>{row.guestsTeenLunch}</td>
          <td>{row.guestsRidingKidLunch}</td>
          <td>{row.guestsNonRidingKidLunch}</td>
          <td>{row.guestsInfantLunch}</td>
          <td>{row.guestsAdultDinner}</td>
          <td>{row.guestsTeenDinner}</td>
          <td>{row.guestsRidingKidDinner}</td>
          <td>{row.guestsNonRidingKidDinner}</td>
          <td>{row.guestsInfantDinner}</td>
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
           <th colSpan={2}>Customer Name and Total</th>
           <th colSpan={5}>Breakfast</th>
           <th colSpan={5}>Lunch</th>
           <th colSpan={5}>Dinner</th>
         </tr>
         <tr>
           <th>Customer</th>
           <th>#Guests</th>
           <th># Adults</th>
           <th># Teens</th>
           <th># 6-12 y/o</th>
           <th># 3-5 y/o</th>
           <th># Infants</th>
           <th># Adults</th>
           <th># Teens</th>
           <th># 6-12 y/o</th>
           <th># 3-5 y/o</th>
           <th># Infants</th>
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
