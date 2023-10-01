import { Box, Sphere } from "@react-three/drei";


export const Pumpkin = ({
    isGhost,
}: {
    isGhost?: boolean
}) => {

    const color = isGhost ? "#fc9444" : "#ff7207";
    const secondColor = isGhost ? "#685829" : "#6e5300";

    return <group>
        <mesh position={[0, 0, 0.05]} >
            <Sphere args={[0.4, 16, 16]} scale={[1, 0.8, 1]}>
                <meshBasicMaterial
                    attach="material"
                    color={color}
                />
            </Sphere>
        </mesh>
        <group position={[0, 0.17, 0]}>
            {Array.from({ length: 3 }, (_, i) => (
                <mesh position={[0, i * 0.16, i * 0.1]} key={i}>
                    <Box args={[0.16, 0.16, 0.16]}>
                        <meshBasicMaterial
                            attach="material"
                            color={secondColor} />
                    </Box>
                </mesh>
            ))}
        </group>
    </group>;
};