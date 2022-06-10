import { KeyboardShortcutsService } from './ng-keyboard-shortcuts.service';
import * as i0 from "@angular/core";
export declare class KeyboardShortcutsSelectService {
    private keyboardService;
    constructor(keyboardService: KeyboardShortcutsService);
    /**
     * Returns an observable of keyboard shortcut filtered by a specific key.
     * @param key - the key to filter the observable by.
     */
    select(key: string): import("rxjs").Observable<import("ng-keyboard-shortcuts").ShortcutEventOutput>;
    static ɵfac: i0.ɵɵFactoryDeclaration<KeyboardShortcutsSelectService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<KeyboardShortcutsSelectService>;
}
