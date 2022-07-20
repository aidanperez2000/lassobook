export default function normalizeDietaryRestrictions(dietaryRestrictions) {

  if (dietaryRestrictions == '') {
    return [];
  }

  var arr      = dietaryRestrictions.split(', ');
  var peeps    = [];
  var last_key = 0;

  // Complicated String: Rob Wiley | Celiac, Dairy Free, Rob Wiley | Celiac, Dairy Free
  // Array: ["Rob Wiley | Celiac", "Dairy Free", "Rob Wiley | Celiac", "Dairy Free"]
  // If text has |, break into two sections for person and restriction
  // If only one element, add to prior
  // we need the abvove to say {name: Rob Wiley, restrictions['Celiac','Dairy Free']}
  for (var x = 0; x < arr.length; x++) {

    if (arr[x].includes(' | ')) {
      var tmp = arr[x].split(' | ');

      // Check if person exists already
      var found = false;
      for (var xx = 0; xx < peeps.length; xx++) {
        if (peeps[xx].name == tmp[0]) {
          found = true;
        }
      }

      // Add new person if not found already
      if (found === false) {
        peeps.push({
          name: tmp[0],
          restrictions: [tmp[1]]
        });

        // Find total peeps and subtract 1 for the last key
        last_key = peeps.length - 1;
      }
    }
    // If no person found, append this restriction to the last person if found
    else {

      // Check if allergy for this person exists already
      var found = false;
      for (var xx = 0; xx < peeps[last_key].restrictions.length; xx++) {
        if (peeps[last_key].restrictions[xx] == arr[x]) {
          found = true;
        }
      }

      if (found === false) {
        peeps[last_key].restrictions.push(arr[x]);
      }
    }
  }

  return peeps;
}
