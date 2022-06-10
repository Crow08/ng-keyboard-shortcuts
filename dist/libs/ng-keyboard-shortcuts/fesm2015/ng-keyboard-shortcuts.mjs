import * as i0 from '@angular/core';
import { Injectable, Inject, Component, Input, Directive, TemplateRef, ViewChild, EventEmitter, ChangeDetectionStrategy, Output, NgModule } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent, timer, throwError, of } from 'rxjs';
import { filter, switchMap, first, tap, repeat, map, throttle, takeUntil, catchError, scan, distinctUntilChanged } from 'rxjs/operators';
import * as i1 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

function isFunction(x) {
    return typeof x === 'function';
}
function invert(obj) {
    const new_obj = {};
    for (const prop in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(prop)) {
            new_obj[obj[prop]] = prop;
        }
    }
    return new_obj;
}
const any = (fn, list) => {
    let idx = 0;
    while (idx < list.length) {
        if (fn(list[idx])) {
            return true;
        }
        idx += 1;
    }
    return false;
};
const identity = (x) => x;
/**
 * @ignore
 * @param x
 * @returns boolean
 */
const isNill = (x) => x == null;
/**
 * @ignore
 * @param xs
 * @param key
 * @returns any
 */
function groupBy(xs, key) {
    return xs.reduce((result, x) => (Object.assign(Object.assign({}, result), { 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        [x[key]]: [...(result[x[key]] || []), x] })), {});
}
/**
 * @ignore
 * @param first
 * @param second
 * @returns any[]
 */
const difference = (first, second) => first.filter(item => !second.includes(item));
/**
 * @ignore
 * @param preds
 * @returns (...args) => boolean;
 */
const allPass = preds => (...args) => {
    let idx = 0;
    const len = preds.length;
    while (idx < len) {
        if (!preds[idx].apply(this, args)) {
            return false;
        }
        idx += 1;
    }
    return true;
};
const prop = prop => object => object[prop];
const minMaxArrayProp = type => (property, array) => 
// eslint-disable-next-line prefer-spread
Math[type].apply(Math, array.map(prop(property)));
const maxArrayProp = (property, array) => {
    return array.reduce((acc, curr) => {
        const propFn = prop(property);
        const currentValue = propFn(curr);
        const previousValue = propFn(acc);
        return currentValue > previousValue ? curr : acc;
    }, { [property]: 0 });
};

const isMac = typeof navigator !== 'undefined' ? navigator.userAgent.includes('Mac OS') : false;
const modifiers = {
    shift: 'shiftKey',
    ctrl: 'ctrlKey',
    alt: 'altKey',
    cmd: isMac ? 'metaKey' : 'ctrlKey',
    command: isMac ? 'metaKey' : 'ctrlKey',
    meta: isMac ? 'metaKey' : 'ctrlKey',
    'left command': 'metaKey',
    'right command': 'MetaRight',
    '⌘': isMac ? 'metaKey' : 'ctrlKey',
    option: 'altKey',
    ctl: 'ctrlKey',
    control: 'ctrlKey'
};
const _SPECIAL_CASES = {
    plus: '+'
};
const symbols = {
    cmd: isMac ? '⌘' : 'Ctrl',
    command: isMac ? '⌘' : 'Ctrl',
    'left command': isMac ? '⌘' : 'Ctrl',
    'right command': isMac ? '⌘' : 'Ctrl',
    option: isMac ? '⌥' : 'Alt',
    plus: '+',
    left: '←',
    right: '→',
    up: '↑',
    down: '↓',
    alt: isMac ? '⌥' : 'Alt',
    ctrl: 'Ctrl',
    control: 'Ctrl',
    shift: '⇧'
};
const _MAP = {
    8: 'backspace',
    9: 'tab',
    13: 'enter',
    16: 'shift',
    17: ['ctrl', 'control'],
    18: 'alt',
    20: 'capslock',
    27: ['esc', 'escape'],
    32: ['space', 'spc'],
    33: 'pageup',
    34: 'pagedown',
    35: 'end',
    36: 'home',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    45: 'ins',
    46: 'del',
    91: ['meta', 'cmd', 'command'],
    93: ['meta', 'cmd', 'command'],
    224: ['meta', 'cmd', 'command']
};
/*
 * mapping for special characters so they can support
 *
 * this dictionary is only used incase you want to bind a
 * keyup or keydown event to one of these keys
 *
 */
