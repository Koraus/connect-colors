import { Group } from "three";
import { useRef, ForwardedRef, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { jsx } from "@emotion/react";

export type Transition = {
    durationMs: number,
    onFrame?: (g: Group, t: number, timeMs: number) => void,
};

export type TransitionTrack<TTransition extends Transition> = {
    startMs: number,
    transitions: TTransition[],
    onFrame?: (
        g: Group,
        timeMs: number,
        transition: undefined | TTransition,
    ) => void,
}


export const TransitionGroup = forwardRef(<TTransition extends Transition,>({
    startMs, transitions, onFrame, ...props
}: jsx.JSX.IntrinsicElements["group"] & TransitionTrack<TTransition>, _ref: ForwardedRef<Group | null>) => {
    const ref = useRef<Group | null>(null);
    const resolveSetTransitionState = () => {
        let timeMs = Date.now() - startMs;
        let ct = undefined as undefined | (typeof transitions)[number];
        for (const t of transitions) {
            if (timeMs < t.durationMs) {
                ct = t;
                break;
            }
            timeMs -= t.durationMs;
        }
        if (!ct && transitions.length > 0) {
            ct = transitions[transitions.length - 1];
            timeMs += ct.durationMs;
        }

        const g = ref.current;
        if (!g) { return; }
        ct?.onFrame?.(g, timeMs / ct.durationMs, timeMs);
        onFrame?.(g, timeMs, ct);
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
