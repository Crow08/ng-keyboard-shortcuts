import { KeyboardShortcutsService } from './ng-keyboard-shortcuts.service';
import * as i0 from "@angular/core";
/**
 * Service to assist showing custom help screen
 */
export declare class KeyboardShortcutsHelpService {
    private keyboard;
    /**
     * @ignore
     * @param {KeyboardShortcutsService} keyboard
     */
    constructor(keyboard: KeyboardShortcutsService);
    /**
     * Observable to provide access to all registered shortcuts in the app.
     * @type {Observable<any>}
     */
    shortcuts$: import("rxjs").Observable<{
        key: string[];
        label: string;
        description: string;
    }[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<KeyboardShortcutsHelpService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<KeyboardShortcutsHelpService>;
}
