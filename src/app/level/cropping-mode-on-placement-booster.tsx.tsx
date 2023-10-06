import { useRecoilState } from "recoil";

import { croppingModeOnPlacementRecoil } from "./cropping-mode-on-placement-recoil";

export const CroppingModeOnPlacementBooster = () => {
    const [isCroppingActive, setIsCroppingActive] =
        useRecoilState(croppingModeOnPlacementRecoil);
    return (
        <button
            onClick={() => setIsCroppingActive(!isCroppingActive)}
            style={{
                width: "fit-content",
                background: isCroppingActive ? "#f5e39c" : "",
            }}
        >
            Cropping Mode
        </button>
        // todo add score 
    );
};
