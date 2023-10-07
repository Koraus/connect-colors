import { Group } from "three";
import { useRef, ForwardedRef, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { jsx } from "@emotion/react";


export const TransitionGroup = forwardRef(<TTransition,>({
    startMs, track, setTransitionState, ...props
}: jsx.JSX.IntrinsicElements["group"] & {
    startMs: number;
    track: Array<{
        transition: TTransition;
        durationMs: number;
    }>;
    setTransitionState: (
        g: Group,
        transition: undefined | { transition: TTransition; durationMs: number; },
        timeMs: number
    ) => void;
}, _ref: ForwardedRef<Group | null>) => {
    const ref = useRef<Group | null>(null);
    const resolveSetTransitionState = () => {
        let timeMs = Date.now() - startMs;
        let currentTransition = undefined as undefined | (typeof track)[number];
        for (const t of track) {
            if (timeMs < t.durationMs) {
                currentTransition = t;
                break;
            }
            timeMs -= t.durationMs;
        }
        if (!currentTransition && track.length > 0) {
            currentTransition = track[track.length - 1];
            timeMs += currentTransition.durationMs;
        }

        const g = ref.current;
        if (!g) { return; }
        setTransitionState(g, currentTransition, timeMs);
    };


    useFrame(() => {
        const g = ref.current;
        if (!g) { return; }
        resolveSetTransitionState();
    });

    return <group {...props} ref={(g) => {
        ref.current = g;
        resolveSetTransitionState();
        if (!_ref) { return; }
        if (typeof _ref === "function") { _ref(g); } else { _ref.current = g; }
    }} />;
});
