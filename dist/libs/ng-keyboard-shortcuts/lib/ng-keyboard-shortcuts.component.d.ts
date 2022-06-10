import { OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { KeyboardShortcutsService } from './ng-keyboard-shortcuts.service';
import { ShortcutInput, ShortcutEventOutput } from './ng-keyboard-shortcuts.interfaces';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * A component to bind global shortcuts, can be used multiple times across the app
 * will remove registered shortcuts when element is removed from DOM.
 */
export declare class KeyboardShortcutsComponent implements OnChanges, OnDestroy {
    private keyboard;
    /**
     * A list of shortcuts.
     */
    shortcuts: ShortcutInput[] | ShortcutInput;
    /**
     * @ignore
     * list of registered keyboard shortcuts
     * used for clean up on NgDestroy.
     */
    private clearIds;
    /**
     * @ignore
     */
    private _disabled;
    /**
     * Disable all shortcuts for this component.
     */
    set disabled(value: any);
    /**
     * @ignore
     * @param {KeyboardShortcutsService} keyboard
     */
    constructor(keyboard: KeyboardShortcutsService);
    /**
     * Select a key to listen to, will emit when the selected key is pressed.
     */
    select(key: string): Observable<ShortcutEventOutput>;
    /**
     * @ignore
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * @ignore
     */
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KeyboardShortcutsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KeyboardShortcutsComponent, "ng-keyboard-shortcuts", never, { "shortcuts": "shortcuts"; "disabled": "disabled"; }, {}, never, never>;
}
