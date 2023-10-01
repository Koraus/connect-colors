import { playingFieldRecoil } from "./playing-data";
import { FieldCell } from "./field-cell";
import { useRecoilValue } from "recoil";
import { gameFiguresRecoil } from "./playing-data";
import { useEffect, useState } from "react";
import { isAvailableMove } from "../model/is-available-move";


export const PlayingField = () => {

  const playingField = useRecoilValue(playingFieldRecoil).field;
  const field = useRecoilValue(playingFieldRecoil);
  const gameFigures = useRecoilValue(gameFiguresRecoil);

  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setGameOver(!isAvailableMove(gameFigures, field.field));
  }, [field, gameFigures]);

  return <>
    {playingField.map((el, i) => el.map((el, j) => <FieldCell
      gameOver={gameOver}
      value={el}
      key={j}
      coords={[i, j]}
      position={[i, 0, j]}
    />))}
  </>;
};
