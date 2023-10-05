export const mulberry32 = (seed32: number) => {
    seed32 += 0x6D2B79F5;
    seed32 = Math.imul(seed32 ^ seed32 >>> 15, seed32 | 1);
    seed32 ^= seed32 + Math.imul(seed32 ^ seed32 >>> 7, seed32 | 61);
    return ((seed32 ^ seed32 >>> 14) >>> 0);
};

export const createRandomMulberry32 = (seed32: number) =>
    () => seed32 = mulberry32(seed32 >>> 0);

export const createRandomMulberry01 = (seed01: number) => {
    const randomMulberry32 = createRandomMulberry32(seed01 * 0x100000000);
    return () => randomMulberry32() / 0x100000000;
};