const _KEYCODE_MAP = {
    106: '*',
    107: '+',
    109: '-',
    110: '.',
    111: '/',
    186: ';',
    187: '=',
    188: ',',
    189: '-',
    190: '.',
    191: '/',
    192: '`',
    219: '[',
    220: '\\',
    221: ']',
    222: '\''
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
const _SHIFT_MAP = {
    '`': '~',
    '1': '!',
    '2': '@',
    '3': '#',
    '4': '$',
    '5': '%',
    '6': '^',
    '7': '&',
    '8': '*',
    '9': '(',
    '0': ')',
    '-': '_',
    '=': '+',
    ';': ':',
    '\'': '"',
    ',': '<',
    '.': '>',
    '/': '?',
    '\\': '|'
};
const _INVERTED_SHIFT_MAP = invert(_SHIFT_MAP);
/**
 * loop through the f keys, f1 to f19 and add them to the map
 * programatically
 */
for (let i = 1; i < 20; ++i) {
    _MAP[111 + i] = 'f' + i;
}
/**
 * loop through to map numbers on the numeric keypad
 */
for (let i = 0; i <= 9; ++i) {
    // This needs to use a string cause otherwise since 0 is falsey
    // event will never fire for numpad 0 pressed as part of a keydown
    // event.
    _MAP[i + 96] = i.toString();
}

var AllowIn;
(function (AllowIn) {
    AllowIn["Textarea"] = "TEXTAREA";
    AllowIn["Input"] = "INPUT";
    AllowIn["Select"] = "SELECT";
    AllowIn["ContentEditable"] = "CONTENT-EDITABLE";
})(AllowIn || (AllowIn = {}));

/**
 * @ignore
 * @type {number}
 */
let guid = 0;
class KeyboardShortcutsService {
    /**
     * @ignore
     */
    constructor(document) {
        this.document = document;
        /**
         * Parsed shortcuts
         * for each key create a predicate function
         */
        this._shortcuts = [];
        this._sequences = [];
        /**
         * Throttle the keypress event.
         */
        this.throttleTime = 0;
        this._pressed = new Subject();
        /**
         * Streams of pressed events, can be used instead or with a command.
         */
        this.pressed$ = this._pressed.asObservable();
        /**
         * Disable all keyboard shortcuts
         */
        this.disabled = false;
        this._shortcutsSub = new BehaviorSubject([]);
        this.shortcuts$ = this._shortcutsSub
            .pipe(filter((shortcuts) => !!shortcuts.length));
        this._ignored = [AllowIn.Input, AllowIn.Textarea, AllowIn.Select, AllowIn.ContentEditable];
        /**
         * @ignore
         * @param shortcut
         */
        this.isAllowed = (shortcut) => {
            const target = shortcut.event.target;
            const isContentEditable = !!target.getAttribute("contenteditable");
            const nodeName = isContentEditable ? AllowIn.ContentEditable : target.nodeName;
            if (target === shortcut.target) {
                return true;
            }
            // if (shortcut.allowIn.includes(AllowIn.ContentEditable)) {
            //     return !!target.getAttribute("contenteditable");
            // }
            if (shortcut.allowIn.length) {
                return !difference(this._ignored, shortcut.allowIn).includes(nodeName);
            }
            if (isContentEditable) {
                return false;
            }
            return !this._ignored.includes(target.nodeName);
        };
        /**
         * @ignore
         * @param event
         */
        this.mapEvent = (event) => {
            return this._shortcuts
                .filter((shortcut) => !shortcut.isSequence)
                .map((shortcut) => Object.assign({}, shortcut, {
                predicates: any(identity, shortcut.predicates.map((predicates) => allPass(predicates)(event))),
                event: event
            }))
                .filter((shortcut) => shortcut.predicates)
                .reduce((acc, shortcut) => (acc.priority > shortcut.priority ? acc : shortcut), {
                priority: 0
            });
        };
        /**
         * @ignore
         * Subscription for on destroy.
         */
        this.subscriptions = [];
        this.keydown$ = fromEvent(this.document, "keydown");
        /**
         * fixes for firefox prevent default
         * on click event on button focus:
         * see issue:
         * keeping this here for now, but it is commented out
         * Firefox reference bug:
         * https://bugzilla.mozilla.org/show_bug.cgi?id=1487102
         * and my repo:
         *
         * https://github.com/omridevk/ng-keyboard-shortcuts/issues/35
         */
        this.ignore$ = this.pressed$.pipe(filter((e) => e.event.defaultPrevented), switchMap(() => this.clicks$.pipe(first())), tap((e) => {
            e.preventDefault();
            e.stopPropagation();
        }), repeat());
        /**
         * @ignore
         */
        this.clicks$ = fromEvent(this.document, "click", { capture: true });
        this.keyup$ = fromEvent(this.document, "keyup");
        /**
         * @ignore
         */
        this.keydownCombo$ = this.keydown$.pipe(filter((_) => !this.disabled), map(this.mapEvent), filter((shortcut) => !shortcut.target || shortcut.event.target === shortcut.target), filter((shortcut) => isFunction(shortcut.command)), filter((shortcut) => this.isAllowed(shortcut)), tap((shortcut) => {
            if (!shortcut.preventDefault) {
                return;
            }
            shortcut.event.preventDefault();
            shortcut.event.stopPropagation();
        }), throttle((shortcut) => timer(shortcut.throttleTime)), tap((shortcut) => shortcut.command({ event: shortcut.event, key: shortcut.key })), tap((shortcut) => this._pressed.next({ event: shortcut.event, key: shortcut.key })), takeUntil(this.keyup$), repeat(), catchError((error) => throwError(error)));
        /**
         * @ignore
         */
        this.timer$ = new Subject();
        /**
         * @ignore
         */
        this.resetCounter$ = this.timer$
            .asObservable()
            .pipe(switchMap(() => timer(KeyboardShortcutsService.TIMEOUT_SEQUENCE)));
        this.keydownSequence$ = this.keydown$.pipe(map((event) => ({
            event,
            sequences: this._sequences
        })), scan((acc, arg) => {
            const { event } = arg;
            const currentLength = acc.events.length;
            const sequences = currentLength ? acc.sequences : arg.sequences;
            const [characters] = this.characterFromEvent(event);
            const allChars = Array.isArray(characters)
                ? [...characters, event.key]
                : [characters, event.key];
            const result = sequences
                .map((sequence) => {
                const sequences = sequence.sequence.filter((seque) => allChars.some((key) => (_SPECIAL_CASES[seque[currentLength]] ||
                    seque[currentLength]) === key));
                const partialMatch = sequences.length > 0;
                if (sequence.fullMatch) {
                    return sequence;
                }
                return Object.assign(Object.assign({}, sequence), { sequence: sequences, partialMatch, event: event, fullMatch: partialMatch &&
                        this.isFullMatch({ command: sequence, events: acc.events }) });
            })
                .filter((sequences) => sequences.partialMatch || sequences.fullMatch);
            const [match] = result;
            if (!match || this.modifiersOn(event)) {
                return { events: [], sequences: this._sequences };
            }
            /*
             * handle case of "?" sequence and "? a" sequence
             * need to determine which one to trigger.
             * if both match, we pick the longer one (? a) in this case.
             */
            const guess = maxArrayProp("priority", result);
            if (result.length > 1 && guess.fullMatch) {
                return { events: [], command: guess, sequences: this._sequences };
            }
            if (result.length > 1) {
                return {
                    events: [...acc.events, event],
                    command: result,
                    sequences: result
                };
            }
            if (match.fullMatch) {
                return { events: [], command: match, sequences: this._sequences };
            }
            return {
                events: [...acc.events, event],
                command: result,
                sequences: result
            };
        }, { events: [], sequences: [] }), switchMap(({ command }) => {
            if (Array.isArray(command)) {
                /*
                 * Add a timer to handle the case where for example:
                 * a sequence "?" is registered and "? a" is registered as well
                 * if the user does not hit any key for 500ms, the single sequence will trigger
                 * if any keydown event occur, this timer will reset, given a chance to complete
                 * the full sequence (? a) in this case.
                 * This delay only occurs when single key sequence is the beginning of another sequence.
                 */
                return timer(500).pipe(map(() => ({
                    command: command.filter((command) => command.fullMatch)[0]
                })));
            }
            return of({ command });
        }), takeUntil(this.pressed$), filter(({ command }) => command && command.fullMatch), map(({ command }) => command), filter((shortcut) => isFunction(shortcut.command)), filter((shortcut) => !shortcut.target || shortcut.event.target === shortcut.target), filter(this.isAllowed), tap((shortcut) => !shortcut.preventDefault || shortcut.event.preventDefault()), throttle((shortcut) => timer(shortcut.throttleTime)), tap((shortcut) => shortcut.command({ event: shortcut.event, key: shortcut.key })), tap((shortcut) => this._pressed.next({ event: shortcut.event, key: shortcut.key })), takeUntil(this.resetCounter$), repeat());
        /**
         * @ignore
         * transforms a shortcut to:
         * a predicate function
         */
        this.getKeys = (keys) => {
            return keys
                .map((key) => key.trim())
                .filter((key) => key !== "+")
                .map((key) => {
                // for modifiers like control key
                // look for event['ctrlKey']
                // otherwise use the keyCode
                key = _SPECIAL_CASES[key] || key;
                // eslint-disable-next-line no-prototype-builtins
                if (modifiers.hasOwnProperty(key)) {
                    return (event) => {
                        return !!event[modifiers[key]];
                    };
                }
                return (event) => {
                    const isUpper = key === key.toUpperCase();
                    const isNonAlpha = /[^a-zA-Z\d\s:]/.test(key);
                    const inShiftMap = _INVERTED_SHIFT_MAP[key];
                    const [characters] = this.characterFromEvent(event);
                    const allModifiers = Object.keys(modifiers).map((key) => {
                        return modifiers[key];
                    });
                    const hasModifiers = allModifiers.some((modifier) => event[modifier]);
                    const result = Array.isArray(characters)
                        ? [...characters, event.key]
                        : [characters, event.key];
                    // if has modifiers:
                    // we want to make sure it is not upper case letters
                    // (because upper has modifiers so we want continue the check)
                    // we also want to make sure it is not alphanumeric char like ? / ^ & and others (since those could require modifiers as well)
                    // we also want to check this only if the length of
                    // of the keys is one (i.e the command key is "?" or "c"
                    // this while check is here to verify that:
                    // if registered key like "e"
                    // it won't be fired when clicking ctrl + e, or any modifiers + the key
                    // we only want to trigger when the single key is clicked alone
                    // thus all these edge cases.
                    // hopefully this would cover all cases
                    // TODO:: find a way simplify this
                    if (hasModifiers &&
                        (!isUpper || isNonAlpha) &&
                        !inShiftMap &&
                        keys.length === 1) {
                        return false;
                    }
                    return result.some((char) => {
                        if (char === key && isUpper) {
                            return true;
                        }
                        return key === char;
                    });
                };
            });
        };
        this.subscriptions.push(this.keydownSequence$.subscribe(), this.keydownCombo$.subscribe()
        // this.ignore$.subscribe()
        );
    }
    /**
     * @ignore
     * @param command
     * @param events
     */
    isFullMatch({ command, events }) {
        if (!command) {
            return false;
        }
        return command.sequence.some((sequence) => {
            return sequence.length === events.length + 1;
        });
    }
    /**
     * @ignore
     */
    get shortcuts() {
        return this._shortcuts;
    }
    /**
     * @ignore
     * @param event
     */
    _characterFromEvent(event) {
        if (typeof event.which !== "number") {
            event.which = event.keyCode;
        }
        if (_SPECIAL_CASES[event.which]) {
            return [_SPECIAL_CASES[event.which], event.shiftKey];
        }
        if (_MAP[event.which]) {
            // for non keypress events the special maps are needed
            return [_MAP[event.which], event.shiftKey];
        }
        if (_KEYCODE_MAP[event.which]) {
            return [_KEYCODE_MAP[event.which], event.shiftKey];
        }
        // in case event key is lower case but registered key is upper case
        // return it in the lower case
        if (String.fromCharCode(event.which).toLowerCase() !== event.key) {
            return [String.fromCharCode(event.which).toLowerCase(), event.shiftKey];
        }
        return [event.key, event.shiftKey];
    }
    characterFromEvent(event) {
        const [key, shiftKey] = this._characterFromEvent(event);
        if (shiftKey && _SHIFT_MAP[key]) {
            return [_SHIFT_MAP[key], shiftKey];
        }
        return [key, shiftKey];
    }
    /**
     * @ignore
     * Remove subscription.
     */
    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
    /**
     * @ignore
     * @param shortcuts
     */
    isSequence(shortcuts) {
        return !shortcuts.some((shortcut) => shortcut.includes("+") || shortcut.length === 1);
    }
    /**
     * Add new shortcut/s
     */
    add(shortcuts) {
        shortcuts = Array.isArray(shortcuts) ? shortcuts : [shortcuts];
        const commands = this.parseCommand(shortcuts);
        commands.forEach((command) => {
            if (command.isSequence) {
                this._sequences.push(command);
                return;
            }
            this._shortcuts.push(command);
        });
        setTimeout(() => {
            this._shortcutsSub.next([...this._shortcuts, ...this._sequences]);
        });
        return commands.map((command) => command.id);
    }
    /**
     * Remove a command based on key or array of keys.
     * can be used for cleanup.
     * @returns
     * @param ids
     */
    remove(ids) {
        ids = Array.isArray(ids) ? ids : [ids];
        this._shortcuts = this._shortcuts.filter((shortcut) => !ids.includes(shortcut.id));
        this._sequences = this._sequences.filter((shortcut) => !ids.includes(shortcut.id));
        setTimeout(() => {
            this._shortcutsSub.next([...this._shortcuts, ...this._sequences]);
        });
        return this;
    }
    /**
     * Returns an observable of keyboard shortcut filtered by a specific key.
     * @param key - the key to filter the observable by.
     */
    select(key) {
        return this.pressed$.pipe(filter(({ event, key: eventKeys }) => {
            eventKeys = Array.isArray(eventKeys) ? eventKeys : [eventKeys];
            return !!eventKeys.find((eventKey) => eventKey === key);
        }));
    }
    /**
     * @ignore
     * @param event
     */
    modifiersOn(event) {
        return ["metaKey", "altKey", "ctrlKey"].some((mod) => event[mod]);
    }
    /**
     * @ignore
     * Parse each command using getKeys function
     */
    parseCommand(command) {
        const commands = Array.isArray(command) ? command : [command];
        return commands.map((command) => {
            const keys = Array.isArray(command.key) ? command.key : [command.key];
            const priority = Math.max(...keys.map((key) => key.split(" ").filter(identity).length));
            const predicates = keys.map((key) => this.getKeys(key.split(" ").filter(identity)));
            const isSequence = this.isSequence(keys);
            const sequence = isSequence
                ? keys.map((key) => key
                    .split(" ")
                    .filter(identity)
                    .map((key) => key.trim()))
                : [];
            return Object.assign(Object.assign({}, command), { isSequence, sequence: isSequence ? sequence : [], allowIn: command.allowIn || [], key: keys, id: `${guid++}`, throttle: isNill(command.throttleTime) ? this.throttleTime : command.throttleTime, priority: priority, predicates: predicates });
        });
    }
}
/**
 * @ignore
 * 2000 ms window to allow between key sequences otherwise
 * the sequence will reset.
 */
KeyboardShortcutsService.TIMEOUT_SEQUENCE = 1000;
KeyboardShortcutsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsService, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
KeyboardShortcutsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsService, providedIn: "root" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: "root"
                }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }];
    } });

