export declare function isFunction(x: any): x is () => void;
export declare function invert<T extends string, U extends string>(obj: Record<T, U>): Record<string, string>;
export declare const any: (fn: (params: unknown) => boolean, list: unknown[]) => boolean;
export declare const identity: (x: any) => any;
/**
 * @ignore
 * @param x
 * @returns boolean
 */
export declare const isNill: (x: unknown) => boolean;
/**
 * @ignore
 * @param xs
 * @param key
 * @returns any
 */
export declare function groupBy<T, K extends string = string>(xs: readonly T[], key: K): Record<K, T[]>;
/**
 * @ignore
 * @param first
 * @param second
 * @returns any[]
 */
export declare const difference: (first: any[], second: any[]) => any[];
/**
 * @ignore
 * @param preds
 * @returns (...args) => boolean;
 */
export declare const allPass: (preds: any) => (...args: any[]) => boolean;
export declare const prop: (prop: any) => (object: any) => any;
export declare const minMaxArrayProp: (type: any) => (property: any, array: any) => any;
export declare const maxArrayProp: (property: any, array: any) => any;
