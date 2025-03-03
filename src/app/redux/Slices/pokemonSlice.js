// Importing the necessary functions from Redux Toolkit and Axios
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an asynchronous action using createAsyncThunk
// This action fetches a list of Pokémon from the PokeAPI
export const fetchPokemonList = createAsyncThunk(
  "pokemon/fetchList", // Action name
  async () => {
    // We make a GET request to the API to get a list of Pokémon
    const pokemonListResponse = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=200"
    );

    // For each Pokémon in the list, we make another request to get their details
    const pokemonDataPromises = pokemonListResponse.data.results.map(
      (pokemon) => axios.get(pokemon.url) // Each Pokémon has a URL for more details
    );

    // Wait for all requests to resolve using Promise.all
    const pokemonData = await Promise.all(pokemonDataPromises);

    // Return the data of each Pokémon, which is contained in the response
    return pokemonData.map((response) => response.data);
  }
);

// Creating the Redux slice to handle Pokémon state
const pokemonSlice = createSlice({
  name: "pokemon", // Slice name
  initialState: {
    // Initial state of the slice
    list: [], // Pokémon list
    loading: false, // Loading indicator
    error: null, // Error message if something goes wrong
  },
  reducers: {}, // No additional reducers, we'll only use extraReducers
  extraReducers: (builder) => {
    // Define how to handle asynchronous actions (extraReducers)
    builder
      // When the 'fetchPokemonList' action is pending (in progress)
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true; // Mark that data is loading
      })
      // When the 'fetchPokemonList' action completes successfully
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false; // Indicate that data is no longer loading
        state.list = action.payload; // Save the Pokémon list in the state
      })
      // When the 'fetchPokemonList' action fails
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false; // Indicate that data is no longer loading
        state.error = action.error.message; // Save the error message in the state
      });
  },
});

// Export the slice reducer so it can be used in the store
export default pokemonSlice.reducer;