/**
 * A component to bind global shortcuts, can be used multiple times across the app
 * will remove registered shortcuts when element is removed from DOM.
 */
class KeyboardShortcutsComponent {
    /**
     * @ignore
     * @param {KeyboardShortcutsService} keyboard
     */
    constructor(keyboard) {
        this.keyboard = keyboard;
        /**
         * A list of shortcuts.
         */
        this.shortcuts = [];
        /**
         * @ignore
         * list of registered keyboard shortcuts
         * used for clean up on NgDestroy.
         */
        this.clearIds = [];
        /**
         * @ignore
         */
        this._disabled = false;
    }
    /**
     * Disable all shortcuts for this component.
     */
    set disabled(value) {
        this._disabled = value;
        if (this.clearIds) {
            this.keyboard.remove(this.clearIds);
            this.clearIds = [];
        }
        if (value) {
            return;
        }
        this.clearIds = this.keyboard.add(this.shortcuts);
    }
    /**
     * Select a key to listen to, will emit when the selected key is pressed.
     */
    select(key) {
        return this.keyboard.select(key);
    }
    /**
     * @ignore
     */
    ngOnChanges(changes) {
        if (!changes['shortcuts'] || !changes['shortcuts'].currentValue) {
            return;
        }
        if (this.clearIds) {
            this.keyboard.remove(this.clearIds);
        }
        if (!this._disabled) {
            setTimeout(() => (this.clearIds = this.keyboard.add(changes['shortcuts'].currentValue)));
        }
    }
    /**
     * @ignore
     */
    ngOnDestroy() {
        this.keyboard.remove(this.clearIds);
    }
}
KeyboardShortcutsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsComponent, deps: [{ token: KeyboardShortcutsService }], target: i0.ɵɵFactoryTarget.Component });
KeyboardShortcutsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.7", type: KeyboardShortcutsComponent, selector: "ng-keyboard-shortcuts", inputs: { shortcuts: "shortcuts", disabled: "disabled" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ng-keyboard-shortcuts',
                    template: ''
                }]
        }], ctorParameters: function () { return [{ type: KeyboardShortcutsService }]; }, propDecorators: { shortcuts: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });

