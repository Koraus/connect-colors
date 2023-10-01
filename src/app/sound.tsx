import { useLoader, useThree } from "@react-three/fiber";
import { useRef, useMemo, useLayoutEffect } from "react";
import { useRecoilValue } from "recoil";
import { AudioListener, AudioLoader, PositionalAudio } from "three";
import { isSounOnRecoil } from "./playing-data";
import { playingFieldRecoil } from "./playing-data";

export const Sound = ({ url }: { url: string }) => {

    const isSounOn = useRecoilValue(isSounOnRecoil);

    const sound = useRef<PositionalAudio | null>(null);

    const { camera } = useThree();
    const listener = useMemo(() => new AudioListener(), []);
    useLayoutEffect(() => {
        camera.add(listener);
        return () => { camera.remove(listener); };
    }, [camera, listener]);

    const buffer = useLoader(AudioLoader, url);
    useLayoutEffect(() => {
        if (!sound.current) { return; }

        sound.current.setBuffer(buffer);
        sound.current.setRefDistance(10);
        sound.current.setLoop(false);
        sound.current.stop();
    }, [buffer]);

    const field = useRecoilValue(playingFieldRecoil);
    useLayoutEffect(() => {
        if (!sound.current) { return; }
        if (!isSounOn) { return; }

        sound.current.play();
    }, [field.prevMove?.field]); // intentionally no isSoundOn in deps

    return <positionalAudio ref={sound} args={[listener]} />;
};