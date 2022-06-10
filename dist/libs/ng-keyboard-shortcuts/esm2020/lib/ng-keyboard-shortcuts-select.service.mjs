import { Injectable } from '@angular/core';
import { KeyboardShortcutsService } from './ng-keyboard-shortcuts.service';
import * as i0 from "@angular/core";
import * as i1 from "./ng-keyboard-shortcuts.service";
/**
 * Use this service to listen to a specific keyboards events using Rxjs.
 * The shortcut must be declared in the app for the select to work.
 */
export class KeyboardShortcutsSelectService {
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
KeyboardShortcutsSelectService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsSelectService, deps: [{ token: i1.KeyboardShortcutsService }], target: i0.ɵɵFactoryTarget.Injectable });
KeyboardShortcutsSelectService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsSelectService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsSelectService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.KeyboardShortcutsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcta2V5Ym9hcmQtc2hvcnRjdXRzLXNlbGVjdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9uZy1rZXlib2FyZC1zaG9ydGN1dHMvc3JjL2xpYi9uZy1rZXlib2FyZC1zaG9ydGN1dHMtc2VsZWN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQzs7O0FBS3pFOzs7R0FHRztBQUNILE1BQU0sT0FBTyw4QkFBOEI7SUFDdkMsWUFBb0IsZUFBeUM7UUFBekMsb0JBQWUsR0FBZixlQUFlLENBQTBCO0lBQzdELENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsR0FBVztRQUNyQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7OzJIQVZRLDhCQUE4QjsrSEFBOUIsOEJBQThCLGNBTjNCLE1BQU07MkZBTVQsOEJBQThCO2tCQVAxQyxVQUFVO21CQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7S2V5Ym9hcmRTaG9ydGN1dHNTZXJ2aWNlfSBmcm9tICcuL25nLWtleWJvYXJkLXNob3J0Y3V0cy5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG4vKipcclxuICogVXNlIHRoaXMgc2VydmljZSB0byBsaXN0ZW4gdG8gYSBzcGVjaWZpYyBrZXlib2FyZHMgZXZlbnRzIHVzaW5nIFJ4anMuXHJcbiAqIFRoZSBzaG9ydGN1dCBtdXN0IGJlIGRlY2xhcmVkIGluIHRoZSBhcHAgZm9yIHRoZSBzZWxlY3QgdG8gd29yay5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBLZXlib2FyZFNob3J0Y3V0c1NlbGVjdFNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBrZXlib2FyZFNlcnZpY2U6IEtleWJvYXJkU2hvcnRjdXRzU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbiBvYnNlcnZhYmxlIG9mIGtleWJvYXJkIHNob3J0Y3V0IGZpbHRlcmVkIGJ5IGEgc3BlY2lmaWMga2V5LlxyXG4gICAgICogQHBhcmFtIGtleSAtIHRoZSBrZXkgdG8gZmlsdGVyIHRoZSBvYnNlcnZhYmxlIGJ5LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VsZWN0KGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5Ym9hcmRTZXJ2aWNlLnNlbGVjdChrZXkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==