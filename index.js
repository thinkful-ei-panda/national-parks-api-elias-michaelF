//api key: kHxGnN12wErlgIBuQccdlyjRpZEtvtQYfS8cqa1I
//api url: https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=kHxGnN12wErlgIBuQccdlyjRpZEtvtQYfS8cqa1I

function htmlTemplate(name, des, addresses, url) {
  //identify physical address
  if (addresses[0].type === 'Physical') {
    var i = 0;
  } else {
    i = 1;
  }
  //Identify which address lines are blank and setting the template for the line items, respectively.
  if ((addresses[i].line2.length && addresses[i].line3.length) === 0) {
    return `<li>
      <h3>${name}</h3>
      <p>${des}</p>
      <p>${addresses[i].line1}</br>${addresses[i].city}</br>${addresses[i].stateCode}</br>${addresses[i].postalCode}</p>
      <p><a href="${url}">${url}</a></p>
      </li>
    `;
  } else if (addresses[i].line2.length === 0){
    return `<li>
      <h3>${name}</h3>
      <p>${des}</p>
      <p>${addresses[i].line1}</br>${addresses[i].line3}</br>${addresses[i].city}</br>${addresses[i].stateCode}</br>${addresses[i].postalCode}</p>
      <p><a href="${url}">${url}</a></p>
      </li>
    `;
  } else if (addresses[i].line3.length === 0){
    return `<li>
      <h3>${name}</h3>
      <p>${des}</p>
      <p>${addresses[i].line1}</br>${addresses[i].line2}</br>${addresses[i].city}</br>${addresses[i].stateCode}</br>${addresses[i].postalCode}</p>
      <p><a href="${url}">${url}</a></p>
      </li>
    `;
  } else{
    return `<li> 
    <h3>${name}</h3>
    <p>${des}</p>
    <p>${addresses[i].line1}</br>${addresses[i].line2}</br>${addresses[i].line3}</br>${addresses[i].city}</br>${addresses[i].stateCode}</br>${addresses[i].postalCode}</p>
    <p><a href="${url}">${url}</a></p>
  </li>
 `;
  }
}

//Renders the template
function printList(data) {
  $('.results').html(
    data.map((park) => htmlTemplate(park.fullName, park.description, park.addresses, park.url))
  );
}

function callAPI(states, num) {
  //Allows for comma delineated states inrespective of a space between commas and letters.
  const stateQuery = `stateCode=${states.replace(' ','')}`;
  const apiKey = 'api_key=kHxGnN12wErlgIBuQccdlyjRpZEtvtQYfS8cqa1I';
  const limit = 'limit=' + num;
  fetch(
    `https://developer.nps.gov/api/v1/parks?${stateQuery}&${limit}&${apiKey}`
  )
    .then((res) =>
      res.ok ? res.json() : Promise.reject('Cannot fetch parks data')
    )
    .then((res) => printList(res.data));
}

function searchParks() {
  // Listens to when user clicks submit
  $('.js-form').submit(function (event) {
    event.preventDefault();
    let states = $('.js-states').val();
    let numResults = $('.js-numOfResult').val();
    callAPI(states, numResults.toString());
  });
}
function watchForm() {
  searchParks();
}

//Inception point. 
$(watchForm);