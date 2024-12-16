// Define the URL endpoint for fetching the city data (JSON format)
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

// Fetch the city data from the endpoint and populate the cities array
fetch(endpoint)
  .then(response => response.json()) // Parse the JSON response
  .then(data => cities.push(...data)); // Push the data into the cities array

// Function to find matches in the cities array based on the input word
function findMatches(wordToMatch, cities) {
  const regex = new RegExp(wordToMatch, 'gi');

  return cities.filter(place => place.city.match(regex) || place.state.match(regex));
}

// Function to format numbers with commas (e.g., 1000000 becomes 1.000.000)
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adds a dot every 3 digits
}

// Function to display matching cities based on the input
function displayMatches() {
  const matchArray = findMatches(this.value, cities);

  // If input is empty, clear the matches
  if (!this.value) {
    matchesList.innerHTML = '';
    return;
  }

  // Map over the matched cities and generate the HTML for the list
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');

    // Replace the matched city and state names with highlighted text
    const cityName = place.city.replace(regex, `<span class="highlight">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="highlight">${this.value}</span>`);

    return `
    <li class="search-form__match">
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${numberWithCommas(place.population)}</span>
    </li>`;
  }).join('');

  // Inject the generated HTML into the matches list container
  matchesList.innerHTML = html;
}

// Get references to the input field and the matches list container
const searchInput = document.querySelector('.search-form__input');
const matchesList = document.querySelector('.search-form__matches');

// Add an event listener to the search input field to trigger the displayMatches function when the user types
searchInput.addEventListener('input', displayMatches);