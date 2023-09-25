import { useLoader, useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { useRecoilValue } from "recoil";
import { AudioListener, AudioLoader, PositionalAudio } from "three"
import { isSounOnRecoil, playingFieldRecoil } from "./data-recoil/playing-data";

export const Sound = ({ url }: { url: string }) => {

    const isSounOn = useRecoilValue(isSounOnRecoil);

    const sound = useRef<PositionalAudio | null>(null);

    const { camera } = useThree();
    const [listener] = useState(() => new AudioListener());

    // @ts-ignore
    const buffer = useLoader(AudioLoader, url);

    const field = useRecoilValue(playingFieldRecoil);
    // @ts-ignore
    useEffect(() => {

        if (sound.current !== null) {
            sound.current.setBuffer(buffer)
            sound.current.setRefDistance(1)
            sound.current.setLoop(false)
            sound.current.stop()
            if (isSounOn) {
                sound.current.play()
            }
        }

        camera.add(listener)

        return () => camera.remove(listener)

    }, [field.prevMove?.field])

    return <positionalAudio ref={sound} args={[listener]} />


}