import { RoundedBox } from "@react-three/drei"


export const Tree = ({
    isGhost
}: {
    isGhost?: boolean
}) => {

    const color = isGhost ? "#7cba83" : "#21b433";
    const secondColor = isGhost ? "#7ae286" : "#29e63f";

    return (
        <group>
            <mesh position={[0, 0, 0]} >
                <RoundedBox args={[0.15, 0.15, 0.2]} >
                    <meshLambertMaterial attach="material" color={"brown"} />
                </RoundedBox>
            </mesh>
            <mesh position={[0, 0, 0.1]} >
                <RoundedBox args={[0.3, 0.3, 0.1]} >
                    <meshLambertMaterial attach="material" color={color} />
                </RoundedBox>
                <mesh position={[0, 0, 0.1]} >
                    <RoundedBox args={[0.2, 0.2, 0.1]} >
                        <meshLambertMaterial attach="material" color={secondColor} />
                    </RoundedBox>
                </mesh>
                <mesh position={[0, 0, 0.18]} >
                    <RoundedBox args={[0.1, 0.1, 0.05]} >
                        <meshLambertMaterial attach="material" color={color} />
                    </RoundedBox>
                </mesh>
            </mesh>
        </group>
    )
}
