import {loadCSSFromString, loadCSSFromURLAsync, initializeBlock, useBase, useRecords, useRecordById} from '@airtable/blocks/ui';
import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import RanchersPerDay from './RanchersPerDay';
import DietaryRestrictions from './DietaryRestrictions';

// Load CSS files
loadCSSFromURLAsync('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css');
//loadCSSFromURLAsync('https://unpkg.com/bootstrap-table@1.19.1/dist/bootstrap-table.min.css');
function App() {
  return (
    <Router>
      <Routes>
        <Route path = "" element = {<RanchersPerDay />} />
        <Route path = "/dietaryrestrictions/:customerId" element = {<DietaryRestrictions />} />
      </Routes>
    </Router>
  )
}
// create the app
initializeBlock(() => <App />);
