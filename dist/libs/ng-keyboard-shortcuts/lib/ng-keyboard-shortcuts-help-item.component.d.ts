import { OnInit } from '@angular/core';
import { Shortcut } from './ng-keyboard-shortcuts.interfaces';
import * as i0 from "@angular/core";
/**
 * @ignore
 */
export declare class KeyboardShortcutsHelpItemComponent implements OnInit {
    parsedKeys: string[][];
    index: number;
    set shortcut(shortcut: Shortcut);
    get shortcut(): Shortcut;
    private _shortcut;
    constructor();
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KeyboardShortcutsHelpItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KeyboardShortcutsHelpItemComponent, "ng-keyboard-shortcuts-help-item", never, { "index": "index"; "shortcut": "shortcut"; }, {}, never, never>;
}
