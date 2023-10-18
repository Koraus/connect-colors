import { RotateButtons } from "./level/rotate-buttons.tsx";
import { CurrentScore } from "./level/current-score.tsx";
import { UndoBtn } from "./level/undo-btn.tsx";
import { BestScore } from "./best-score.tsx";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { figureOnPointerIndexRecoil } from "./level/pointer-data.tsx";
import { useWindowEvent } from "../utils/use-window-event.ts";
import { DestroySameTypeCellsBooster } from "./level/destroy-same-color-cells-booster.tsx";
import { CroppingModeOnPlacementBooster } from "./level/cropping-mode-on-placement-booster.tsx.tsx";
import update from "immutability-helper";
import { figureRotationsRecoil } from "./level/figure-rotations-recoil.ts";
import { levelRecoil } from "./level/level-recoil.ts";
import { refKey } from "../utils/ref-key.ts";
import { Dispatch, SetStateAction } from "react";
import { ResetBtn } from "./level/reset-btn.tsx";
import { ProgressBar } from "./progress-bar.tsx";
import { RandomLevelBtn } from "./random-level-btn.tsx";
import { MusicSwitchBtn } from "./music-switch-btn.tsx";
import { NextLvl } from "./next-lvl.tsx";



export function OverlayGui({ }) {

    const level = useRecoilValue(levelRecoil);
    const setFigureRotations = useSetRecoilState(figureRotationsRecoil);
    const [pointerFigureIndex, setPointerFigure] = useRecoilState(figureOnPointerIndexRecoil);

    const isCompleted = level.state.figureStockLeft === 0;

    useWindowEvent("keydown", (event: KeyboardEvent) => {
        if (event.code !== "Escape") { return; }
        if (pointerFigureIndex === undefined) { return; }

        setPointerFigure(undefined);
    }, [pointerFigureIndex, setPointerFigure]);

    useWindowEvent("keydown", (event: KeyboardEvent) => {
        if (event.code !== "KeyR") { return; }
        if (pointerFigureIndex === undefined) { return; }

        const pointerFigure = level.state.figures[pointerFigureIndex];
        const key = refKey(pointerFigure);


        setFigureRotations(figureRotations => update(figureRotations, {
            [key]: { $set: ((figureRotations[key] ?? 0) + 1) % 4 },
        }));
    }, [pointerFigureIndex, setFigureRotations]);


    return <>
        <div css={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "30vw",
            pointerEvents: pointerFigureIndex === undefined ? "all" : "none",
        }}>
            <RandomLevelBtn />
            <MusicSwitchBtn />
            <ProgressBar />
            {/* <div css={{ marginRight: "1em" }}>
                <RotateButtons />
                <ResetBtn />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <DestroySameTypeCellsBooster type={1} />
                <DestroySameTypeCellsBooster type={2} />
                <DestroySameTypeCellsBooster type={3} />
                <CroppingModeOnPlacementBooster />
            </div>
            <div>
                <CurrentScore />
                <BestScore />
            </div>
            <div style={{
                fontSize: "2rem",
            }}> level&nbsp;{isCompleted ? "completed" : ""}
            </div> */}

            {isCompleted && <NextLvl />}
            <UndoBtn />
        </div>
    </>;
}
