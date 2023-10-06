import { FieldCell } from "./field-cell";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { isAvailableMove } from "../../level-model/is-available-move";
import { levelRecoil } from "./level-recoil";


export const PlayingField = () => {
  const level = useRecoilValue(levelRecoil);

  const [gameOver, setGameOver] = useState(false);

  // todo: useMemo instead of useEffect+useState
  useEffect(() => {
    setGameOver(!isAvailableMove(level.state.figures, level.state.field));
  }, [level.state]);

  return <>
    {level.state.field.map((el, i) => el.map((el, j) => <FieldCell
      gameOver={gameOver}
      value={el}
      key={j}
      coords={[i, j]}
      position={[i, 0, j]}
    />))}
  </>;
};
