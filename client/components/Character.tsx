import React from "react";

type CharactersProps = {
  state?: boolean;
  character: string;
  isCrossedOut: boolean; // Change prop name to isCrossedOut
};

const Character = ({ state, character, isCrossedOut }: CharactersProps) => {
  return (
    <span
      className={`${state ? 'active' : ''} ${isCrossedOut ? 'line-through' : ''}`} // Apply line-through class conditionally
    >
      {character}
    </span>
  );
};

export default Character;
