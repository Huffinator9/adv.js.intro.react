async function fetchPokemon() {
    const input = document.getElementById('pokemonInput').value.trim().toLowerCase();
    const errorMessage = document.getElementById('errorMessage');
    const pokemonCard = document.getElementById('pokemonCard');

    // Clear previous results
    errorMessage.style.display = 'none';
    pokemonCard.style.display = 'none';

    if (!input) {
        errorMessage.textContent = 'Please enter a Pokémon name or ID!';
        errorMessage.style.display = 'block';
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        if (!response.ok) {
            throw new Error('Pokémon has not been discovered yet!');
        }
        const data = await response.json();

        // Populate the Pokémon card
        document.getElementById('pokemonName').textContent = data.name;
        document.getElementById('pokemonId').textContent = `ID: ${data.id}`;
        document.getElementById('pokemonImage').src = data.sprites.front_default || '';
        document.getElementById('pokemonTypes').textContent = `Type(s): ${data.types.map(type => type.type.name).join(', ')}`;
        document.getElementById('pokemonHeight').textContent = `Height: ${data.height / 10} m`;
        document.getElementById('pokemonWeight').textContent = `Weight: ${data.weight / 10} kg`;
        document.getElementById('pokemonAbilities').textContent = `Abilities: ${data.abilities.map(ability => ability.ability.name).join(', ')}`;

        // Show the card
        pokemonCard.style.display = 'block';
    } catch (error) {
        errorMessage.textContent = 'Pokémon has not been discovered yet! Please check the name or ID.';
        errorMessage.style.display = 'block';
    }
}

// Allow pressing Enter to trigger search
document.getElementById('pokemonInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchPokemon();
    }
});
