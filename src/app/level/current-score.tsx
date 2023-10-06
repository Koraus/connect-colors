import { useRecoilValue } from "recoil";
import { Chart } from "@emotion-icons/evil/Chart";
import { levelRecoil } from "./level-recoil";

export const CurrentScore = () => {
    const score = useRecoilValue(levelRecoil).state.score;
    return <div style={{ fontSize: "24px", display: "flex" }}>
        <span style={{ width: "2em", display: "inline-block" }} >
            <Chart size={"100%"} />
        </span>
        <p style={{ display: "inline-block" }}> {score} </p>
    </div>;
};
