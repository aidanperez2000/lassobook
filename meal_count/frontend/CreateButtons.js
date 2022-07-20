import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import printTable from './printTable';
import exportCSV from './exportCSV';

export default function CreateButtons({data}) {

  return (
    <p>
      <div style={{textAlign: 'right', width: '48%', display: 'inline', float:'right'}}>
      <ButtonGroup aria-label="Data Options" size="sm">
          <Button
            variant="outline-secondary"
            title="Print the current viewable schedule."
            className={"print-hide"}
            onClick={() => {printTable('print-hide')}}>
            Print Schedule
          </Button>
          <Button
            variant="outline-secondary"
            title="Export full schedule to CSV."
            className={"print-hide"}
            onClick={() => {exportCSV({data})}}>
            Export CSV
          </Button>
        </ButtonGroup>
      </div>
    </p>
  );

}
