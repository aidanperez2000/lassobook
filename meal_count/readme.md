## The Problem
A ranch needs to see the total people on the ranch on any given day. They also need to see the dietary restrictions for that day.

## About this App
This is a custom reactJS app built inside of Airtable. It looks at every row of data in the reservation table to find the following data:

- Arrival date
- Departure date
- Total Guests (sum, adult, teen, child, child (non-rider), and infants)
- Dietary restrictions

From there the app will find every day in between the arrival and departure and summarize the all the data needed per day. It will then show a simple table to show this view of information.

## Updating this app
If you are unfamiliar with how to get an Airtable app set up please visit their documentation [here](https://www.airtable.com/developers/apps). You can read more about ReactJS [here](https://reactjs.org/). After  you are all set up, you can clone this repo to house the code locally, run `block run` to start the application locally and in Airtable go the custom app and click the 'Edit App' option. It will ask you for the URL locally to run, it is typically `https://localhost:9000`.

You can work in edit mode until you are happy with your results. After which you can run `block release` in your terminal to release a new version of your application to Airtable.

The code for the entire application is [here](https://github.com/phpfunk/Ranchers-Per-Day-Airtable/blob/main/frontend/index.js).

## Things to know
- You have to use Safari to develop locally. Chrome and Brave Browser do not work at this time.
- Both the table and all fields have been updated to use their IDs instead of their names. You can freely update the table name and any field names without breaking the app.
- If you delete an field or the table, the app will not work.
- The new button selectors (10 days, 30 days, full schedule) - simply show/hide rows in those ranges based on CSS classes
- Any date in the past will not be shown
- The print button does not work in Safari, so when you are developing locally, it will not work
- Export CSV exports the entire list of data at this time while the print button just prints the current view, this was done on purpose
- After each export the app with reload to refresh the data since it lives in memory and seems it can only be used once
