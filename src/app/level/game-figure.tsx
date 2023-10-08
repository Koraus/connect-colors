import { useRecoilValue, useSetRecoilState } from "recoil";
import { figureGhostCoordsRecoil, figureOnPointerIndexRecoil } from "./playing-data";
import { useRef, useState } from "react";
import { RoundedBox } from "@react-three/drei";
import { Group, Plane, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { usePutPointerFigure } from "./use-put-pointer-figure";
import { levelRecoil } from "./level-recoil";
import { figureRotationsRecoil } from "./figure-rotations-recoil";
import { rotateFigure } from "../../level-model/rotate-figure";
import { useWindowEvent } from "../../utils/use-window-event";
import { AnimatedCell } from "./animated-cell";


export const GameFigure = ({
    figureIndex,
}: {
    figureIndex: number,
}) => {
    const { state: { figures, level: { fieldMap } } } = useRecoilValue(levelRecoil);
    const figureRotations = useRecoilValue(figureRotationsRecoil);
    const figure = rotateFigure(figures[figureIndex], figureRotations[figureIndex]);
    const w = figure.length;
    const h = figure[0].length;

    const fw = fieldMap.length;
    const fh = fieldMap[0].length;

    const ref = useRef<Group>(null);

    const setFigureCoords = useSetRecoilState(figureGhostCoordsRecoil);
    const setPointerFigureIndex = useSetRecoilState(figureOnPointerIndexRecoil);
    const putPointerFigure = usePutPointerFigure();

    const [hovered, setHovered] = useState(false);
    const [dragged, setDragged] = useState(undefined as undefined | {
        point: Vector3,
        originalPos: Vector3,
    });

    const { camera, raycaster, pointer } = useThree(
        ({ camera, raycaster, pointer }) =>
            ({ camera, raycaster, pointer }));

    useFrame(({ raycaster, camera, pointer }, delta) => {
        const g = ref.current;
        if (!g) { return; }
        if (dragged) {
            raycaster.setFromCamera(pointer, camera);
            const p0 = raycaster.ray.intersectPlane(
                new Plane(new Vector3(0, 1, 0), 0),
                new Vector3());
            if (!p0) { return; }

            const draggedPoint = dragged.point.clone();
            draggedPoint.y = 0;

            const draggedOriginalPos = dragged.originalPos.clone();
            draggedOriginalPos.y = 0;

            const p1 = p0.clone().sub(draggedPoint).add(draggedOriginalPos);
            if (
                p1.x >= -0.5
                && p1.x <= fw - w + 0.5
                && p1.z >= -0.5
                && p1.z <= fh - h + 0.5
            ) {
                const p1r = p1.clone().round();
                p1r.y = p1.y + 0.6;
                const d = p1.distanceTo(p1r) / Math.sqrt(2);
                g.position.lerpVectors(p1r, p1, d ** 2.5);
                setFigureCoords([p1r.x, p1r.z]);
            } else {
                g.position.copy(p1);
                g.position.y = 0.38;
                setFigureCoords([0, 0]);
            }

            g.parent?.worldToLocal(g.position);
        } else {
            g.position.lerp(
                new Vector3(0, 0, 0),
                1 - Math.exp(-20 * delta),
            );
        }
    });

    const onPointerUp = () => {
        const g = ref.current;
        if (!g) { return; }
        if (!dragged) { return; }
        raycaster.setFromCamera(pointer, camera);
        const p0 = raycaster.ray.intersectPlane(
            new Plane(new Vector3(0, 1, 0), 0),
            new Vector3());
        if (!p0) { return; }

        const draggedPoint = dragged.point.clone();
        draggedPoint.y = 0;

        const draggedOriginalPos = dragged.originalPos.clone();
        draggedOriginalPos.y = 0;

        const p1 = p0.clone().sub(draggedPoint).add(draggedOriginalPos);
        if (
            p1.x >= -0.5
            && p1.x <= fw - w + 0.5
            && p1.z >= -0.5
            && p1.z <= fh - h + 0.5
        ) {
            const p1r = p1.clone().round();
            putPointerFigure({
                pointerFigureIndex: figureIndex,
                coords: [p1r.x, p1r.z],
            });
        }
        setDragged(undefined);
        setPointerFigureIndex(undefined);
        setFigureCoords([0, 0]);
    };
    useWindowEvent("pointerup", onPointerUp);
    useWindowEvent("pointercancel", onPointerUp);

    return <group
        ref={ref}

        onPointerDown={(ev) => {
            const g = ref.current;
            if (!g) { return; }
            const originalPos = g.position.clone();
            g.parent?.localToWorld(originalPos);
            setPointerFigureIndex(figureIndex);
            setDragged({
                point: ev.point,
                originalPos,
            });
            ev.stopPropagation();
        }}
        onPointerUp={onPointerUp}
        onPointerEnter={() => setHovered(!dragged && true)}
        onPointerLeave={() => setHovered(false)}
    >
        <group position={[0, 0, 0]}>
            <RoundedBox
                args={[w + 0.2, 0.04, h + 0.2]}
                radius={0.02}
                position={[-0.5 + w / 2, -0.05, -0.5 + h / 2]}
            >
                <meshStandardMaterial
                    color={hovered ? "#f9c8c8" : "#ffe9e0"}
                    roughness={1}
                    transparent={true}
                    opacity={dragged ? 0 : 0.5}
                />
            </RoundedBox>
            {
                figure.map((el, i) => el.map((el, j) =>
                    el === 0
                        ? null
                        : <AnimatedCell
                            key={`${i}_${j}`}
                            value={el}
                            position={[i, 0, j]}
                            isGhost={!!dragged}
                            isDragged={!!dragged}
                        />))
            }
        </group>
    </group>;
};
