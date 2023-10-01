import { Box, Sphere } from "@react-three/drei";


export const Pumpkin = ({
    isGhost,
}: {
    isGhost?: boolean
}) => {

    const color = isGhost ? "#fc9444" : "#ff7207";
    const secondColor = isGhost ? "#685829" : "#6e5300";

    return (
        <group>
            <mesh position={[0, 0, 0.05]} >
                <Sphere args={[0.14, 16, 16]} scale={[1, 1, 0.8]}>
                    <meshBasicMaterial
                        attach="material"
                        color={color}
                    />
                </Sphere>
            </mesh>
            <group position={[0, 0, 0.17]}>
                {Array.from({ length: 3 }, () => 0).map(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    (e, i) => {
                        const size = 0.04;
                        const y = i > 1 ? -(i * 0.001) : i * 0.02;
                        return (
                            <mesh position={[0, y, i * size]} key={i}>
                                <Box args={[size, size, size]}>
                                    <meshBasicMaterial
                                        attach="material"
                                        color={secondColor}
                                    />
                                </Box>
                            </mesh>
                        );
                    },
                )}
            </group>
        </group>
    );
};