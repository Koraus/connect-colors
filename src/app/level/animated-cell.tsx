import { jsx } from "@emotion/react";
import { TransitionGroup } from "../../utils/transition-group";
import { CellDecoration } from "./cell-decoration";
import { RoundedBox } from "@react-three/drei";
import { Color, Group, Mesh, MeshLambertMaterial } from "three";


const clamp = (x: number, min: number, max: number) => Math.min(Math.max(x, min), max);
const colors = ["#fff1e4", "#7bf487", "#fdca9f", "#bdc5f9"]
    .map(x => new Color(x));

export const AnimatedCell = ({
    value,
    isGhost = false,
    isDragged = false,
    mainTrack = { startMs: 0, track: [] },
    ...props
}: jsx.JSX.IntrinsicElements["group"] & {
    value: number;
    isGhost?: boolean,
    isDragged?: boolean,
    mainTrack?: {
        startMs: number,
        track: Array<"appear" | "disappear" | "idle" | "empty">,
    },
}) => {
    const u = (g: Group) => ({
        m0: (g.children[0] as Mesh).material as MeshLambertMaterial,
        g1: g.children[1] as Group,
    });

    return <TransitionGroup
        startMs={mainTrack.startMs}
        transitions={mainTrack.track.map((transition) => {
            switch (transition) {
                case "appear": return {
                    durationMs: 200,
                    onFrame: (g, t) => {
                        const { m0, g1 } = u(g);

                        const ct = clamp(t, 0, 1);
                        m0.color.lerpColors(colors[0], colors[value], ct);
                        g1.position.y = 0.5 * (1 - ct) ** 2;
                        g1.scale.setScalar(1);
                    },
                };
                case "disappear": return {
                    durationMs: 200,
                    onFrame: (g, t) => {
                        const { m0, g1 } = u(g);

                        const ct = clamp(t, 0, 1);
                        m0.color.lerpColors(colors[value], colors[0], ct);
                        g1.position.y = 0;
                        g1.scale.setScalar(1 - ct);
                    },
                };
                case "idle": return {
                    durationMs: 200,
                    onFrame: (g, t) => {
                        const { m0, g1 } = u(g);

                        m0.color.copy(colors[value]);
                        g1.position.y = 0;
                        g1.scale.setScalar(1);
                    },
                };
                case "empty": return {
                    durationMs: 200,
                    onFrame: (g, t) => {
                        const { m0, g1 } = u(g);

                        m0.color.copy(colors[0]);
                        g1.position.y = 0;
                        g1.scale.setScalar(0);
                    },
                };
            }
        })}

        {...props}
    >
        <RoundedBox
            args={[0.9, 0.1, 0.9]}
            position={[0, isDragged ? -0.33 : 0, 0]}
        >
            <meshLambertMaterial color={colors[value]} />
        </RoundedBox>
        <CellDecoration value={value} isGhost={isGhost} />
    </TransitionGroup>;
};