/**
 * Service to assist showing custom help screen
 */
class KeyboardShortcutsHelpService {
    /**
     * @ignore
     * @param {KeyboardShortcutsService} keyboard
     */
    constructor(keyboard) {
        this.keyboard = keyboard;
        /**
         * Observable to provide access to all registered shortcuts in the app.
         * @type {Observable<any>}
         */
        this.shortcuts$ = this.keyboard.shortcuts$.pipe(map(shortcuts => shortcuts
            .filter(shortcut => Boolean(shortcut.label) && Boolean(shortcut.description))
            .map(({ key, label, description }) => ({
            key,
            label,
            description
        }))));
    }
}
KeyboardShortcutsHelpService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsHelpService, deps: [{ token: KeyboardShortcutsService }], target: i0.ɵɵFactoryTarget.Injectable });
KeyboardShortcutsHelpService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsHelpService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsHelpService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: KeyboardShortcutsService }]; } });

/**
 * Use this service to listen to a specific keyboards events using Rxjs.
 * The shortcut must be declared in the app for the select to work.
 */
class KeyboardShortcutsSelectService {
    constructor(keyboardService) {
        this.keyboardService = keyboardService;
    }
    /**
     * Returns an observable of keyboard shortcut filtered by a specific key.
     * @param key - the key to filter the observable by.
     */
    select(key) {
        return this.keyboardService.select(key);
    }
}
KeyboardShortcutsSelectService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsSelectService, deps: [{ token: KeyboardShortcutsService }], target: i0.ɵɵFactoryTarget.Injectable });
KeyboardShortcutsSelectService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsSelectService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsSelectService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: KeyboardShortcutsService }]; } });

/**
 * A directive to be used with "focusable" elements, like:
 * textarea, input, select.
 */
class KeyboardShortcutsDirective {
    /**
     * @ignore
     * @param {KeyboardShortcutsService} keyboard
     * @param {ElementRef} el
     */
    constructor(keyboard, el) {
        this.keyboard = keyboard;
        this.el = el;
        /**
         * @ignore
         * @type {boolean}
         * @private
         */
        this._disabled = false;
    }
    /**
     * whether to disable the shortcuts for this directive
     * @param value
     */
    set disabled(value) {
        this._disabled = value;
        if (this.clearIds) {
            this.keyboard.remove(this.clearIds);
        }
        setTimeout(() => {
            if (value === false && this.ngKeyboardShortcuts) {
                this.clearIds = this.keyboard.add(this.transformInput(this.ngKeyboardShortcuts));
            }
        });
    }
    /**
     * @ignore
     * @param {Shortcut[]} shortcuts
     * @returns {any}
     */
    transformInput(shortcuts) {
        return shortcuts.map(shortcut => (Object.assign(Object.assign({}, shortcut), { target: this.el.nativeElement, allowIn: [AllowIn.Select, AllowIn.Input, AllowIn.Textarea] })));
    }
    /**
     * @ignore
     */
    ngOnDestroy() {
        if (!this.clearIds) {
            return;
        }
        this.keyboard.remove(this.clearIds);
    }
    /**
     * @ignore
     * @param {SimpleChanges} changes
     */
    ngOnChanges(changes) {
        const { ngKeyboardShortcuts } = changes;
        if (this.clearIds) {
            this.keyboard.remove(this.clearIds);
        }
        if (!ngKeyboardShortcuts || !ngKeyboardShortcuts.currentValue) {
            return;
        }
        this.clearIds = this.keyboard.add(this.transformInput(ngKeyboardShortcuts.currentValue));
    }
}
KeyboardShortcutsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsDirective, deps: [{ token: KeyboardShortcutsService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
KeyboardShortcutsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.7", type: KeyboardShortcutsDirective, selector: "[ngKeyboardShortcuts]", inputs: { ngKeyboardShortcuts: "ngKeyboardShortcuts", disabled: "disabled" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngKeyboardShortcuts]'
                }]
        }], ctorParameters: function () { return [{ type: KeyboardShortcutsService }, { type: i0.ElementRef }]; }, propDecorators: { ngKeyboardShortcuts: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });

/**
 * @ignore
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalOutlet`.
 */
