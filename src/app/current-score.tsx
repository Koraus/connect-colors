import { useRecoilValue } from "recoil";
import { playingFieldRecoil } from "./playing-data";
import { Chart } from "@emotion-icons/evil/Chart";

export const CurrentScore = () => {
    const score = useRecoilValue(playingFieldRecoil).score;
    return <div style={{ fontSize: "24px", display: "flex" }}>
        <span style={{ width: "2em", display: "inline-block" }} >
            <Chart size={"100%"} />
        </span>
        <p style={{ display: "inline-block" }}> {score} </p>
    </div>;
};
