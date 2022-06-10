import { Inject, Injectable } from "@angular/core";
import { _INVERTED_SHIFT_MAP, _KEYCODE_MAP, _MAP, _SHIFT_MAP, _SPECIAL_CASES, modifiers } from "./keys";
import { BehaviorSubject, fromEvent, of, Subject, throwError, timer } from "rxjs";
import { AllowIn } from "./ng-keyboard-shortcuts.interfaces";
import { catchError, filter, first, map, repeat, scan, switchMap, takeUntil, tap, throttle } from "rxjs/operators";
import { allPass, any, difference, identity, isFunction, isNill, maxArrayProp } from "./utils";
import { DOCUMENT } from "@angular/common";
import * as i0 from "@angular/core";
/**
 * @ignore
 * @type {number}
 */
let guid = 0;
export class KeyboardShortcutsService {
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
                return {
                    ...sequence,
                    sequence: sequences,
                    partialMatch,
                    event: event,
                    fullMatch: partialMatch &&
                        this.isFullMatch({ command: sequence, events: acc.events })
                };
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
            return {
                ...command,
                isSequence,
                sequence: isSequence ? sequence : [],
                allowIn: command.allowIn || [],
                key: keys,
                id: `${guid++}`,
                throttle: isNill(command.throttleTime) ? this.throttleTime : command.throttleTime,
                priority: priority,
                predicates: predicates
            };
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
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcta2V5Ym9hcmQtc2hvcnRjdXRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL25nLWtleWJvYXJkLXNob3J0Y3V0cy9zcmMvbGliL25nLWtleWJvYXJkLXNob3J0Y3V0cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsWUFBWSxFQUNaLElBQUksRUFDSixVQUFVLEVBQ1YsY0FBYyxFQUNkLFNBQVMsRUFDWixNQUFNLFFBQVEsQ0FBQztBQUNoQixPQUFPLEVBQ0gsZUFBZSxFQUdmLFNBQVMsRUFHVCxFQUFFLEVBRUYsT0FBTyxFQUVQLFVBQVUsRUFDVixLQUFLLEVBRVIsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQ0gsT0FBTyxFQUlWLE1BQU0sb0NBQW9DLENBQUM7QUFDNUMsT0FBTyxFQUNILFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLEdBQUcsRUFDSCxNQUFNLEVBQ04sSUFBSSxFQUNKLFNBQVMsRUFDVCxTQUFTLEVBQ1QsR0FBRyxFQUNILFFBQVEsRUFDWCxNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDL0YsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUUzQzs7O0dBR0c7QUFDSCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7QUFLYixNQUFNLE9BQU8sd0JBQXdCO0lBeVJqQzs7T0FFRztJQUNILFlBQXNDLFFBQWE7UUFBYixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBM1JuRDs7O1dBR0c7UUFDSyxlQUFVLEdBQXFCLEVBQUUs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QUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDcEMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRTtnQkFDOUIsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsRUFBRSxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUU7Z0JBQ2YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZO2dCQUNqRixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsVUFBVSxFQUFFLFVBQVU7YUFDUCxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUF2ZEQ7Ozs7R0FJRztBQUNxQix5Q0FBZ0IsR0FBRyxJQUFLLENBQUE7cUhBOUJ2Qyx3QkFBd0Isa0JBNFJiLFFBQVE7eUhBNVJuQix3QkFBd0IsY0FGckIsTUFBTTsyRkFFVCx3QkFBd0I7a0JBSHBDLFVBQVU7bUJBQUM7b0JBQ1IsVUFBVSxFQUFFLE1BQU07aUJBQ3JCOzswQkE2UmdCLE1BQU07MkJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtcclxuICAgIF9JTlZFUlRFRF9TSElGVF9NQVAsXHJcbiAgICBfS0VZQ09ERV9NQVAsXHJcbiAgICBfTUFQLFxyXG4gICAgX1NISUZUX01BUCxcclxuICAgIF9TUEVDSUFMX0NBU0VTLFxyXG4gICAgbW9kaWZpZXJzXHJcbn0gZnJvbSBcIi4va2V5c1wiO1xyXG5pbXBvcnQge1xyXG4gICAgQmVoYXZpb3JTdWJqZWN0LFxyXG4gICAgY29tYmluZUxhdGVzdCxcclxuICAgIGNvbmNhdE1hcCxcclxuICAgIGZyb21FdmVudCxcclxuICAgIG1lcmdlTWFwLFxyXG4gICAgT2JzZXJ2YWJsZSxcclxuICAgIG9mLFxyXG4gICAgc2hhcmVSZXBsYXksXHJcbiAgICBTdWJqZWN0LFxyXG4gICAgU3Vic2NyaXB0aW9uLFxyXG4gICAgdGhyb3dFcnJvcixcclxuICAgIHRpbWVyLFxyXG4gICAgemlwXHJcbn0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHtcclxuICAgIEFsbG93SW4sXHJcbiAgICBQYXJzZWRTaG9ydGN1dCxcclxuICAgIFNob3J0Y3V0RXZlbnRPdXRwdXQsXHJcbiAgICBTaG9ydGN1dElucHV0XHJcbn0gZnJvbSBcIi4vbmcta2V5Ym9hcmQtc2hvcnRjdXRzLmludGVyZmFjZXNcIjtcclxuaW1wb3J0IHtcclxuICAgIGNhdGNoRXJyb3IsXHJcbiAgICBmaWx0ZXIsXHJcbiAgICBmaXJzdCxcclxuICAgIG1hcCxcclxuICAgIHJlcGVhdCxcclxuICAgIHNjYW4sXHJcbiAgICBzd2l0Y2hNYXAsXHJcbiAgICB0YWtlVW50aWwsXHJcbiAgICB0YXAsXHJcbiAgICB0aHJvdHRsZVxyXG59IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5pbXBvcnQgeyBhbGxQYXNzLCBhbnksIGRpZmZlcmVuY2UsIGlkZW50aXR5LCBpc0Z1bmN0aW9uLCBpc05pbGwsIG1heEFycmF5UHJvcCB9IGZyb20gXCIuL3V0aWxzXCI7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmxldCBndWlkID0gMDtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46IFwicm9vdFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBLZXlib2FyZFNob3J0Y3V0c1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZWQgc2hvcnRjdXRzXHJcbiAgICAgKiBmb3IgZWFjaCBrZXkgY3JlYXRlIGEgcHJlZGljYXRlIGZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3Nob3J0Y3V0czogUGFyc2VkU2hvcnRjdXRbXSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgX3NlcXVlbmNlczogUGFyc2VkU2hvcnRjdXRbXSA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhyb3R0bGUgdGhlIGtleXByZXNzIGV2ZW50LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRocm90dGxlVGltZSA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfcHJlc3NlZCA9IG5ldyBTdWJqZWN0PFNob3J0Y3V0RXZlbnRPdXRwdXQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdHJlYW1zIG9mIHByZXNzZWQgZXZlbnRzLCBjYW4gYmUgdXNlZCBpbnN0ZWFkIG9yIHdpdGggYSBjb21tYW5kLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcHJlc3NlZCQgPSB0aGlzLl9wcmVzc2VkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzYWJsZSBhbGwga2V5Ym9hcmQgc2hvcnRjdXRzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICogMjAwMCBtcyB3aW5kb3cgdG8gYWxsb3cgYmV0d2VlbiBrZXkgc2VxdWVuY2VzIG90aGVyd2lzZVxyXG4gICAgICogdGhlIHNlcXVlbmNlIHdpbGwgcmVzZXQuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFRJTUVPVVRfU0VRVUVOQ0UgPSAxMDAwO1xyXG5cclxuICAgIHByaXZhdGUgX3Nob3J0Y3V0c1N1YiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFyc2VkU2hvcnRjdXRbXT4oW10pO1xyXG4gICAgcHVibGljIHNob3J0Y3V0cyQgPSB0aGlzLl9zaG9ydGN1dHNTdWJcclxuICAgICAgICAucGlwZShmaWx0ZXIoKHNob3J0Y3V0cykgPT4gISFzaG9ydGN1dHMubGVuZ3RoKSk7XHJcblxyXG4gICAgcHJpdmF0ZSBfaWdub3JlZCA9IFtBbGxvd0luLklucHV0LCBBbGxvd0luLlRleHRhcmVhLCBBbGxvd0luLlNlbGVjdCwgQWxsb3dJbi5Db250ZW50RWRpdGFibGVdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICogQHBhcmFtIHNob3J0Y3V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNBbGxvd2VkID0gKHNob3J0Y3V0OiBQYXJzZWRTaG9ydGN1dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHNob3J0Y3V0LmV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBjb25zdCBpc0NvbnRlbnRFZGl0YWJsZSA9ICEhdGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbnRlbnRlZGl0YWJsZVwiKTtcclxuICAgICAgICBjb25zdCBub2RlTmFtZSA9IGlzQ29udGVudEVkaXRhYmxlID8gQWxsb3dJbi5Db250ZW50RWRpdGFibGUgOiB0YXJnZXQubm9kZU5hbWU7XHJcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gc2hvcnRjdXQudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiAoc2hvcnRjdXQuYWxsb3dJbi5pbmNsdWRlcyhBbGxvd0luLkNvbnRlbnRFZGl0YWJsZSkpIHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuICEhdGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbnRlbnRlZGl0YWJsZVwiKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgaWYgKHNob3J0Y3V0LmFsbG93SW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhZGlmZmVyZW5jZSh0aGlzLl9pZ25vcmVkLCBzaG9ydGN1dC5hbGxvd0luKS5pbmNsdWRlcyhub2RlTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0NvbnRlbnRFZGl0YWJsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAhdGhpcy5faWdub3JlZC5pbmNsdWRlcyh0YXJnZXQubm9kZU5hbWUgYXMgQWxsb3dJbik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICogQHBhcmFtIGV2ZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbWFwRXZlbnQgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hvcnRjdXRzXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKHNob3J0Y3V0KSA9PiAhc2hvcnRjdXQuaXNTZXF1ZW5jZSlcclxuICAgICAgICAgICAgLm1hcCgoc2hvcnRjdXQpID0+XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBzaG9ydGN1dCwge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZWRpY2F0ZXM6IGFueShcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3J0Y3V0LnByZWRpY2F0ZXMubWFwKChwcmVkaWNhdGVzOiBhbnkpID0+IGFsbFBhc3MocHJlZGljYXRlcykoZXZlbnQpKVxyXG4gICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKHNob3J0Y3V0KSA9PiBzaG9ydGN1dC5wcmVkaWNhdGVzKVxyXG4gICAgICAgICAgICAucmVkdWNlKChhY2MsIHNob3J0Y3V0KSA9PiAoYWNjLnByaW9yaXR5ID4gc2hvcnRjdXQucHJpb3JpdHkgPyBhY2MgOiBzaG9ydGN1dCksIHtcclxuICAgICAgICAgICAgICAgIHByaW9yaXR5OiAwXHJcbiAgICAgICAgICAgIH0gYXMgUGFyc2VkU2hvcnRjdXQpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpZ25vcmVcclxuICAgICAqIFN1YnNjcmlwdGlvbiBmb3Igb24gZGVzdHJveS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUga2V5ZG93biQ6IE9ic2VydmFibGU8S2V5Ym9hcmRFdmVudD4gPSBmcm9tRXZlbnQodGhpcy5kb2N1bWVudCwgXCJrZXlkb3duXCIpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBmaXhlcyBmb3IgZmlyZWZveCBwcmV2ZW50IGRlZmF1bHRcclxuICAgICAqIG9uIGNsaWNrIGV2ZW50IG9uIGJ1dHRvbiBmb2N1czpcclxuICAgICAqIHNlZSBpc3N1ZTpcclxuICAgICAqIGtlZXBpbmcgdGhpcyBoZXJlIGZvciBub3csIGJ1dCBpdCBpcyBjb21tZW50ZWQgb3V0XHJcbiAgICAgKiBGaXJlZm94IHJlZmVyZW5jZSBidWc6XHJcbiAgICAgKiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDg3MTAyXHJcbiAgICAgKiBhbmQgbXkgcmVwbzpcclxuICAgICAqXHJcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vb21yaWRldmsvbmcta2V5Ym9hcmQtc2hvcnRjdXRzL2lzc3Vlcy8zNVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlnbm9yZSQgPSB0aGlzLnByZXNzZWQkLnBpcGUoXHJcbiAgICAgICAgZmlsdGVyKChlKSA9PiBlLmV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpLFxyXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmNsaWNrcyQucGlwZShmaXJzdCgpKSksXHJcbiAgICAgICAgdGFwKChlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHJlcGVhdCgpXHJcbiAgICApO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xpY2tzJCA9IGZyb21FdmVudCh0aGlzLmRvY3VtZW50LCBcImNsaWNrXCIsIHsgY2FwdHVyZTogdHJ1ZSB9KTtcclxuXHJcbiAgICBwcml2YXRlIGtleXVwJCA9IGZyb21FdmVudCh0aGlzLmRvY3VtZW50LCBcImtleXVwXCIpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGtleWRvd25Db21ibyQgPSB0aGlzLmtleWRvd24kLnBpcGUoXHJcbiAgICAgICAgZmlsdGVyKChfKSA9PiAhdGhpcy5kaXNhYmxlZCksXHJcbiAgICAgICAgbWFwKHRoaXMubWFwRXZlbnQpLFxyXG4gICAgICAgIGZpbHRlcihcclxuICAgICAgICAgICAgKHNob3J0Y3V0OiBQYXJzZWRTaG9ydGN1dCkgPT5cclxuICAgICAgICAgICAgICAgICFzaG9ydGN1dC50YXJnZXQgfHwgc2hvcnRjdXQuZXZlbnQudGFyZ2V0ID09PSBzaG9ydGN1dC50YXJnZXRcclxuICAgICAgICApLFxyXG4gICAgICAgIGZpbHRlcigoc2hvcnRjdXQ6IFBhcnNlZFNob3J0Y3V0KSA9PiBpc0Z1bmN0aW9uKHNob3J0Y3V0LmNvbW1hbmQpKSxcclxuICAgICAgICBmaWx0ZXIoKHNob3J0Y3V0KSA9PiB0aGlzLmlzQWxsb3dlZChzaG9ydGN1dCkpLFxyXG4gICAgICAgIHRhcCgoc2hvcnRjdXQpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFzaG9ydGN1dC5wcmV2ZW50RGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNob3J0Y3V0LmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHNob3J0Y3V0LmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHRocm90dGxlKChzaG9ydGN1dCkgPT4gdGltZXIoc2hvcnRjdXQudGhyb3R0bGVUaW1lKSksXHJcbiAgICAgICAgdGFwKChzaG9ydGN1dCkgPT4gc2hvcnRjdXQuY29tbWFuZCh7IGV2ZW50OiBzaG9ydGN1dC5ldmVudCwga2V5OiBzaG9ydGN1dC5rZXkgfSkpLFxyXG4gICAgICAgIHRhcCgoc2hvcnRjdXQpID0+IHRoaXMuX3ByZXNzZWQubmV4dCh7IGV2ZW50OiBzaG9ydGN1dC5ldmVudCwga2V5OiBzaG9ydGN1dC5rZXkgfSkpLFxyXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmtleXVwJCksXHJcbiAgICAgICAgcmVwZWF0KCksXHJcbiAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHRocm93RXJyb3IoZXJyb3IpKVxyXG4gICAgKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpZ25vcmVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0aW1lciQgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVzZXRDb3VudGVyJCA9IHRoaXMudGltZXIkXHJcbiAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXHJcbiAgICAgICAgLnBpcGUoc3dpdGNoTWFwKCgpID0+IHRpbWVyKEtleWJvYXJkU2hvcnRjdXRzU2VydmljZS5USU1FT1VUX1NFUVVFTkNFKSkpO1xyXG5cclxuICAgIHByaXZhdGUga2V5ZG93blNlcXVlbmNlJCA9IHRoaXMua2V5ZG93biQucGlwZShcclxuICAgICAgICBtYXAoKGV2ZW50KSA9PiAoe1xyXG4gICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgc2VxdWVuY2VzOiB0aGlzLl9zZXF1ZW5jZXNcclxuICAgICAgICB9KSksXHJcbiAgICAgICAgc2NhbihcclxuICAgICAgICAgICAgKGFjYzogeyBldmVudHM6IGFueVtdOyBjb21tYW5kPzogYW55OyBzZXF1ZW5jZXM6IGFueVtdIH0sIGFyZzogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGV2ZW50IH0gPSBhcmc7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50TGVuZ3RoID0gYWNjLmV2ZW50cy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZXF1ZW5jZXMgPSBjdXJyZW50TGVuZ3RoID8gYWNjLnNlcXVlbmNlcyA6IGFyZy5zZXF1ZW5jZXM7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBbY2hhcmFjdGVyc10gPSB0aGlzLmNoYXJhY3RlckZyb21FdmVudChldmVudCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhbGxDaGFycyA9IEFycmF5LmlzQXJyYXkoY2hhcmFjdGVycylcclxuICAgICAgICAgICAgICAgICAgICA/IFsuLi5jaGFyYWN0ZXJzLCBldmVudC5rZXldXHJcbiAgICAgICAgICAgICAgICAgICAgOiBbY2hhcmFjdGVycywgZXZlbnQua2V5XTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHNlcXVlbmNlc1xyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHNlcXVlbmNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlcXVlbmNlcyA9IHNlcXVlbmNlLnNlcXVlbmNlLmZpbHRlcigoc2VxdWUpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxDaGFycy5zb21lKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXkpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChfU1BFQ0lBTF9DQVNFU1tzZXF1ZVtjdXJyZW50TGVuZ3RoXV0gfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcXVlW2N1cnJlbnRMZW5ndGhdKSA9PT0ga2V5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnRpYWxNYXRjaCA9IHNlcXVlbmNlcy5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VxdWVuY2UuZnVsbE1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VxdWVuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnNlcXVlbmNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2U6IHNlcXVlbmNlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpYWxNYXRjaCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxNYXRjaDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWFsTWF0Y2ggJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRnVsbE1hdGNoKHsgY29tbWFuZDogc2VxdWVuY2UsIGV2ZW50czogYWNjLmV2ZW50cyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoc2VxdWVuY2VzKSA9PiBzZXF1ZW5jZXMucGFydGlhbE1hdGNoIHx8IHNlcXVlbmNlcy5mdWxsTWF0Y2gpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IFttYXRjaF0gPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW1hdGNoIHx8IHRoaXMubW9kaWZpZXJzT24oZXZlbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZXZlbnRzOiBbXSwgc2VxdWVuY2VzOiB0aGlzLl9zZXF1ZW5jZXMgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgKiBoYW5kbGUgY2FzZSBvZiBcIj9cIiBzZXF1ZW5jZSBhbmQgXCI/IGFcIiBzZXF1ZW5jZVxyXG4gICAgICAgICAgICAgICAgICogbmVlZCB0byBkZXRlcm1pbmUgd2hpY2ggb25lIHRvIHRyaWdnZXIuXHJcbiAgICAgICAgICAgICAgICAgKiBpZiBib3RoIG1hdGNoLCB3ZSBwaWNrIHRoZSBsb25nZXIgb25lICg/IGEpIGluIHRoaXMgY2FzZS5cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZ3Vlc3MgPSBtYXhBcnJheVByb3AoXCJwcmlvcml0eVwiLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAxICYmIGd1ZXNzLmZ1bGxNYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGV2ZW50czogW10sIGNvbW1hbmQ6IGd1ZXNzLCBzZXF1ZW5jZXM6IHRoaXMuX3NlcXVlbmNlcyB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzOiBbLi4uYWNjLmV2ZW50cywgZXZlbnRdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlczogcmVzdWx0XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaC5mdWxsTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBldmVudHM6IFtdLCBjb21tYW5kOiBtYXRjaCwgc2VxdWVuY2VzOiB0aGlzLl9zZXF1ZW5jZXMgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzOiBbLi4uYWNjLmV2ZW50cywgZXZlbnRdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IHJlc3VsdCxcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZXM6IHJlc3VsdFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgeyBldmVudHM6IFtdLCBzZXF1ZW5jZXM6IFtdIH1cclxuICAgICAgICApLFxyXG4gICAgICAgIHN3aXRjaE1hcCgoeyBjb21tYW5kIH0pID0+IHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29tbWFuZCkpIHtcclxuICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgKiBBZGQgYSB0aW1lciB0byBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgZm9yIGV4YW1wbGU6XHJcbiAgICAgICAgICAgICAgICAgKiBhIHNlcXVlbmNlIFwiP1wiIGlzIHJlZ2lzdGVyZWQgYW5kIFwiPyBhXCIgaXMgcmVnaXN0ZXJlZCBhcyB3ZWxsXHJcbiAgICAgICAgICAgICAgICAgKiBpZiB0aGUgdXNlciBkb2VzIG5vdCBoaXQgYW55IGtleSBmb3IgNTAwbXMsIHRoZSBzaW5nbGUgc2VxdWVuY2Ugd2lsbCB0cmlnZ2VyXHJcbiAgICAgICAgICAgICAgICAgKiBpZiBhbnkga2V5ZG93biBldmVudCBvY2N1ciwgdGhpcyB0aW1lciB3aWxsIHJlc2V0LCBnaXZlbiBhIGNoYW5jZSB0byBjb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgICogdGhlIGZ1bGwgc2VxdWVuY2UgKD8gYSkgaW4gdGhpcyBjYXNlLlxyXG4gICAgICAgICAgICAgICAgICogVGhpcyBkZWxheSBvbmx5IG9jY3VycyB3aGVuIHNpbmdsZSBrZXkgc2VxdWVuY2UgaXMgdGhlIGJlZ2lubmluZyBvZiBhbm90aGVyIHNlcXVlbmNlLlxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZXIoNTAwKS5waXBlKFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcCgoKSA9PiAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBjb21tYW5kLmZpbHRlcigoY29tbWFuZCkgPT4gY29tbWFuZC5mdWxsTWF0Y2gpWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvZih7IGNvbW1hbmQgfSk7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMucHJlc3NlZCQpLFxyXG4gICAgICAgIGZpbHRlcigoeyBjb21tYW5kIH0pID0+IGNvbW1hbmQgJiYgY29tbWFuZC5mdWxsTWF0Y2gpLFxyXG4gICAgICAgIG1hcCgoeyBjb21tYW5kIH0pID0+IGNvbW1hbmQpLFxyXG4gICAgICAgIGZpbHRlcigoc2hvcnRjdXQ6IFBhcnNlZFNob3J0Y3V0KSA9PiBpc0Z1bmN0aW9uKHNob3J0Y3V0LmNvbW1hbmQpKSxcclxuICAgICAgICBmaWx0ZXIoXHJcbiAgICAgICAgICAgIChzaG9ydGN1dDogUGFyc2VkU2hvcnRjdXQpID0+XHJcbiAgICAgICAgICAgICAgICAhc2hvcnRjdXQudGFyZ2V0IHx8IHNob3J0Y3V0LmV2ZW50LnRhcmdldCA9PT0gc2hvcnRjdXQudGFyZ2V0XHJcbiAgICAgICAgKSxcclxuICAgICAgICBmaWx0ZXIodGhpcy5pc0FsbG93ZWQpLFxyXG4gICAgICAgIHRhcCgoc2hvcnRjdXQpID0+ICFzaG9ydGN1dC5wcmV2ZW50RGVmYXVsdCB8fCBzaG9ydGN1dC5ldmVudC5wcmV2ZW50RGVmYXVsdCgpKSxcclxuICAgICAgICB0aHJvdHRsZSgoc2hvcnRjdXQpID0+IHRpbWVyKHNob3J0Y3V0LnRocm90dGxlVGltZSkpLFxyXG4gICAgICAgIHRhcCgoc2hvcnRjdXQpID0+IHNob3J0Y3V0LmNvbW1hbmQoeyBldmVudDogc2hvcnRjdXQuZXZlbnQsIGtleTogc2hvcnRjdXQua2V5IH0pKSxcclxuICAgICAgICB0YXAoKHNob3J0Y3V0KSA9PiB0aGlzLl9wcmVzc2VkLm5leHQoeyBldmVudDogc2hvcnRjdXQuZXZlbnQsIGtleTogc2hvcnRjdXQua2V5IH0pKSxcclxuICAgICAgICB0YWtlVW50aWwodGhpcy5yZXNldENvdW50ZXIkKSxcclxuICAgICAgICByZXBlYXQoKVxyXG4gICAgKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpZ25vcmVcclxuICAgICAqIEBwYXJhbSBjb21tYW5kXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNGdWxsTWF0Y2goeyBjb21tYW5kLCBldmVudHMgfSkge1xyXG4gICAgICAgIGlmICghY29tbWFuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb21tYW5kLnNlcXVlbmNlLnNvbWUoKHNlcXVlbmNlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXF1ZW5jZS5sZW5ndGggPT09IGV2ZW50cy5sZW5ndGggKyAxO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCBzaG9ydGN1dHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3J0Y3V0cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpZ25vcmVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgICAgICAgIHRoaXMua2V5ZG93blNlcXVlbmNlJC5zdWJzY3JpYmUoKSxcclxuICAgICAgICAgICAgdGhpcy5rZXlkb3duQ29tYm8kLnN1YnNjcmliZSgpXHJcbiAgICAgICAgICAgIC8vIHRoaXMuaWdub3JlJC5zdWJzY3JpYmUoKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfY2hhcmFjdGVyRnJvbUV2ZW50KGV2ZW50KTogW3N0cmluZywgYm9vbGVhbl0ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQud2hpY2ggIT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgZXZlbnQud2hpY2ggPSBldmVudC5rZXlDb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoX1NQRUNJQUxfQ0FTRVNbZXZlbnQud2hpY2hdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbX1NQRUNJQUxfQ0FTRVNbZXZlbnQud2hpY2hdLCBldmVudC5zaGlmdEtleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChfTUFQW2V2ZW50LndoaWNoXSkge1xyXG4gICAgICAgICAgICAvLyBmb3Igbm9uIGtleXByZXNzIGV2ZW50cyB0aGUgc3BlY2lhbCBtYXBzIGFyZSBuZWVkZWRcclxuICAgICAgICAgICAgcmV0dXJuIFtfTUFQW2V2ZW50LndoaWNoXSwgZXZlbnQuc2hpZnRLZXldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKF9LRVlDT0RFX01BUFtldmVudC53aGljaF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtfS0VZQ09ERV9NQVBbZXZlbnQud2hpY2hdLCBldmVudC5zaGlmdEtleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGluIGNhc2UgZXZlbnQga2V5IGlzIGxvd2VyIGNhc2UgYnV0IHJlZ2lzdGVyZWQga2V5IGlzIHVwcGVyIGNhc2VcclxuICAgICAgICAvLyByZXR1cm4gaXQgaW4gdGhlIGxvd2VyIGNhc2VcclxuICAgICAgICBpZiAoU3RyaW5nLmZyb21DaGFyQ29kZShldmVudC53aGljaCkudG9Mb3dlckNhc2UoKSAhPT0gZXZlbnQua2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbU3RyaW5nLmZyb21DaGFyQ29kZShldmVudC53aGljaCkudG9Mb3dlckNhc2UoKSwgZXZlbnQuc2hpZnRLZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW2V2ZW50LmtleSwgZXZlbnQuc2hpZnRLZXldO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hhcmFjdGVyRnJvbUV2ZW50KGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgW2tleSwgc2hpZnRLZXldID0gdGhpcy5fY2hhcmFjdGVyRnJvbUV2ZW50KGV2ZW50KTtcclxuICAgICAgICBpZiAoc2hpZnRLZXkgJiYgX1NISUZUX01BUFtrZXldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbX1NISUZUX01BUFtrZXldLCBzaGlmdEtleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBba2V5LCBzaGlmdEtleV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKiBSZW1vdmUgc3Vic2NyaXB0aW9uLlxyXG4gICAgICovXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3ViKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKiBAcGFyYW0gc2hvcnRjdXRzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNTZXF1ZW5jZShzaG9ydGN1dHM6IHN0cmluZ1tdKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICFzaG9ydGN1dHMuc29tZSgoc2hvcnRjdXQpID0+IHNob3J0Y3V0LmluY2x1ZGVzKFwiK1wiKSB8fCBzaG9ydGN1dC5sZW5ndGggPT09IDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIG5ldyBzaG9ydGN1dC9zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGQoc2hvcnRjdXRzOiBTaG9ydGN1dElucHV0W10gfCBTaG9ydGN1dElucHV0KTogc3RyaW5nW10ge1xyXG4gICAgICAgIHNob3J0Y3V0cyA9IEFycmF5LmlzQXJyYXkoc2hvcnRjdXRzKSA/IHNob3J0Y3V0cyA6IFtzaG9ydGN1dHNdO1xyXG4gICAgICAgIGNvbnN0IGNvbW1hbmRzID0gdGhpcy5wYXJzZUNvbW1hbmQoc2hvcnRjdXRzKTtcclxuICAgICAgICBjb21tYW5kcy5mb3JFYWNoKChjb21tYW5kKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjb21tYW5kLmlzU2VxdWVuY2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlcXVlbmNlcy5wdXNoKGNvbW1hbmQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0Y3V0cy5wdXNoKGNvbW1hbmQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG9ydGN1dHNTdWIubmV4dChbLi4udGhpcy5fc2hvcnRjdXRzLCAuLi50aGlzLl9zZXF1ZW5jZXNdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gY29tbWFuZHMubWFwKChjb21tYW5kKSA9PiBjb21tYW5kLmlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBhIGNvbW1hbmQgYmFzZWQgb24ga2V5IG9yIGFycmF5IG9mIGtleXMuXHJcbiAgICAgKiBjYW4gYmUgdXNlZCBmb3IgY2xlYW51cC5cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAcGFyYW0gaWRzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmUoaWRzOiBzdHJpbmcgfCBzdHJpbmdbXSk6IEtleWJvYXJkU2hvcnRjdXRzU2VydmljZSB7XHJcbiAgICAgICAgaWRzID0gQXJyYXkuaXNBcnJheShpZHMpID8gaWRzIDogW2lkc107XHJcbiAgICAgICAgdGhpcy5fc2hvcnRjdXRzID0gdGhpcy5fc2hvcnRjdXRzLmZpbHRlcigoc2hvcnRjdXQpID0+ICFpZHMuaW5jbHVkZXMoc2hvcnRjdXQuaWQpKTtcclxuICAgICAgICB0aGlzLl9zZXF1ZW5jZXMgPSB0aGlzLl9zZXF1ZW5jZXMuZmlsdGVyKChzaG9ydGN1dCkgPT4gIWlkcy5pbmNsdWRlcyhzaG9ydGN1dC5pZCkpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG9ydGN1dHNTdWIubmV4dChbLi4udGhpcy5fc2hvcnRjdXRzLCAuLi50aGlzLl9zZXF1ZW5jZXNdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYW4gb2JzZXJ2YWJsZSBvZiBrZXlib2FyZCBzaG9ydGN1dCBmaWx0ZXJlZCBieSBhIHNwZWNpZmljIGtleS5cclxuICAgICAqIEBwYXJhbSBrZXkgLSB0aGUga2V5IHRvIGZpbHRlciB0aGUgb2JzZXJ2YWJsZSBieS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlbGVjdChrZXk6IHN0cmluZyk6IE9ic2VydmFibGU8U2hvcnRjdXRFdmVudE91dHB1dD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByZXNzZWQkLnBpcGUoXHJcbiAgICAgICAgICAgIGZpbHRlcigoeyBldmVudCwga2V5OiBldmVudEtleXMgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRLZXlzID0gQXJyYXkuaXNBcnJheShldmVudEtleXMpID8gZXZlbnRLZXlzIDogW2V2ZW50S2V5c107XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISFldmVudEtleXMuZmluZCgoZXZlbnRLZXkpID0+IGV2ZW50S2V5ID09PSBrZXkpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKiB0cmFuc2Zvcm1zIGEgc2hvcnRjdXQgdG86XHJcbiAgICAgKiBhIHByZWRpY2F0ZSBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEtleXMgPSAoa2V5czogc3RyaW5nW10pID0+IHtcclxuICAgICAgICByZXR1cm4ga2V5c1xyXG4gICAgICAgICAgICAubWFwKChrZXkpID0+IGtleS50cmltKCkpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKGtleSkgPT4ga2V5ICE9PSBcIitcIilcclxuICAgICAgICAgICAgLm1hcCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgbW9kaWZpZXJzIGxpa2UgY29udHJvbCBrZXlcclxuICAgICAgICAgICAgICAgIC8vIGxvb2sgZm9yIGV2ZW50WydjdHJsS2V5J11cclxuICAgICAgICAgICAgICAgIC8vIG90aGVyd2lzZSB1c2UgdGhlIGtleUNvZGVcclxuICAgICAgICAgICAgICAgIGtleSA9IF9TUEVDSUFMX0NBU0VTW2tleV0gfHwga2V5O1xyXG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vZGlmaWVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFldmVudFttb2RpZmllcnNba2V5XV07XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNVcHBlciA9IGtleSA9PT0ga2V5LnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNOb25BbHBoYSA9IC9bXmEtekEtWlxcZFxcczpdLy50ZXN0KGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5TaGlmdE1hcCA9IF9JTlZFUlRFRF9TSElGVF9NQVBba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBbY2hhcmFjdGVyc10gPSB0aGlzLmNoYXJhY3RlckZyb21FdmVudChldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsTW9kaWZpZXJzID0gT2JqZWN0LmtleXMobW9kaWZpZXJzKS5tYXAoKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9kaWZpZXJzW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzTW9kaWZpZXJzID0gYWxsTW9kaWZpZXJzLnNvbWUoKG1vZGlmaWVyKSA9PiBldmVudFttb2RpZmllcl0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBBcnJheS5pc0FycmF5KGNoYXJhY3RlcnMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gWy4uLmNoYXJhY3RlcnMsIGV2ZW50LmtleV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBbY2hhcmFjdGVycywgZXZlbnQua2V5XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgaGFzIG1vZGlmaWVyczpcclxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSB3YW50IHRvIG1ha2Ugc3VyZSBpdCBpcyBub3QgdXBwZXIgY2FzZSBsZXR0ZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gKGJlY2F1c2UgdXBwZXIgaGFzIG1vZGlmaWVycyBzbyB3ZSB3YW50IGNvbnRpbnVlIHRoZSBjaGVjaylcclxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBhbHNvIHdhbnQgdG8gbWFrZSBzdXJlIGl0IGlzIG5vdCBhbHBoYW51bWVyaWMgY2hhciBsaWtlID8gLyBeICYgYW5kIG90aGVycyAoc2luY2UgdGhvc2UgY291bGQgcmVxdWlyZSBtb2RpZmllcnMgYXMgd2VsbClcclxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBhbHNvIHdhbnQgdG8gY2hlY2sgdGhpcyBvbmx5IGlmIHRoZSBsZW5ndGggb2ZcclxuICAgICAgICAgICAgICAgICAgICAvLyBvZiB0aGUga2V5cyBpcyBvbmUgKGkuZSB0aGUgY29tbWFuZCBrZXkgaXMgXCI/XCIgb3IgXCJjXCJcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIHdoaWxlIGNoZWNrIGlzIGhlcmUgdG8gdmVyaWZ5IHRoYXQ6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgcmVnaXN0ZXJlZCBrZXkgbGlrZSBcImVcIlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGl0IHdvbid0IGJlIGZpcmVkIHdoZW4gY2xpY2tpbmcgY3RybCArIGUsIG9yIGFueSBtb2RpZmllcnMgKyB0aGUga2V5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gd2Ugb25seSB3YW50IHRvIHRyaWdnZXIgd2hlbiB0aGUgc2luZ2xlIGtleSBpcyBjbGlja2VkIGFsb25lXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGh1cyBhbGwgdGhlc2UgZWRnZSBjYXNlcy5cclxuICAgICAgICAgICAgICAgICAgICAvLyBob3BlZnVsbHkgdGhpcyB3b3VsZCBjb3ZlciBhbGwgY2FzZXNcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOjogZmluZCBhIHdheSBzaW1wbGlmeSB0aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNNb2RpZmllcnMgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKCFpc1VwcGVyIHx8IGlzTm9uQWxwaGEpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICFpblNoaWZ0TWFwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXMubGVuZ3RoID09PSAxXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5zb21lKChjaGFyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFyID09PSBrZXkgJiYgaXNVcHBlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleSA9PT0gY2hhcjtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpZ25vcmVcclxuICAgICAqIEBwYXJhbSBldmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vZGlmaWVyc09uKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIFtcIm1ldGFLZXlcIiwgXCJhbHRLZXlcIiwgXCJjdHJsS2V5XCJdLnNvbWUoKG1vZCkgPT4gZXZlbnRbbW9kXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKiBQYXJzZSBlYWNoIGNvbW1hbmQgdXNpbmcgZ2V0S2V5cyBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBhcnNlQ29tbWFuZChjb21tYW5kOiBTaG9ydGN1dElucHV0IHwgU2hvcnRjdXRJbnB1dFtdKTogUGFyc2VkU2hvcnRjdXRbXSB7XHJcbiAgICAgICAgY29uc3QgY29tbWFuZHMgPSBBcnJheS5pc0FycmF5KGNvbW1hbmQpID8gY29tbWFuZCA6IFtjb21tYW5kXTtcclxuICAgICAgICByZXR1cm4gY29tbWFuZHMubWFwKChjb21tYW5kKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBBcnJheS5pc0FycmF5KGNvbW1hbmQua2V5KSA/IGNvbW1hbmQua2V5IDogW2NvbW1hbmQua2V5XTtcclxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBNYXRoLm1heCguLi5rZXlzLm1hcCgoa2V5KSA9PiBrZXkuc3BsaXQoXCIgXCIpLmZpbHRlcihpZGVudGl0eSkubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByZWRpY2F0ZXMgPSBrZXlzLm1hcCgoa2V5KSA9PiB0aGlzLmdldEtleXMoa2V5LnNwbGl0KFwiIFwiKS5maWx0ZXIoaWRlbnRpdHkpKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzU2VxdWVuY2UgPSB0aGlzLmlzU2VxdWVuY2Uoa2V5cyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlcXVlbmNlID0gaXNTZXF1ZW5jZVxyXG4gICAgICAgICAgICAgICAgPyBrZXlzLm1hcCgoa2V5KSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAga2V5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KFwiIFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoaWRlbnRpdHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgoa2V5KSA9PiBrZXkudHJpbSgpKVxyXG4gICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICA6IFtdO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgLi4uY29tbWFuZCxcclxuICAgICAgICAgICAgICAgIGlzU2VxdWVuY2UsXHJcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZTogaXNTZXF1ZW5jZSA/IHNlcXVlbmNlIDogW10sXHJcbiAgICAgICAgICAgICAgICBhbGxvd0luOiBjb21tYW5kLmFsbG93SW4gfHwgW10sXHJcbiAgICAgICAgICAgICAgICBrZXk6IGtleXMsXHJcbiAgICAgICAgICAgICAgICBpZDogYCR7Z3VpZCsrfWAsXHJcbiAgICAgICAgICAgICAgICB0aHJvdHRsZTogaXNOaWxsKGNvbW1hbmQudGhyb3R0bGVUaW1lKSA/IHRoaXMudGhyb3R0bGVUaW1lIDogY29tbWFuZC50aHJvdHRsZVRpbWUsXHJcbiAgICAgICAgICAgICAgICBwcmlvcml0eTogcHJpb3JpdHksXHJcbiAgICAgICAgICAgICAgICBwcmVkaWNhdGVzOiBwcmVkaWNhdGVzXHJcbiAgICAgICAgICAgIH0gYXMgUGFyc2VkU2hvcnRjdXQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19