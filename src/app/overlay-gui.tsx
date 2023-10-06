import { RotateButtons } from "./level/rotate-buttons.tsx";
import { CurrentScore } from "./level/current-score.tsx";
import { UndoBtn } from "./level/undo-btn.tsx";
import { BestScore } from "./best-score.tsx";
import { MenuWindow } from "./menu-window.tsx";
import { useState } from "react";
import { MenuBtn } from "./menu-btn.tsx";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { figureOnPointerIndexRecoil } from "./level/playing-data.tsx";
import { useWindowEvent } from "../utils/use-window-event.ts";
import { DestroySameTypeCellsBooster } from "./level/destroy-same-color-cells-booster.tsx";
import { CroppingModeOnPlacementBooster } from "./level/cropping-mode-on-placement-booster.tsx.tsx";
import update from "immutability-helper";
import { figureRotationsRecoil } from "./level/figure-rotations-recoil.ts";
import { levelRecoil } from "./level/level-recoil.ts";



export function OverlayGui() {

    const level = useRecoilValue(levelRecoil);
    const setFigureRotations = useSetRecoilState(figureRotationsRecoil);
    const [isMenuOpen, setIsmenueOpen] = useState(false);
    const [pointerFigure, setPointerFigure] = useRecoilState(figureOnPointerIndexRecoil);

    const isCompleted = level.state.figureStockLeft === 0;

    useWindowEvent("keydown", (event: KeyboardEvent) => {
        if (event.code !== "Escape") { return; }
        if (pointerFigure === undefined) { return; }

        setPointerFigure(undefined);
    }, [pointerFigure, setPointerFigure]);

    useWindowEvent("keydown", (event: KeyboardEvent) => {
        if (event.code !== "KeyR") { return; }
        if (pointerFigure === undefined) { return; }

        setFigureRotations(figureRotations => update(figureRotations, {
            [pointerFigure]: { $set: (figureRotations[pointerFigure] + 1) % 4 },
        }));
    }, [pointerFigure, setFigureRotations]);


    return <>
        <MenuWindow isOpen={isMenuOpen} setIsOpen={setIsmenueOpen} />
        <div css={{
            position: "fixed",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            maxWidth: "30vw",
            pointerEvents: pointerFigure === undefined ? "auto" : "none",
        }}>
            <div css={{ marginRight: "1em" }}>
                <MenuBtn isOpen={isMenuOpen} setIsOpen={setIsmenueOpen} />
                <RotateButtons />
                <UndoBtn />
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
            </div>
            {isCompleted
                && <button
                    style={{
                        position: "fixed",
                        inset: "50%",
                        width: "10vw",
                        height: "10vh",
                        zIndex: 2,
                    }}
                    onClick={() => location.reload()}> next lvl
                </button>}
            <div style={{
                rotate: "336deg",
                transform: "translate(35vh, 37vh)",
                fontSize: "2rem",
                height: "fit-content",
            }}>
                You need to place {level.state.level.figureStock} figures.
                {level.state.figureStockLeft}  left to place
            </div>
        </div>
    </>;
}
