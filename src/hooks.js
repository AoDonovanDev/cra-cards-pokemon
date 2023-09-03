import { useState } from "react";
import {v1 as uuid} from "uuid";
import axios from "axios";

function useFlip (init) {
  const [isFlipped, setIsFlipped] = useState(init)
  const flipCard = () => {
    setIsFlipped(isUp => !isUp);
  };
  return [isFlipped, flipCard]
}

function useAxios (init=[], which) {
  const [cards, setCards] = useState(init);

  if(which === 'playing'){
    const addCard = async () => {
      const response = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/draw/"
      );
      setCards(cards => [...cards, { ...response.data, id: uuid() }]);
    };
    return [cards, addCard]
  }

  if(which === 'pokemon'){
    const addPokemon = async name => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}/`
    );
    setCards(pokemon => [...pokemon, { ...response.data, id: uuid() }]);
  };
  return [cards, addPokemon]
  }
  
}

export {useFlip, useAxios}
