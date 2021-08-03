const pokedex = document.getElementById("pokedex");

const pokeCache = {};

const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=9`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map((result, index) =>
    ({
        name: result.name,
        apiURL: result.url,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }));
    displayPokemon(pokemon);
}

const displayPokemon = (pokemon) => {
    // To test fetched data
    console.log(pokemon);
    
    // Generating HTML tags from the fetched data
    const pokemonHTMLString = pokemon.map ( pokemon => `
    <li class="card" onclick="selectPokemon(${pokemon.id})">
        <img class="card-image" src="${pokemon.image}" >
        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
    </li>
    `).join(" "); // join used to join the array created from map method
    pokedex.innerHTML = pokemonHTMLString;
}

const selectPokemon = async (id) => {
    if(!pokeCache[id]) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pokemon = await res.json();
        pokeCache[id] = pokemon; // caching the selected pokemon
        console.log(pokeCache);
        displayPopup(pokemon);
    }
    displayPopup(pokeCache[id]);
};

const displayPopup = (pokemon) => {
    // console.log(pokemon);
    const type = pokemon.types
        .map( type => type.type.name)
        .join(", ");
    const image = pokemon.sprites['front_default']
    const htmlString = `
        <div class="popup">
            <button 
                id="closeBtn"
                onclick="closePopup()"
            >Close</button>
            <div class="card">
                <img class="card-image" src="${image}">
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p> 
                    Height: <small> ${pokemon.height} |  </small>
                    Weight: <small> ${pokemon.weight} |  </small>
                    Type: <small> ${type} </small>
                </p>
            </div>
        </div>
    `; 
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
    // console.log(htmlString);
    // console.log(pokedex.innerHTML);
}

const closePopup = () => {
    const popup = document.querySelector('.popup')
    popup.parentElement.removeChild(popup);
}

fetchPokemon();