import { Directive, ElementRef, Input } from '@angular/core';
import { AllowIn } from './ng-keyboard-shortcuts.interfaces';
import { KeyboardShortcutsService } from './ng-keyboard-shortcuts.service';
import * as i0 from "@angular/core";
import * as i1 from "./ng-keyboard-shortcuts.service";
/**
 * A directive to be used with "focusable" elements, like:
 * textarea, input, select.
 */
export class KeyboardShortcutsDirective {
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
        return shortcuts.map(shortcut => ({
            ...shortcut,
            target: this.el.nativeElement,
            allowIn: [AllowIn.Select, AllowIn.Input, AllowIn.Textarea]
        }));
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
KeyboardShortcutsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsDirective, deps: [{ token: i1.KeyboardShortcutsService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
KeyboardShortcutsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.7", type: KeyboardShortcutsDirective, selector: "[ngKeyboardShortcuts]", inputs: { ngKeyboardShortcuts: "ngKeyboardShortcuts", disabled: "disabled" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngKeyboardShortcuts]'
                }]
        }], ctorParameters: function () { return [{ type: i1.KeyboardShortcutsService }, { type: i0.ElementRef }]; }, propDecorators: { ngKeyboardShortcuts: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcta2V5Ym9hcmQtc2hvcnRjdXRzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvbmcta2V5Ym9hcmQtc2hvcnRjdXRzL3NyYy9saWIvbmcta2V5Ym9hcmQtc2hvcnRjdXRzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXNDLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBQyxPQUFPLEVBQVcsTUFBTSxvQ0FBb0MsQ0FBQztBQUNyRSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQzs7O0FBRXpFOzs7R0FHRztBQUlILE1BQU0sT0FBTywwQkFBMEI7SUFrQ25DOzs7O09BSUc7SUFDSCxZQUFvQixRQUFrQyxFQUFVLEVBQWM7UUFBMUQsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBN0I5RTs7OztXQUlHO1FBQ0ssY0FBUyxHQUFHLEtBQUssQ0FBQztJQXlCMUIsQ0FBQztJQXZCRDs7O09BR0c7SUFDSCxJQUFhLFFBQVEsQ0FBQyxLQUFLO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2QztRQUNELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLEtBQUssS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUM3QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQzthQUNwRjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQVVEOzs7O09BSUc7SUFDSyxjQUFjLENBQUMsU0FBcUI7UUFDeEMsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixHQUFHLFFBQVE7WUFDWCxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhO1lBQzdCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDO1NBQzdELENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLE1BQU0sRUFBQyxtQkFBbUIsRUFBQyxHQUFHLE9BQU8sQ0FBQztRQUN0QyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkM7UUFDRCxJQUFJLENBQUMsbUJBQW1CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUU7WUFDM0QsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDN0YsQ0FBQzs7dUhBOUVRLDBCQUEwQjsyR0FBMUIsMEJBQTBCOzJGQUExQiwwQkFBMEI7a0JBSHRDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHVCQUF1QjtpQkFDcEM7d0lBVVksbUJBQW1CO3NCQUEzQixLQUFLO2dCQVlPLFFBQVE7c0JBQXBCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtBbGxvd0luLCBTaG9ydGN1dH0gZnJvbSAnLi9uZy1rZXlib2FyZC1zaG9ydGN1dHMuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7S2V5Ym9hcmRTaG9ydGN1dHNTZXJ2aWNlfSBmcm9tICcuL25nLWtleWJvYXJkLXNob3J0Y3V0cy5zZXJ2aWNlJztcclxuXHJcbi8qKlxyXG4gKiBBIGRpcmVjdGl2ZSB0byBiZSB1c2VkIHdpdGggXCJmb2N1c2FibGVcIiBlbGVtZW50cywgbGlrZTpcclxuICogdGV4dGFyZWEsIGlucHV0LCBzZWxlY3QuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW25nS2V5Ym9hcmRTaG9ydGN1dHNdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRTaG9ydGN1dHNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XHJcbiAgICAvKipcclxuICAgICAqIGNsZWFySWQgdG8gcmVtb3ZlIHNob3J0Y3V0cy5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbGVhcklkcztcclxuICAgIC8qKlxyXG4gICAgICogU2hvcnRjdXQgaW5wdXRzIGZvciB0aGUgZGlyZWN0aXZlLlxyXG4gICAgICogd2lsbCBvbmx5IHdvcmsgd2hlbiB0aGUgZWxlbWVudCBpcyBpbiBmb2N1c1xyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBuZ0tleWJvYXJkU2hvcnRjdXRzOiBTaG9ydGN1dFtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB3aGV0aGVyIHRvIGRpc2FibGUgdGhlIHNob3J0Y3V0cyBmb3IgdGhpcyBkaXJlY3RpdmVcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBzZXQgZGlzYWJsZWQodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLmNsZWFySWRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMua2V5Ym9hcmQucmVtb3ZlKHRoaXMuY2xlYXJJZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBmYWxzZSAmJiB0aGlzLm5nS2V5Ym9hcmRTaG9ydGN1dHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJJZHMgPSB0aGlzLmtleWJvYXJkLmFkZCh0aGlzLnRyYW5zZm9ybUlucHV0KHRoaXMubmdLZXlib2FyZFNob3J0Y3V0cykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICogQHBhcmFtIHtLZXlib2FyZFNob3J0Y3V0c1NlcnZpY2V9IGtleWJvYXJkXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnRSZWZ9IGVsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUga2V5Ym9hcmQ6IEtleWJvYXJkU2hvcnRjdXRzU2VydmljZSwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICogQHBhcmFtIHtTaG9ydGN1dFtdfSBzaG9ydGN1dHNcclxuICAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdHJhbnNmb3JtSW5wdXQoc2hvcnRjdXRzOiBTaG9ydGN1dFtdKSB7XHJcbiAgICAgICAgcmV0dXJuIHNob3J0Y3V0cy5tYXAoc2hvcnRjdXQgPT4gKHtcclxuICAgICAgICAgICAgLi4uc2hvcnRjdXQsXHJcbiAgICAgICAgICAgIHRhcmdldDogdGhpcy5lbC5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgICAgICBhbGxvd0luOiBbQWxsb3dJbi5TZWxlY3QsIEFsbG93SW4uSW5wdXQsIEFsbG93SW4uVGV4dGFyZWFdXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICovXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2xlYXJJZHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmtleWJvYXJkLnJlbW92ZSh0aGlzLmNsZWFySWRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpZ25vcmVcclxuICAgICAqIEBwYXJhbSB7U2ltcGxlQ2hhbmdlc30gY2hhbmdlc1xyXG4gICAgICovXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgY29uc3Qge25nS2V5Ym9hcmRTaG9ydGN1dHN9ID0gY2hhbmdlcztcclxuICAgICAgICBpZiAodGhpcy5jbGVhcklkcykge1xyXG4gICAgICAgICAgICB0aGlzLmtleWJvYXJkLnJlbW92ZSh0aGlzLmNsZWFySWRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFuZ0tleWJvYXJkU2hvcnRjdXRzIHx8ICFuZ0tleWJvYXJkU2hvcnRjdXRzLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xlYXJJZHMgPSB0aGlzLmtleWJvYXJkLmFkZCh0aGlzLnRyYW5zZm9ybUlucHV0KG5nS2V5Ym9hcmRTaG9ydGN1dHMuY3VycmVudFZhbHVlKSk7XHJcbiAgICB9XHJcbn1cclxuIl19