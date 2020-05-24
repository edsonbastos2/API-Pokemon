const getUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;
const generatePokemonPromise = () => Array(150).fill().map((_, index) => fetch(getUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((acumulator, { name, id, types }) => {
  const elementTypes = types.map(typeInfo => typeInfo.type.name)
  acumulator += `
      <li class="card ${elementTypes[0]}">
      <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"/>
        <h2 class="card-title">${id}. ${name}</h2>
        <p class="card-subtitle">${elementTypes.join(' | ')}</p>
      </li>`
  return acumulator
}, '')

const insertPokemonIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromise()

Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonIntoPage)
