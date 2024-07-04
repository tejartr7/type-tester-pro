import React from "react";

type CharactersProps = {
  state?: boolean;
  character: string;
  isCrossedOut: boolean;
};

const Character = ({ state, character, isCrossedOut }: CharactersProps) => {
  return (
    <span
      className={`${state === undefined ? '' : state ? 'text-green-500' : 'text-red-500'}`}
      style={{backgroundColor: state === false && character === ' ' ? '#BD0101' : '',}}
    >
      {character}
    </span>
  );
};

export default Character;
