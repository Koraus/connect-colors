import { RoundedBox } from "@react-three/drei";
import { memo } from "react";


const _Tree = ({
    isGhost,
}: {
    isGhost?: boolean
}) => {

    const color = isGhost ? "#7cba83" : "#21b433";
    const secondColor = isGhost ? "#7ae286" : "#29e63f";

    return <group scale={[3, 3, 3]}>
        <mesh position={[0, 0, 0]} >
            <RoundedBox args={[0.15, 0.2, 0.15]} >
                <meshLambertMaterial attach="material" color={"brown"} />
            </RoundedBox>
        </mesh>
        <mesh position={[0, 0.1, 0]} >
            <RoundedBox args={[0.3, 0.1, 0.3]} >
                <meshLambertMaterial attach="material" color={color} />
            </RoundedBox>
            <mesh position={[0, 0.1, 0]} >
                <RoundedBox args={[0.2, 0.1, 0.2]} >
                    <meshLambertMaterial attach="material" color={secondColor} />
                </RoundedBox>
            </mesh>
            <mesh position={[0, 0.18, 0]} >
                <RoundedBox args={[0.1, 0.05, 0.1]} >
                    <meshLambertMaterial attach="material" color={color} />
                </RoundedBox>
            </mesh>
        </mesh>
    </group>;
};

const GhostTree = memo(() => <_Tree isGhost />);
const RegularTree = memo(() => <_Tree />);

export const Tree = ({
    isGhost,
}: {
    isGhost?: boolean
}) => {
    return isGhost ? <GhostTree /> : <RegularTree />;
};