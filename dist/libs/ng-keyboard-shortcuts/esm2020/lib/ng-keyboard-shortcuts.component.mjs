import { Component, Input } from '@angular/core';
import { KeyboardShortcutsService } from './ng-keyboard-shortcuts.service';
import * as i0 from "@angular/core";
import * as i1 from "./ng-keyboard-shortcuts.service";
/**
 * A component to bind global shortcuts, can be used multiple times across the app
 * will remove registered shortcuts when element is removed from DOM.
 */
export class KeyboardShortcutsComponent {
    /**
     * @ignore
     * @param {KeyboardShortcutsService} keyboard
     */
    constructor(keyboard) {
        this.keyboard = keyboard;
        /**
         * A list of shortcuts.
         */
        this.shortcuts = [];
        /**
         * @ignore
         * list of registered keyboard shortcuts
         * used for clean up on NgDestroy.
         */
        this.clearIds = [];
        /**
         * @ignore
         */
        this._disabled = false;
    }
    /**
     * Disable all shortcuts for this component.
     */
    set disabled(value) {
        this._disabled = value;
        if (this.clearIds) {
            this.keyboard.remove(this.clearIds);
            this.clearIds = [];
        }
        if (value) {
            return;
        }
        this.clearIds = this.keyboard.add(this.shortcuts);
    }
    /**
     * Select a key to listen to, will emit when the selected key is pressed.
     */
    select(key) {
        return this.keyboard.select(key);
    }
    /**
     * @ignore
     */
    ngOnChanges(changes) {
        if (!changes['shortcuts'] || !changes['shortcuts'].currentValue) {
            return;
        }
        if (this.clearIds) {
            this.keyboard.remove(this.clearIds);
        }
        if (!this._disabled) {
            setTimeout(() => (this.clearIds = this.keyboard.add(changes['shortcuts'].currentValue)));
        }
    }
    /**
     * @ignore
     */
    ngOnDestroy() {
        this.keyboard.remove(this.clearIds);
    }
}
KeyboardShortcutsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsComponent, deps: [{ token: i1.KeyboardShortcutsService }], target: i0.ɵɵFactoryTarget.Component });
KeyboardShortcutsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.7", type: KeyboardShortcutsComponent, selector: "ng-keyboard-shortcuts", inputs: { shortcuts: "shortcuts", disabled: "disabled" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ng-keyboard-shortcuts',
                    template: ''
                }]
        }], ctorParameters: function () { return [{ type: i1.KeyboardShortcutsService }]; }, propDecorators: { shortcuts: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcta2V5Ym9hcmQtc2hvcnRjdXRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvbmcta2V5Ym9hcmQtc2hvcnRjdXRzL3NyYy9saWIvbmcta2V5Ym9hcmQtc2hvcnRjdXRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUgsU0FBUyxFQUNULEtBQUssRUFLUixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQzs7O0FBSXpFOzs7R0FHRztBQUtILE1BQU0sT0FBTywwQkFBMEI7SUFnQ25DOzs7T0FHRztJQUNILFlBQW9CLFFBQWtDO1FBQWxDLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBbkN0RDs7V0FFRztRQUNNLGNBQVMsR0FBb0MsRUFBRSxDQUFDO1FBRXpEOzs7O1dBSUc7UUFDSyxhQUFRLEdBQWEsRUFBRSxDQUFDO1FBRWhDOztXQUVHO1FBQ0ssY0FBUyxHQUFHLEtBQUssQ0FBQztJQXFCMUIsQ0FBQztJQXBCRDs7T0FFRztJQUNILElBQWEsUUFBUSxDQUFDLEtBQUs7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxLQUFLLEVBQUU7WUFDUCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBU0Q7O09BRUc7SUFDSSxNQUFNLENBQUMsR0FBVztRQUNyQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksRUFBRTtZQUM3RCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNqQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUY7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7O3VIQWxFUSwwQkFBMEI7MkdBQTFCLDBCQUEwQiw0SUFGekIsRUFBRTsyRkFFSCwwQkFBMEI7a0JBSnRDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLEVBQUU7aUJBQ2Y7K0dBS1ksU0FBUztzQkFBakIsS0FBSztnQkFnQk8sUUFBUTtzQkFBcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBBZnRlclZpZXdJbml0LFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgSW5wdXQsXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkluaXQsXHJcbiAgICBTaW1wbGVDaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7S2V5Ym9hcmRTaG9ydGN1dHNTZXJ2aWNlfSBmcm9tICcuL25nLWtleWJvYXJkLXNob3J0Y3V0cy5zZXJ2aWNlJztcclxuaW1wb3J0IHtTaG9ydGN1dElucHV0LCBTaG9ydGN1dEV2ZW50T3V0cHV0fSBmcm9tICcuL25nLWtleWJvYXJkLXNob3J0Y3V0cy5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcclxuXHJcbi8qKlxyXG4gKiBBIGNvbXBvbmVudCB0byBiaW5kIGdsb2JhbCBzaG9ydGN1dHMsIGNhbiBiZSB1c2VkIG11bHRpcGxlIHRpbWVzIGFjcm9zcyB0aGUgYXBwXHJcbiAqIHdpbGwgcmVtb3ZlIHJlZ2lzdGVyZWQgc2hvcnRjdXRzIHdoZW4gZWxlbWVudCBpcyByZW1vdmVkIGZyb20gRE9NLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25nLWtleWJvYXJkLXNob3J0Y3V0cycsXHJcbiAgICB0ZW1wbGF0ZTogJydcclxufSlcclxuZXhwb3J0IGNsYXNzIEtleWJvYXJkU2hvcnRjdXRzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gICAgLyoqXHJcbiAgICAgKiBBIGxpc3Qgb2Ygc2hvcnRjdXRzLlxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBzaG9ydGN1dHM6IFNob3J0Y3V0SW5wdXRbXSB8IFNob3J0Y3V0SW5wdXQgPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpZ25vcmVcclxuICAgICAqIGxpc3Qgb2YgcmVnaXN0ZXJlZCBrZXlib2FyZCBzaG9ydGN1dHNcclxuICAgICAqIHVzZWQgZm9yIGNsZWFuIHVwIG9uIE5nRGVzdHJveS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbGVhcklkczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpZ25vcmVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICogRGlzYWJsZSBhbGwgc2hvcnRjdXRzIGZvciB0aGlzIGNvbXBvbmVudC5cclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgc2V0IGRpc2FibGVkKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcclxuICAgICAgICBpZiAodGhpcy5jbGVhcklkcykge1xyXG4gICAgICAgICAgICB0aGlzLmtleWJvYXJkLnJlbW92ZSh0aGlzLmNsZWFySWRzKTtcclxuICAgICAgICAgICAgdGhpcy5jbGVhcklkcyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNsZWFySWRzID0gdGhpcy5rZXlib2FyZC5hZGQodGhpcy5zaG9ydGN1dHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICogQHBhcmFtIHtLZXlib2FyZFNob3J0Y3V0c1NlcnZpY2V9IGtleWJvYXJkXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUga2V5Ym9hcmQ6IEtleWJvYXJkU2hvcnRjdXRzU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0IGEga2V5IHRvIGxpc3RlbiB0bywgd2lsbCBlbWl0IHdoZW4gdGhlIHNlbGVjdGVkIGtleSBpcyBwcmVzc2VkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VsZWN0KGtleTogc3RyaW5nKTogT2JzZXJ2YWJsZTxTaG9ydGN1dEV2ZW50T3V0cHV0PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5Ym9hcmQuc2VsZWN0KGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKi9cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIWNoYW5nZXNbJ3Nob3J0Y3V0cyddIHx8ICFjaGFuZ2VzWydzaG9ydGN1dHMnXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jbGVhcklkcykge1xyXG4gICAgICAgICAgICB0aGlzLmtleWJvYXJkLnJlbW92ZSh0aGlzLmNsZWFySWRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLl9kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+ICh0aGlzLmNsZWFySWRzID0gdGhpcy5rZXlib2FyZC5hZGQoY2hhbmdlc1snc2hvcnRjdXRzJ10uY3VycmVudFZhbHVlKSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpZ25vcmVcclxuICAgICAqL1xyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5rZXlib2FyZC5yZW1vdmUodGhpcy5jbGVhcklkcyk7XHJcbiAgICB9XHJcbn1cclxuIl19