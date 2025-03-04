import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './Slices/pokemonSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

export default store;