import React from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

export default function CreateTable({data}) {
  let totalTotalGuests = 0;
  let totalGuestsAdultBreakfast = 0;
  let totalGuestsTeenBreakfast = 0;
  let totalGuestsRidingKidBreakfast = 0;
  let totalGuestsNonRidingKidBreakfast = 0;
  let totalGuestsInfantBreakfast = 0;
  let totalGuestsAdultLunch = 0;
  let totalGuestsTeenLunch = 0;
  let totalGuestsRidingKidLunch = 0;
  let totalGuestsNonRidingKidLunch = 0;
  let totalGuestsInfantLunch = 0;
  let totalGuestsAdultDinner = 0;
  let totalGuestsTeenDinner = 0;
  let totalGuestsRidingKidDinner = 0;
  let totalGuestsNonRidingKidDinner = 0;
  let totalGuestsInfantDinner = 0;

  //Calculate totals
  for (let i = 0; i < data.length; i++) {
    totalTotalGuests += data[i].totalGuests;
    totalGuestsAdultBreakfast += data[i].guestsAdultBreakfast;
    totalGuestsTeenBreakfast += data[i].guestsTeenBreakfast;
    totalGuestsRidingKidBreakfast += data[i].guestsRidingKidBreakfast;
    totalGuestsNonRidingKidBreakfast += data[i].guestsNonRidingKidBreakfast;
    totalGuestsInfantBreakfast += data[i].guestsInfantBreakfast;
    totalGuestsAdultLunch += data[i].guestsAdultLunch;
    totalGuestsTeenLunch += data[i].guestsTeenLunch;
    totalGuestsRidingKidLunch += data[i].guestsRidingKidLunch;
    totalGuestsNonRidingKidLunch += data[i].guestsNonRidingKidLunch;
    totalGuestsInfantLunch += data[i].guestsInfantLunch;
    totalGuestsAdultDinner += data[i].guestsAdultDinner;
    totalGuestsTeenDinner += data[i].guestsTeenDinner;
    totalGuestsRidingKidDinner += data[i].guestsRidingKidDinner;
    totalGuestsNonRidingKidDinner += data[i].guestsNonRidingKidDinner;
    totalGuestsInfantDinner += data[i].guestsInfantDinner;
  }

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
            <Link to={`/dietaryrestrictions/${row.key}`}>View Restrictions</Link>
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
       <tr>
         <td>Total</td>
         <td>{totalTotalGuests}</td>
         <td>{totalGuestsAdultBreakfast}</td>
         <td>{totalGuestsTeenBreakfast}</td>
         <td>{totalGuestsRidingKidBreakfast}</td>
         <td>{totalGuestsNonRidingKidBreakfast}</td>
         <td>{totalGuestsInfantBreakfast}</td>
         <td>{totalGuestsAdultLunch}</td>
         <td>{totalGuestsTeenLunch}</td>
         <td>{totalGuestsRidingKidLunch}</td>
         <td>{totalGuestsNonRidingKidLunch}</td>
         <td>{totalGuestsInfantLunch}</td>
         <td>{totalGuestsAdultDinner}</td>
         <td>{totalGuestsTeenDinner}</td>
         <td>{totalGuestsRidingKidDinner}</td>
         <td>{totalGuestsNonRidingKidDinner}</td>
         <td>{totalGuestsInfantDinner}</td>
       </tr>
       </tbody>
     </Table>
   );
}