class Portal {
    /** Attach this portal to a host. */
    attach(host) {
        if (host == null) {
            // TODO: add error
            console.error('null portal error');
        }
        if (host.hasAttached()) {
            console.error('portal already attached');
            // throwPortalAlreadyAttachedError();
        }
        this._attachedHost = host;
        return host.attach(this);
    }
    /** Detach this portal from its host */
    detach() {
        const host = this._attachedHost;
        if (host == null) {
            console.error('no portal attached!');
            // throwNoPortalAttachedError();
        }
        else {
            this._attachedHost = null;
            host.detach();
        }
    }
    /** Whether this portal is attached to a host. */
    get isAttached() {
        return this._attachedHost != null;
    }
    /**
     * Sets the PortalOutlet reference without performing `attach()`. This is used directly by
     * the PortalOutlet when it is performing an `attach()` or `detach()`.
     */
    setAttachedHost(host) {
        this._attachedHost = host;
    }
}
/**
 * @ignore
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 */
class ComponentPortal extends Portal {
    constructor(component, viewContainerRef, injector, componentFactoryResolver) {
        super();
        this.component = component;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.componentFactoryResolver = componentFactoryResolver;
    }
}
/**
 * @ignore
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
class TemplatePortal extends Portal {
    constructor(template, viewContainerRef, context) {
        super();
        this.templateRef = template;
        this.viewContainerRef = viewContainerRef;
        this.context = context;
    }
    get origin() {
        return this.templateRef.elementRef;
    }
    /**
     * Attach the portal to the provided `PortalOutlet`.
     * When a context is provided it will override the `context` property of the `TemplatePortal`
     * instance.
     */
    attach(host, context = this.context) {
        this.context = context;
        return super.attach(host);
    }
    detach() {
        this.context = undefined;
        return super.detach();
    }
}
/**
 * @ignore
 * Partial implementation of PortalOutlet that handles attaching
 * ComponentPortal and TemplatePortal.
 */
class BasePortalOutlet {
    constructor() {
        /** Whether this host has already been permanently disposed. */
        this._isDisposed = false;
    }
    /** Whether this host has an attached portal. */
    hasAttached() {
        return !!this._attachedPortal;
    }
    /** Attaches a portal. */
    attach(portal) {
        if (!portal) {
            console.error('null portal!');
            // throwNullPortalError();
        }
        if (this.hasAttached()) {
            console.error('portal already attached');
            // throwPortalAlreadyAttachedError();
        }
        if (this._isDisposed) {
            console.error('portal out already disposed');
            // throwPortalOutletAlreadyDisposedError();
        }
        if (portal instanceof ComponentPortal) {
            this._attachedPortal = portal;
            return this.attachComponentPortal(portal);
        }
        else if (portal instanceof TemplatePortal) {
            this._attachedPortal = portal;
            return this.attachTemplatePortal(portal);
        }
        console.error('unknown portal type');
        // throwUnknownPortalTypeError();
    }
    /** Detaches a previously attached portal. */
    detach() {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost(null);
            this._attachedPortal = null;
        }
        this._invokeDisposeFn();
    }
    /** Permanently dispose of this portal host. */
    dispose() {
        if (this.hasAttached()) {
            this.detach();
        }
        this._invokeDisposeFn();
        this._isDisposed = true;
    }
    /** @docs-private */
    setDisposeFn(fn) {
        this._disposeFn = fn;
    }
    _invokeDisposeFn() {
        if (this._disposeFn) {
            this._disposeFn();
            this._disposeFn = null;
        }
    }
}

/**
 * @ignore
 * A PortalOutlet for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 */
class DomPortalOutlet extends BasePortalOutlet {
    constructor(
    /** Element into which the content is projected. */
    outletElement, _componentFactoryResolver, _appRef, _defaultInjector) {
        super();
        this.outletElement = outletElement;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._defaultInjector = _defaultInjector;
    }
    /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @param portal Portal to be attached
     * @returns Reference to the created component.
     */
    attachComponentPortal(portal) {
        const resolver = portal.componentFactoryResolver || this._componentFactoryResolver;
        const componentFactory = resolver.resolveComponentFactory(portal.component);
        let componentRef;
        // If the portal specifies a ViewContainerRef, we will use that as the attachment point
        // for the component (in terms of Angular's component tree, not rendering).
        // When the ViewContainerRef is missing, we use the factory to create the component directly
        // and then manually attach the view to the application.
        if (portal.viewContainerRef) {
            componentRef = portal.viewContainerRef.createComponent(componentFactory, portal.viewContainerRef.length, portal.injector || portal.viewContainerRef.injector);
            this.setDisposeFn(() => componentRef.destroy());
        }
        else {
            componentRef = componentFactory.create(portal.injector || this._defaultInjector);
            this._appRef.attachView(componentRef.hostView);
            this.setDisposeFn(() => {
                this._appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            });
        }
        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        this.outletElement.appendChild(this._getComponentRootNode(componentRef));
        return componentRef;
    }
    /**
     * Attaches a template portal to the DOM as an embedded view.
     * @param portal Portal to be attached.
     * @returns Reference to the created embedded view.
     */
    attachTemplatePortal(portal) {
        const viewContainer = portal.viewContainerRef;
        const viewRef = viewContainer.createEmbeddedView(portal.templateRef, portal.context);
        viewRef.detectChanges();
        // The method `createEmbeddedView` will add the view as a child of the viewContainer.
        // But for the DomPortalOutlet the view can be added everywhere in the DOM
        // (e.g Overlay Container) To move the view to the specified host element. We just
        // re-append the existing root nodes.
        viewRef.rootNodes.forEach(rootNode => this.outletElement.appendChild(rootNode));
        this.setDisposeFn((() => {
            const index = viewContainer.indexOf(viewRef);
            if (index !== -1) {
                viewContainer.remove(index);
            }
        }));
        return viewRef;
    }
    /**
     * Clears out a portal from the DOM.
     */
    dispose() {
        super.dispose();
        if (this.outletElement.parentNode != null) {
            this.outletElement.parentNode.removeChild(this.outletElement);
        }
    }
    /** Gets the root HTMLElement for an instantiated component. */
    _getComponentRootNode(componentRef) {
        return componentRef.hostView.rootNodes[0];
    }
}

/**
 * @ignore
 */
