const pokemon_name = document.querySelector("#pokemon-name span");
const pokemon_image = document.querySelector("#pokemon-img");

const stat_hp = document.querySelector("#hp");
const stat_attack = document.querySelector("#attack");
const stat_defense = document.querySelector("#defense");

let pokemonId = 1;

document.addEventListener("click", (e) => {
  // click button -> move to next pokemon

  if (e.target.id === "next-btn") {
    pokemonId += 1;
  }

  if (e.target.id === "prev-btn" && pokemonId > 1) {
    pokemonId -= 1;
  }

  loadPokemon();
});

async function getPokemon() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch Pokemon:", error);
  }
}

function loadPokemon() {
  getPokemon().then((data) => {
    if (data) {
      //   console.log(data);
      window.pokemonData = data;
      pokemon_name.textContent = data.name;
      pokemon_image.src = data.sprites.back_default;

      stat_hp.textContent = `HP: ${data.stats[0].base_stat}`;
      stat_attack.textContent = `Attack: ${data.stats[1].base_stat}`;
      stat_defense.textContent = `Defense: ${data.stats[2].base_stat}`;
    }
  });
}
