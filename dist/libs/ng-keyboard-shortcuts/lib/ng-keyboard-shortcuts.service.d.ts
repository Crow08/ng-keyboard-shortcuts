import { OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { ParsedShortcut, ShortcutEventOutput, ShortcutInput } from "./ng-keyboard-shortcuts.interfaces";
import * as i0 from "@angular/core";
export declare class KeyboardShortcutsService implements OnDestroy {
    private document;
    /**
     * Parsed shortcuts
     * for each key create a predicate function
     */
    private _shortcuts;
    private _sequences;
    /**
     * Throttle the keypress event.
     */
    private throttleTime;
    private _pressed;
    /**
     * Streams of pressed events, can be used instead or with a command.
     */
    pressed$: Observable<ShortcutEventOutput>;
    /**
     * Disable all keyboard shortcuts
     */
    private disabled;
    /**
     * @ignore
     * 2000 ms window to allow between key sequences otherwise
     * the sequence will reset.
     */
    private static readonly TIMEOUT_SEQUENCE;
    private _shortcutsSub;
    shortcuts$: Observable<ParsedShortcut[]>;
    private _ignored;
    /**
     * @ignore
     * @param shortcut
     */
    private isAllowed;
    /**
     * @ignore
     * @param event
     */
    private mapEvent;
    /**
     * @ignore
     * Subscription for on destroy.
     */
    private readonly subscriptions;
    private keydown$;
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
    private ignore$;
    /**
     * @ignore
     */
    private clicks$;
    private keyup$;
    /**
     * @ignore
     */
    private keydownCombo$;
    /**
     * @ignore
     */
    private timer$;
    /**
     * @ignore
     */
    private resetCounter$;
    private keydownSequence$;
    /**
     * @ignore
     * @param command
     * @param events
     */
    private isFullMatch;
    /**
     * @ignore
     */
    private get shortcuts();
    /**
     * @ignore
     */
    constructor(document: any);
    /**
     * @ignore
     * @param event
     */
    private _characterFromEvent;
    private characterFromEvent;
    /**
     * @ignore
     * Remove subscription.
     */
    ngOnDestroy(): void;
    /**
     * @ignore
     * @param shortcuts
     */
    private isSequence;
    /**
     * Add new shortcut/s
     */
    add(shortcuts: ShortcutInput[] | ShortcutInput): string[];
    /**
     * Remove a command based on key or array of keys.
     * can be used for cleanup.
     * @returns
     * @param ids
     */
    remove(ids: string | string[]): KeyboardShortcutsService;
    /**
     * Returns an observable of keyboard shortcut filtered by a specific key.
     * @param key - the key to filter the observable by.
     */
    select(key: string): Observable<ShortcutEventOutput>;
    /**
     * @ignore
     * transforms a shortcut to:
     * a predicate function
     */
    private getKeys;
    /**
     * @ignore
     * @param event
     */
    private modifiersOn;
    /**
     * @ignore
     * Parse each command using getKeys function
     */
    private parseCommand;
    static ɵfac: i0.ɵɵFactoryDeclaration<KeyboardShortcutsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<KeyboardShortcutsService>;
}
