import { FieldCell } from "./field-cell";
import { selector, useRecoilValue } from "recoil";
import { levelRecoil } from "./level-recoil";
import memoize from "memoizee";
import { tuple } from "../../utils/tuple";

const playingFieldSizeRefCache = memoize(
    (m: number, n: number) => tuple(m, n),
    { max: 1 });

const playingFieldSizeRecoil = selector({
    key: "playingFieldSize_d4a9e42bc954bca479f6",
    get: ({ get }) => {
        const level = get(levelRecoil);
        const m = level.state.field.length;
        const n = level.state.field[0].length;
        return playingFieldSizeRefCache(m, n);
    },
});

export const PlayingField = () => {
    const [n, m] = useRecoilValue(playingFieldSizeRecoil);

    return <>
        {Array.from({ length: n }, (_, i) =>
            Array.from({ length: m }, (_, j) =>
                <FieldCell key={i * m + j} coords={[i, j]} />))}
    </>;
};
