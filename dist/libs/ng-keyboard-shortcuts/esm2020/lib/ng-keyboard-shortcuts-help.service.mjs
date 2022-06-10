import { Injectable } from '@angular/core';
import { KeyboardShortcutsService } from './ng-keyboard-shortcuts.service';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./ng-keyboard-shortcuts.service";
/**
 * Service to assist showing custom help screen
 */
export class KeyboardShortcutsHelpService {
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
KeyboardShortcutsHelpService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsHelpService, deps: [{ token: i1.KeyboardShortcutsService }], target: i0.ɵɵFactoryTarget.Injectable });
KeyboardShortcutsHelpService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsHelpService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsHelpService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.KeyboardShortcutsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcta2V5Ym9hcmQtc2hvcnRjdXRzLWhlbHAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvbmcta2V5Ym9hcmQtc2hvcnRjdXRzL3NyYy9saWIvbmcta2V5Ym9hcmQtc2hvcnRjdXRzLWhlbHAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRW5DOztHQUVHO0FBSUgsTUFBTSxPQUFPLDRCQUE0QjtJQUNyQzs7O09BR0c7SUFDSCxZQUFvQixRQUFrQztRQUFsQyxhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUd0RDs7O1dBR0c7UUFDSSxlQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUM3QyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FDWixTQUFTO2FBQ0osTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzVFLEdBQUcsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNqQyxHQUFHO1lBQ0gsS0FBSztZQUNMLFdBQVc7U0FDZCxDQUFDLENBQUMsQ0FDVixDQUNKLENBQUM7SUFoQkYsQ0FBQzs7eUhBTlEsNEJBQTRCOzZIQUE1Qiw0QkFBNEIsY0FGekIsTUFBTTsyRkFFVCw0QkFBNEI7a0JBSHhDLFVBQVU7bUJBQUM7b0JBQ1IsVUFBVSxFQUFFLE1BQU07aUJBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtLZXlib2FyZFNob3J0Y3V0c1NlcnZpY2V9IGZyb20gJy4vbmcta2V5Ym9hcmQtc2hvcnRjdXRzLnNlcnZpY2UnO1xyXG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuLyoqXHJcbiAqIFNlcnZpY2UgdG8gYXNzaXN0IHNob3dpbmcgY3VzdG9tIGhlbHAgc2NyZWVuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEtleWJvYXJkU2hvcnRjdXRzSGVscFNlcnZpY2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKiBAcGFyYW0ge0tleWJvYXJkU2hvcnRjdXRzU2VydmljZX0ga2V5Ym9hcmRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBrZXlib2FyZDogS2V5Ym9hcmRTaG9ydGN1dHNTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnNlcnZhYmxlIHRvIHByb3ZpZGUgYWNjZXNzIHRvIGFsbCByZWdpc3RlcmVkIHNob3J0Y3V0cyBpbiB0aGUgYXBwLlxyXG4gICAgICogQHR5cGUge09ic2VydmFibGU8YW55Pn1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3J0Y3V0cyQgPSB0aGlzLmtleWJvYXJkLnNob3J0Y3V0cyQucGlwZShcclxuICAgICAgICBtYXAoc2hvcnRjdXRzID0+XHJcbiAgICAgICAgICAgIHNob3J0Y3V0c1xyXG4gICAgICAgICAgICAgICAgLmZpbHRlcihzaG9ydGN1dCA9PiBCb29sZWFuKHNob3J0Y3V0LmxhYmVsKSAmJiBCb29sZWFuKHNob3J0Y3V0LmRlc2NyaXB0aW9uKSlcclxuICAgICAgICAgICAgICAgIC5tYXAoKHtrZXksIGxhYmVsLCBkZXNjcmlwdGlvbn0pID0+ICh7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICApXHJcbiAgICApO1xyXG59XHJcbiJdfQ==