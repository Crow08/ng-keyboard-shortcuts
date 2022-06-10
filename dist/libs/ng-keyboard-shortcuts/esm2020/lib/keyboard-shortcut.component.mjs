import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { KeyboardShortcutsService } from './ng-keyboard-shortcuts.service';
import * as i0 from "@angular/core";
import * as i1 from "./ng-keyboard-shortcuts.service";
export class KeyboardShortcutComponent {
    constructor(keyboard) {
        this.keyboard = keyboard;
        this.fire = new EventEmitter();
    }
    ngOnDestroy() {
        this.keyboard.remove(this.clearId);
    }
    ngOnChanges(changes) {
    }
    ngAfterViewInit() {
        this.clearId = this.keyboard.add({
            description: this.description,
            label: this.label,
            preventDefault: this.preventDefault,
            allowIn: this.allowIn,
            target: this.target,
            key: this.key,
            throttleTime: this.throttleTime,
            command: (event) => {
                this.fire.emit(event);
            }
        });
    }
}
KeyboardShortcutComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutComponent, deps: [{ token: i1.KeyboardShortcutsService }], target: i0.ɵɵFactoryTarget.Component });
KeyboardShortcutComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.7", type: KeyboardShortcutComponent, selector: "ng-keyboard-shortcut", inputs: { description: "description", label: "label", preventDefault: "preventDefault", allowIn: "allowIn", key: "key", target: "target", throttleTime: "throttleTime" }, outputs: { fire: "fire" }, usesOnChanges: true, ngImport: i0, template: "<ng-content ></ng-content>", isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "ng-keyboard-shortcut",
                    template: "<ng-content ></ng-content>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.KeyboardShortcutsService }]; }, propDecorators: { description: [{
                type: Input
            }], label: [{
                type: Input
            }], preventDefault: [{
                type: Input
            }], allowIn: [{
                type: Input
            }], key: [{
                type: Input
            }], target: [{
                type: Input
            }], throttleTime: [{
                type: Input
            }], fire: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5Ym9hcmQtc2hvcnRjdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9uZy1rZXlib2FyZC1zaG9ydGN1dHMvc3JjL2xpYi9rZXlib2FyZC1zaG9ydGN1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFFVCx1QkFBdUIsRUFDdkIsS0FBSyxFQUtMLE1BQU0sRUFDTixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0saUNBQWlDLENBQUM7OztBQU96RSxNQUFNLE9BQU8seUJBQXlCO0lBQ2xDLFlBQW9CLFFBQWtDO1FBQWxDLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBWTVDLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBWnFCLENBQUM7SUFlMUQsV0FBVztRQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO0lBRWxDLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUM3QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNuQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNiLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtZQUMvQixPQUFPLEVBQUUsQ0FBQyxLQUEwQixFQUFFLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFCLENBQUM7U0FDSixDQUFDLENBQUE7SUFDTixDQUFDOztzSEFyQ1EseUJBQXlCOzBHQUF6Qix5QkFBeUIsc1JBSHhCLDRCQUE0QjsyRkFHN0IseUJBQXlCO2tCQUxyQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNsRDsrR0FLWSxXQUFXO3NCQUFuQixLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBRUksSUFBSTtzQkFBYixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIE9uSW5pdCxcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgSW5wdXQsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBTaW1wbGVDaGFuZ2VzLFxyXG4gICAgQWZ0ZXJWaWV3SW5pdCxcclxuICAgIE91dHB1dCxcclxuICAgIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0FsbG93SW4sIFNob3J0Y3V0RXZlbnRPdXRwdXR9IGZyb20gJy4vbmcta2V5Ym9hcmQtc2hvcnRjdXRzLmludGVyZmFjZXMnO1xyXG5pbXBvcnQge0tleWJvYXJkU2hvcnRjdXRzU2VydmljZX0gZnJvbSAnLi9uZy1rZXlib2FyZC1zaG9ydGN1dHMuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5nLWtleWJvYXJkLXNob3J0Y3V0XCIsXHJcbiAgICB0ZW1wbGF0ZTogXCI8bmctY29udGVudCA+PC9uZy1jb250ZW50PlwiLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEtleWJvYXJkU2hvcnRjdXRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGtleWJvYXJkOiBLZXlib2FyZFNob3J0Y3V0c1NlcnZpY2UpIHt9XHJcbiAgICBwcml2YXRlIGNsZWFySWQ7XHJcblxyXG4gICAgQElucHV0KCkgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIC8vIEBJbnB1dCgpIGVuY2Fwc3VsYXRlID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBwcmV2ZW50RGVmYXVsdDogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIGFsbG93SW46IEFsbG93SW5bXTtcclxuICAgIEBJbnB1dCgpIGtleTogc3RyaW5nIHwgc3RyaW5nW107XHJcbiAgICBASW5wdXQoKSB0YXJnZXQ6IEhUTUxFbGVtZW50O1xyXG4gICAgQElucHV0KCkgdGhyb3R0bGVUaW1lOiBudW1iZXI7XHJcblxyXG4gICAgQE91dHB1dCgpIGZpcmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMua2V5Ym9hcmQucmVtb3ZlKHRoaXMuY2xlYXJJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbGVhcklkID0gdGhpcy5rZXlib2FyZC5hZGQoe1xyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgbGFiZWw6IHRoaXMubGFiZWwsXHJcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiB0aGlzLnByZXZlbnREZWZhdWx0LFxyXG4gICAgICAgICAgICBhbGxvd0luOiB0aGlzLmFsbG93SW4sXHJcbiAgICAgICAgICAgIHRhcmdldDogdGhpcy50YXJnZXQsXHJcbiAgICAgICAgICAgIGtleTogdGhpcy5rZXksXHJcbiAgICAgICAgICAgIHRocm90dGxlVGltZTogdGhpcy50aHJvdHRsZVRpbWUsXHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IChldmVudDogU2hvcnRjdXRFdmVudE91dHB1dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlLmVtaXQoZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbn1cclxuIl19