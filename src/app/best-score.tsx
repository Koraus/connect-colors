import { useRecoilValue } from "recoil";
import { bestScoreRecoil } from "./playing-data";
import { Trophy } from "@emotion-icons/evil/Trophy";


export const BestScore = () => {
    const score = useRecoilValue(bestScoreRecoil);
    return <div style={{ fontSize: "24px", display: "flex" }}>
        <span style={{ width: "2em", display: "inline-block" }} >
            <Trophy size={"100%"} />
        </span>
        <p style={{ display: "inline-block" }}> {score} </p>
    </div>;
};