class KeyboardShortcutsHelpItemComponent {
    constructor() {
    }
    set shortcut(shortcut) {
        const key = Array.isArray(shortcut.key) ? shortcut.key : [shortcut.key];
        this.parsedKeys = key.map(key => key
            .split(' ')
            .filter(identity)
            .filter(key => key !== '+')
            .map(key => {
            if (symbols[key]) {
                return symbols[key];
            }
            return key;
        }));
        this._shortcut = shortcut;
    }
    get shortcut() {
        return this._shortcut;
    }
    ngOnInit() {
    }
}
KeyboardShortcutsHelpItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsHelpItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
KeyboardShortcutsHelpItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.7", type: KeyboardShortcutsHelpItemComponent, selector: "ng-keyboard-shortcuts-help-item", inputs: { index: "index", shortcut: "shortcut" }, ngImport: i0, template: "<div class=\"item\" [class.item--odd]=\"index % 2 !== 0\" *ngIf=\"shortcut.description\">\r\n    <div class=\"description\">\r\n        <span>{{shortcut.description}}</span>\r\n    </div>\r\n    <div class=\"keys\">\r\n        <div *ngFor=\"let sKey of parsedKeys;let i = index\" class=\"key__container\">\r\n            <span class=\"key\" *ngFor=\"let key of sKey;\">{{key}}</span>\r\n            <span *ngIf=\"parsedKeys.length > 1 && i < parsedKeys.length - 1\" class=\"separator\"> / </span>\r\n        </div>\r\n    </div>\r\n</div>\r\n", styles: [".key{border:1px solid #CCCCCC;border-radius:4px;padding:5px 12px;margin-right:5px;background-color:#f5f5f5}.key__container{display:inline-block}.separator{margin-right:5px}.keys{float:right}.item{background-color:#ebebeb;padding:12px}.description{min-width:168px;display:inline-block;color:#333}.item--odd{background-color:#fff}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsHelpItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-keyboard-shortcuts-help-item', template: "<div class=\"item\" [class.item--odd]=\"index % 2 !== 0\" *ngIf=\"shortcut.description\">\r\n    <div class=\"description\">\r\n        <span>{{shortcut.description}}</span>\r\n    </div>\r\n    <div class=\"keys\">\r\n        <div *ngFor=\"let sKey of parsedKeys;let i = index\" class=\"key__container\">\r\n            <span class=\"key\" *ngFor=\"let key of sKey;\">{{key}}</span>\r\n            <span *ngIf=\"parsedKeys.length > 1 && i < parsedKeys.length - 1\" class=\"separator\"> / </span>\r\n        </div>\r\n    </div>\r\n</div>\r\n", styles: [".key{border:1px solid #CCCCCC;border-radius:4px;padding:5px 12px;margin-right:5px;background-color:#f5f5f5}.key__container{display:inline-block}.separator{margin-right:5px}.keys{float:right}.item{background-color:#ebebeb;padding:12px}.description{min-width:168px;display:inline-block;color:#333}.item--odd{background-color:#fff}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { index: [{
                type: Input
            }], shortcut: [{
                type: Input
            }] } });

/**
 * @ignore
 */
const scrollAbleKeys = new Map([
    [31, 1],
    [38, 1],
    [39, 1],
    [40, 1]
]);
/**
 * @ignore
 */
const preventDefault = (ignore) => (e) => {
    const modal = e.target.closest(ignore);
    if (modal) {
        return;
    }
    e = e || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.returnValue = false;
};
/**
 * @ignore
 */
const preventDefaultForScrollKeys = (e) => {
    if (!scrollAbleKeys.has(e.keyCode)) {
        return true;
    }
    preventDefault(e);
    return false;
};
/**
 * @ignore
 */
let scrollEvents = [
    { name: "wheel", callback: null },
    { name: "touchmove", callback: null },
    { name: "DOMMouseScroll", callback: null }
];
/**
 * @ignore
 */
const disableScroll = (ignore) => {
    scrollEvents = scrollEvents.map((event) => {
        const callback = preventDefault(ignore);
        window.addEventListener(event.name, callback, { passive: false });
        return Object.assign(Object.assign({}, event), { callback });
    });
    window.addEventListener("keydown", preventDefaultForScrollKeys);
};
/**
 * @ignore
 */
const enableScroll = () => {
    scrollEvents = scrollEvents.map((event) => {
        window.removeEventListener(event.name, event.callback);
        return Object.assign(Object.assign({}, event), { callback: null });
    });
    window.removeEventListener("keydown", preventDefaultForScrollKeys);
};
/**
 * A Component to show all registered shortcut in the app
 * it is shown as a modal
 */
