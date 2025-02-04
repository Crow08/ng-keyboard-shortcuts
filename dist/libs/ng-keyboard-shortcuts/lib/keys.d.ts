export declare const modifiers: {
    shift: string;
    ctrl: string;
    alt: string;
    cmd: string;
    command: string;
    meta: string;
    'left command': string;
    'right command': string;
    '\u2318': string;
    option: string;
    ctl: string;
    control: string;
};
export declare const _SPECIAL_CASES: {
    plus: string;
};
export declare const symbols: {
    cmd: string;
    command: string;
    'left command': string;
    'right command': string;
    option: string;
    plus: string;
    left: string;
    right: string;
    up: string;
    down: string;
    alt: string;
    ctrl: string;
    control: string;
    shift: string;
};
export declare const _MAP: {
    8: string;
    9: string;
    13: string;
    16: string;
    17: string[];
    18: string;
    20: string;
    27: string[];
    32: string[];
    33: string;
    34: string;
    35: string;
    36: string;
    37: string;
    38: string;
    39: string;
    40: string;
    45: string;
    46: string;
    91: string[];
    93: string[];
    224: string[];
};
export declare const _KEYCODE_MAP: {
    106: string;
    107: string;
    109: string;
    110: string;
    111: string;
    186: string;
    187: string;
    188: string;
    189: string;
    190: string;
    191: string;
    192: string;
    219: string;
    220: string;
    221: string;
    222: string;
};
/**
 * this is a mapping of keys that require shift on a US keypad
 * back to the non shift equivelents
 *
 * this is so you can use keyup events with these keys
 *
 * note that this will only work reliably on US keyboards
 *
 */
export declare const _SHIFT_MAP: Record<string, string>;
export declare const _INVERTED_SHIFT_MAP: Record<string, string>;
