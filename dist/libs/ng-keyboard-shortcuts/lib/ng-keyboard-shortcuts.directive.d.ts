import { ElementRef, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Shortcut } from './ng-keyboard-shortcuts.interfaces';
import { KeyboardShortcutsService } from './ng-keyboard-shortcuts.service';
import * as i0 from "@angular/core";
/**
 * A directive to be used with "focusable" elements, like:
 * textarea, input, select.
 */
export declare class KeyboardShortcutsDirective implements OnDestroy, OnChanges {
    private keyboard;
    private el;
    /**
     * clearId to remove shortcuts.
     */
    private clearIds;
    /**
     * Shortcut inputs for the directive.
     * will only work when the element is in focus
     */
    ngKeyboardShortcuts: Shortcut[];
    /**
     * @ignore
     * @type {boolean}
     * @private
     */
    private _disabled;
    /**
     * whether to disable the shortcuts for this directive
     * @param value
     */
    set disabled(value: any);
    /**
     * @ignore
     * @param {KeyboardShortcutsService} keyboard
     * @param {ElementRef} el
     */
    constructor(keyboard: KeyboardShortcutsService, el: ElementRef);
    /**
     * @ignore
     * @param {Shortcut[]} shortcuts
     * @returns {any}
     */
    private transformInput;
    /**
     * @ignore
     */
    ngOnDestroy(): void;
    /**
     * @ignore
     * @param {SimpleChanges} changes
     */
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KeyboardShortcutsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<KeyboardShortcutsDirective, "[ngKeyboardShortcuts]", never, { "ngKeyboardShortcuts": "ngKeyboardShortcuts"; "disabled": "disabled"; }, {}, never>;
}
