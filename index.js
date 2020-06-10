//api key: kHxGnN12wErlgIBuQccdlyjRpZEtvtQYfS8cqa1I
//api url: https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=kHxGnN12wErlgIBuQccdlyjRpZEtvtQYfS8cqa1I

function htmlTemplate(name, des, url) {
  console.log('template is getting created');
  //Generates HTML Template
  return `<li> 
    <p>${name}</p>
    <p>${des}</p>
    <p>${url}</p>
  </li>
 `;
}
function printList(data) {
  console.log("start printing");
  //Renders HTML Template
  $('#results2').html(
    data.map((park) => htmlTemplate(park.fullName, park.description, park.url))
  );
  $('#results').removeClass('hidden');
  console.log('printing out the list');
}

function callAPI(states, num) {
  console.log('calling all APIs');
  const stateQuery = 'stateCode='+ states.replace(' ','');
  const apiKey = 'kHxGnN12wErlgIBuQccdlyjRpZEtvtQYfS8cqa1I';
  const limit = 'limit=' + num;
  fetch(
    `https://developer.nps.gov/api/v1/parks?${stateQuery}&${limit}&api_key=${apiKey}`
  )
    .then((response) =>
      response.ok ? response.json() : Promise.reject('Cannot fetch parks data')
    )
    .then((response) => printList(response.data));
}

function searchParks() {
  // Listens to when user clicks submit
  console.log('entered something, well thats good buddy');
  $('#js-form').submit(function (event) {
    event.preventDefault();
    let states = $('#js-states').val();
    let numResults = $('#js-numOfResult').val();
    callAPI(states, numResults.toString());
  });
}

function watchForm() {
  searchParks();
}
$(watchForm);