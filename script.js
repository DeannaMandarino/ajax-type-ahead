const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
  // Escape special characters in the wordToMatch for a valid RegExp pattern
  const regex = new RegExp(wordToMatch.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, "\\$&"), 'gi');

  return cities.filter(place => {
    return place.city.match(regex) || place.state.match(regex);
  })
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);

  // If input is empty, clear the matches
  if (!this.value) {
    matches.innerHTML = '';
    return;
  }

  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="highlight">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="highlight">${this.value}</span>`);
    return `
    <li class="search-form__match">
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${numberWithCommas(place.population)}</span>
    </li>`;
  }).join('');
  
  matches.innerHTML = html;
}

const searchInput = document.querySelector('.search-form__input');
const matches = document.querySelector('.search-form__matches');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);