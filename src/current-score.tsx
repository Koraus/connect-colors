import { useRecoilValue } from "recoil"
import { playingFieldRecoil } from "./data-recoil/playing-data"

export const CurrentScore = () => {
    const score = useRecoilValue(playingFieldRecoil).score
    return <h2> { score }</h2>
}