class KeyboardShortcutsHelpComponent {
    /**
     * @ignore
     */
    constructor(componentFactoryResolver, appRef, keyboard, element, keyboardHelp, viewContainer, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.keyboard = keyboard;
        this.element = element;
        this.keyboardHelp = keyboardHelp;
        this.viewContainer = viewContainer;
        this.injector = injector;
        /**
         * Disable scrolling while modal is open
         */
        this.disableScrolling = true;
        this.className = "help-modal";
        /**
         * The title of the help screen
         * @default: "Keyboard shortcuts"
         */
        this.title = "Keyboard shortcuts";
        /**
         * What message to show when no shortcuts are available on the page.
         * @default "No shortcuts available"
         */
        this.emptyMessage = "No shortcuts available";
        /**
         * @ignore
         */
        this.showing = false;
        this.bodyPortalHost = new DomPortalOutlet(document.body, this.componentFactoryResolver, this.appRef, this.injector);
    }
    /**
     * The shortcut to show/hide the help screen
     */
    set key(value) {
        this._key = value;
        if (!value) {
            return;
        }
        if (this.clearIds) {
            this.keyboard.remove(this.clearIds);
        }
        this.clearIds = this.addShortcut({
            key: value,
            preventDefault: true,
            command: () => this.toggle(),
            description: this.keyDescription,
            label: this.keyLabel
        });
    }
    addShortcut(shortcut) {
        return this.keyboard.add(shortcut);
    }
    /**
     * Reveal the help screen manually.
     */
    reveal() {
        this.hide();
        if (this.disableScrolling) {
            disableScroll(`.${this.className}`);
        }
        const portal = new TemplatePortal(this.template, this.viewContainer);
        this.bodyPortalHost.attach(portal);
        this.showing = true;
        return this;
    }
    /**
     * Check if help screen is visible.
     * @returns boolean
     */
    visible() {
        return this.bodyPortalHost.hasAttached();
    }
    /**
     * Hide the help screen manually.
     */
    hide() {
        if (this.disableScrolling) {
            enableScroll();
        }
        if (!this.bodyPortalHost.hasAttached()) {
            return this;
        }
        this.bodyPortalHost.detach();
        this.showing = false;
        return this;
    }
    /**
     * @ignore
     */
    ngOnDestroy() {
        this.hide();
        if (this.clearIds) {
            this.keyboard.remove(this.clearIds);
        }
        if (this.closeKeyIds) {
            this.keyboard.remove(this.closeKeyIds);
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
    /**
     * Show/Hide the help screen manually.
     */
    toggle() {
        this.visible() ? this.hide() : this.reveal();
        return this;
    }
    /**
     * @ignore
     */
    ngOnInit() {
        this.subscription = this.keyboardHelp.shortcuts$
            .pipe(distinctUntilChanged(), map((shortcuts) => groupBy(shortcuts, "label")))
            .subscribe((shortcuts) => {
            this.shortcuts = shortcuts;
            this.labels = Object.keys(shortcuts);
        });
    }
    ngOnChanges(changes) {
        if (!changes["closeKey"].currentValue) {
            return;
        }
        if (this.closeKeyIds) {
            this.keyboard.remove(this.closeKeyIds);
        }
        this.closeKeyIds = this.addShortcut({
            key: changes["closeKey"].currentValue,
            preventDefault: true,
            command: () => this.hide(),
            description: this.closeKeyDescription,
            label: this.closeKeyDescription
        });
    }
}
KeyboardShortcutsHelpComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsHelpComponent, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ApplicationRef }, { token: KeyboardShortcutsService }, { token: i0.ElementRef }, { token: KeyboardShortcutsHelpService }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
KeyboardShortcutsHelpComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.7", type: KeyboardShortcutsHelpComponent, selector: "ng-keyboard-shortcuts-help", inputs: { disableScrolling: "disableScrolling", keyDescription: "keyDescription", keyLabel: "keyLabel", closeKeyLabel: "closeKeyLabel", closeKeyDescription: "closeKeyDescription", key: "key", closeKey: "closeKey", title: "title", emptyMessage: "emptyMessage" }, viewQueries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-template>\r\n    <div class=\"help-modal__container\" [attr.aria-labelledby]=\"'modal-' + title\" role=\"dialog\">\r\n        <div class=\"{{className}}\" [@enterAnimation] *ngIf=\"showing\">\r\n            <div class=\"title\">\r\n                <h3 id=\"modal-{{title}}\" class=\"title__text\">{{title}}</h3>\r\n            </div>\r\n            <div class=\"help-modal__body\">\r\n                <span *ngIf=\"!labels.length\">\r\n                    {{emptyMessage}}\r\n                </span>\r\n                <div>\r\n                    <ul *ngFor=\"let label of labels\" class=\"help-modal__list\">\r\n                        <h4 class=\"item-group-label\">{{label}}</h4>\r\n                        <ng-keyboard-shortcuts-help-item\r\n                                *ngFor=\"let shortcut of shortcuts[label]; let i = index\"\r\n                                [shortcut]=\"shortcut\"\r\n                                [index]=\"i\"\r\n                        ></ng-keyboard-shortcuts-help-item>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"help-modal__backdrop\" [@overlayAnimation] (mousedown)=\"hide()\" *ngIf=\"showing\"></div>\r\n    </div>\r\n</ng-template>\r\n", styles: [".help-modal__container{position:fixed;top:0;right:0;z-index:500;left:0;bottom:0;display:flex;align-items:center;justify-content:center}.help-modal{z-index:2000;min-width:420px;max-height:calc(100% - 100px);overflow:auto;padding:20px;box-shadow:0 11px 15px -7px #0003,0 24px 38px 3px #00000024,0 9px 46px 8px #0000001f;background:#fff}.item-group-label{text-transform:capitalize}.title{padding:20px 0}.title__text{margin:0;padding:0}.help-modal__list{padding:0}.help-modal__backdrop{position:absolute;background:rgba(0,0,0,.27);top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;opacity:1}\n"], components: [{ type: KeyboardShortcutsHelpItemComponent, selector: "ng-keyboard-shortcuts-help-item", inputs: ["index", "shortcut"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], animations: [
        trigger("enterAnimation", [
            transition(":enter", [
                style({ transform: "translateX(-100%)", opacity: 0 }),
                animate("0.33s cubic-bezier(0,0,0.3,1)", style({ transform: "translateX(0)", opacity: 1 }))
            ]),
            transition(":leave", [
                style({ transform: "translateX(0)", opacity: 1 }),
                animate("0.23s cubic-bezier(0,0,0.3,1)", style({ transform: "translateX(-100%)", opacity: 0 }))
            ])
        ]),
        trigger("overlayAnimation", [
            transition(":enter", [
                style({ opacity: 0 }),
                animate("1s cubic-bezier(0,0,0.3,1)", style({ opacity: 1 }))
            ]),
            transition(":leave", [
                style({ opacity: 1 }),
                animate("1s cubic-bezier(0,0,0.3,1)", style({ opacity: 0 }))
            ])
        ])
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsHelpComponent, decorators: [{
            type: Component,
            args: [{ selector: "ng-keyboard-shortcuts-help", animations: [
                        trigger("enterAnimation", [
                            transition(":enter", [
                                style({ transform: "translateX(-100%)", opacity: 0 }),
                                animate("0.33s cubic-bezier(0,0,0.3,1)", style({ transform: "translateX(0)", opacity: 1 }))
                            ]),
                            transition(":leave", [
                                style({ transform: "translateX(0)", opacity: 1 }),
                                animate("0.23s cubic-bezier(0,0,0.3,1)", style({ transform: "translateX(-100%)", opacity: 0 }))
                            ])
                        ]),
                        trigger("overlayAnimation", [
                            transition(":enter", [
                                style({ opacity: 0 }),
                                animate("1s cubic-bezier(0,0,0.3,1)", style({ opacity: 1 }))
                            ]),
                            transition(":leave", [
                                style({ opacity: 1 }),
                                animate("1s cubic-bezier(0,0,0.3,1)", style({ opacity: 0 }))
                            ])
                        ])
                    ], template: "<ng-template>\r\n    <div class=\"help-modal__container\" [attr.aria-labelledby]=\"'modal-' + title\" role=\"dialog\">\r\n        <div class=\"{{className}}\" [@enterAnimation] *ngIf=\"showing\">\r\n            <div class=\"title\">\r\n                <h3 id=\"modal-{{title}}\" class=\"title__text\">{{title}}</h3>\r\n            </div>\r\n            <div class=\"help-modal__body\">\r\n                <span *ngIf=\"!labels.length\">\r\n                    {{emptyMessage}}\r\n                </span>\r\n                <div>\r\n                    <ul *ngFor=\"let label of labels\" class=\"help-modal__list\">\r\n                        <h4 class=\"item-group-label\">{{label}}</h4>\r\n                        <ng-keyboard-shortcuts-help-item\r\n                                *ngFor=\"let shortcut of shortcuts[label]; let i = index\"\r\n                                [shortcut]=\"shortcut\"\r\n                                [index]=\"i\"\r\n                        ></ng-keyboard-shortcuts-help-item>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"help-modal__backdrop\" [@overlayAnimation] (mousedown)=\"hide()\" *ngIf=\"showing\"></div>\r\n    </div>\r\n</ng-template>\r\n", styles: [".help-modal__container{position:fixed;top:0;right:0;z-index:500;left:0;bottom:0;display:flex;align-items:center;justify-content:center}.help-modal{z-index:2000;min-width:420px;max-height:calc(100% - 100px);overflow:auto;padding:20px;box-shadow:0 11px 15px -7px #0003,0 24px 38px 3px #00000024,0 9px 46px 8px #0000001f;background:#fff}.item-group-label{text-transform:capitalize}.title{padding:20px 0}.title__text{margin:0;padding:0}.help-modal__list{padding:0}.help-modal__backdrop{position:absolute;background:rgba(0,0,0,.27);top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;opacity:1}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }, { type: KeyboardShortcutsService }, { type: i0.ElementRef }, { type: KeyboardShortcutsHelpService }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { disableScrolling: [{
                type: Input
            }], keyDescription: [{
                type: Input
            }], keyLabel: [{
                type: Input
            }], closeKeyLabel: [{
                type: Input
            }], closeKeyDescription: [{
                type: Input
            }], key: [{
                type: Input
            }], closeKey: [{
                type: Input
            }], title: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], template: [{
                type: ViewChild,
                args: [TemplateRef]
            }] } });

class KeyboardShortcutsPlugin {
    constructor(ngZone, keyboard) {
        this.ngZone = ngZone;
        this.keyboard = keyboard;
    }
    supports(eventName) {
        return eventName.split('.').includes('shortcut');
    }
    addEventListener(element, eventName, originalHandler) {
        const shortcut = eventName
            .split('.');
        const preventDefault = shortcut.includes("prevent");
        if (shortcut.length === 0) {
            throw new Error("please provide a shortcut");
        }
        const [, key, description, label] = shortcut;
        const id = this.keyboard.add({
            key,
            command(event) {
                originalHandler(event);
            },
            description,
            preventDefault,
            label
        });
        return () => {
            this.keyboard.remove(id);
        };
    }
}
KeyboardShortcutsPlugin.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsPlugin, deps: [{ token: i0.NgZone }, { token: KeyboardShortcutsService }], target: i0.ɵɵFactoryTarget.Injectable });
KeyboardShortcutsPlugin.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsPlugin });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsPlugin, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: KeyboardShortcutsService }]; } });
const KeyboardShortcutsPluginProvider = {
    multi: true,
    provide: EVENT_MANAGER_PLUGINS,
    useClass: KeyboardShortcutsPlugin
};

