import {loadCSSFromString} from '@airtable/blocks/ui';

export default function toggleRows(className) {

  loadCSSFromString(`
    .rowShowAll, .rowShow10, .rowShow30 {
      display: none;
    }

    .${className} {
      display: table-row;
    }
  `);

}
