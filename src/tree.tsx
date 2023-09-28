import { RoundedBox } from "@react-three/drei"


export const Tree = ({
    value, isGhost
}: {
    value: number, isGhost?: boolean
}) => {
    const colors = ["#FFFFFF", "#21b433", "#ffaf5f", "#f6e825"];
    const ghostColors = ["#FFFFFF", "#5db867", "#f7c28e", "#f6ed6a"];
    const secondaryСolor = ["#FFFFFF", "#29e63f", "#e9762a", "#c8bd24"];
    const secondaryGhostСolor = ["#FFFFFF", "#5ee36e", "#db9c5d", "#c4bd5b"]

    const color = isGhost ? ghostColors[value] : colors[value];
    const secondColor = isGhost ? secondaryGhostСolor[value] : secondaryСolor[value];

    return (
        <group >
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
        </group >
    )
}