class KeyboardShortcutComponent {
    constructor(keyboard) {
        this.keyboard = keyboard;
        this.fire = new EventEmitter();
    }
    ngOnDestroy() {
        this.keyboard.remove(this.clearId);
    }
    ngOnChanges(changes) {
    }
    ngAfterViewInit() {
        this.clearId = this.keyboard.add({
            description: this.description,
            label: this.label,
            preventDefault: this.preventDefault,
            allowIn: this.allowIn,
            target: this.target,
            key: this.key,
            throttleTime: this.throttleTime,
            command: (event) => {
                this.fire.emit(event);
            }
        });
    }
}
KeyboardShortcutComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutComponent, deps: [{ token: KeyboardShortcutsService }], target: i0.ɵɵFactoryTarget.Component });
KeyboardShortcutComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.7", type: KeyboardShortcutComponent, selector: "ng-keyboard-shortcut", inputs: { description: "description", label: "label", preventDefault: "preventDefault", allowIn: "allowIn", key: "key", target: "target", throttleTime: "throttleTime" }, outputs: { fire: "fire" }, usesOnChanges: true, ngImport: i0, template: "<ng-content ></ng-content>", isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "ng-keyboard-shortcut",
                    template: "<ng-content ></ng-content>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: KeyboardShortcutsService }]; }, propDecorators: { description: [{
                type: Input
            }], label: [{
                type: Input
            }], preventDefault: [{
                type: Input
            }], allowIn: [{
                type: Input
            }], key: [{
                type: Input
            }], target: [{
                type: Input
            }], throttleTime: [{
                type: Input
            }], fire: [{
                type: Output
            }] } });

class KeyboardShortcutsModule {
    static forRoot() {
        return {
            ngModule: KeyboardShortcutsModule,
            providers: [
                KeyboardShortcutsService,
                KeyboardShortcutsHelpService,
                KeyboardShortcutsSelectService,
                KeyboardShortcutsPluginProvider
            ]
        };
    }
}
KeyboardShortcutsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
KeyboardShortcutsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsModule, declarations: [KeyboardShortcutsComponent,
        KeyboardShortcutsDirective,
        KeyboardShortcutsHelpComponent,
        KeyboardShortcutsHelpItemComponent,
        KeyboardShortcutComponent], imports: [CommonModule], exports: [KeyboardShortcutsComponent,
        KeyboardShortcutsDirective,
        KeyboardShortcutsHelpComponent,
        KeyboardShortcutComponent] });
KeyboardShortcutsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    entryComponents: [KeyboardShortcutsHelpComponent],
                    declarations: [
                        KeyboardShortcutsComponent,
                        KeyboardShortcutsDirective,
                        KeyboardShortcutsHelpComponent,
                        KeyboardShortcutsHelpItemComponent,
                        KeyboardShortcutComponent
                    ],
                    exports: [
                        KeyboardShortcutsComponent,
                        KeyboardShortcutsDirective,
                        KeyboardShortcutsHelpComponent,
                        KeyboardShortcutComponent
                    ]
                }]
        }] });

(function () {
    if (typeof Element === 'undefined') {
        return;
    }
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (s) {
            let el = this;
            do {
                if (el.matches(s)) {
                    return el;
                }
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }
})();
if (!Array.prototype.flat) {
    Array.prototype.flat = function (depth) {
        var flattend = [];
        (function flat(array, depth) {
            for (let el of array) {
                if (Array.isArray(el) && depth > 0) {
                    flat(el, depth - 1);
                }
                else {
                    flattend.push(el);
                }
            }
        })(this, Math.floor(depth) || 1);
        return flattend;
    };
}
if (!Array.prototype.flatMap) {
    Array.prototype.flatMap = function () {
        return Array.prototype.map.apply(this, arguments).flat(1);
    };
}

/*
 * Public API Surface of ng-keyboard-shortcuts
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AllowIn, KeyboardShortcutComponent, KeyboardShortcutsComponent, KeyboardShortcutsDirective, KeyboardShortcutsHelpComponent, KeyboardShortcutsHelpService, KeyboardShortcutsModule, KeyboardShortcutsPluginProvider, KeyboardShortcutsSelectService };
//# sourceMappingURL=ng-keyboard-shortcuts.mjs.map
