//api key: kHxGnN12wErlgIBuQccdlyjRpZEtvtQYfS8cqa1I
//api url: https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=kHxGnN12wErlgIBuQccdlyjRpZEtvtQYfS8cqa1I

function htmlTemplate(name, des, url) {
  //Generates HTML Template
  return `<li> 
    <h3>${name}</h3>
    <p>${des}</p>
    <p><a href="${url}">${url}</a></p>
  </li>
 `;
}
function printList(data) {
  //Renders HTML Template
  $('.results').html(
    data.map((park) => htmlTemplate(park.fullName, park.description, park.url))
  );
}

function callAPI(states, num) {
  const stateQuery = 'stateCode=' + states;
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
    console.log('search is running');
    event.preventDefault();
    let states = $('.js-states').val();
    let numResults = $('.js-numOfResult').val();
    callAPI(states, numResults.toString());
  });
}
function watchForm() {
  searchParks();
}

$(watchForm);