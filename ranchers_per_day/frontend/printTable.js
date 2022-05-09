import {loadCSSFromString} from '@airtable/blocks/ui';

export default function printTable(className) {
    const printStyles = loadCSSFromString(`
        @media print {
            .${className} {
                display: none !important;
            }
    `);

    window.print();
    printStyles.remove();
}
