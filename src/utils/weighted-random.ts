
export const weightedIndexRandom01 = (
    weights: number[],
    random01: () => number,
) => {
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const r = random01() * totalWeight;
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
        sum += weights[i];
        if (sum >= r) {
            return i;
        }
    }
    return weights.length - 1;
};

export const weightedRandom01 = <T extends string | symbol>(
    weights: Record<T, number>,
    random01: () => number,
) => {
    const entries = Object.entries(weights) as [T, number][];
    const i = weightedIndexRandom01(entries.map(e => e[1]), random01);
    return entries[i][0] as T;
};
