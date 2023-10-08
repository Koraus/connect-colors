const map = new WeakMap<object, number>();
let nextKey = 0;

export const refKey = <T extends object>(value: T): number => {
    if (!map.has(value)) { map.set(value, nextKey++); }
    return map.get(value)!;
};
