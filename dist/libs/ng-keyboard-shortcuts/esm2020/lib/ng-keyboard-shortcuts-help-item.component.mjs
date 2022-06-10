import { Component, Input } from '@angular/core';
import { symbols } from './keys';
import { identity } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * @ignore
 */
export class KeyboardShortcutsHelpItemComponent {
    constructor() {
    }
    set shortcut(shortcut) {
        const key = Array.isArray(shortcut.key) ? shortcut.key : [shortcut.key];
        this.parsedKeys = key.map(key => key
            .split(' ')
            .filter(identity)
            .filter(key => key !== '+')
            .map(key => {
            if (symbols[key]) {
                return symbols[key];
            }
            return key;
        }));
        this._shortcut = shortcut;
    }
    get shortcut() {
        return this._shortcut;
    }
    ngOnInit() {
    }
}
KeyboardShortcutsHelpItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsHelpItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
KeyboardShortcutsHelpItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.7", type: KeyboardShortcutsHelpItemComponent, selector: "ng-keyboard-shortcuts-help-item", inputs: { index: "index", shortcut: "shortcut" }, ngImport: i0, template: "<div class=\"item\" [class.item--odd]=\"index % 2 !== 0\" *ngIf=\"shortcut.description\">\r\n    <div class=\"description\">\r\n        <span>{{shortcut.description}}</span>\r\n    </div>\r\n    <div class=\"keys\">\r\n        <div *ngFor=\"let sKey of parsedKeys;let i = index\" class=\"key__container\">\r\n            <span class=\"key\" *ngFor=\"let key of sKey;\">{{key}}</span>\r\n            <span *ngIf=\"parsedKeys.length > 1 && i < parsedKeys.length - 1\" class=\"separator\"> / </span>\r\n        </div>\r\n    </div>\r\n</div>\r\n", styles: [".key{border:1px solid #CCCCCC;border-radius:4px;padding:5px 12px;margin-right:5px;background-color:#f5f5f5}.key__container{display:inline-block}.separator{margin-right:5px}.keys{float:right}.item{background-color:#ebebeb;padding:12px}.description{min-width:168px;display:inline-block;color:#333}.item--odd{background-color:#fff}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsHelpItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-keyboard-shortcuts-help-item', template: "<div class=\"item\" [class.item--odd]=\"index % 2 !== 0\" *ngIf=\"shortcut.description\">\r\n    <div class=\"description\">\r\n        <span>{{shortcut.description}}</span>\r\n    </div>\r\n    <div class=\"keys\">\r\n        <div *ngFor=\"let sKey of parsedKeys;let i = index\" class=\"key__container\">\r\n            <span class=\"key\" *ngFor=\"let key of sKey;\">{{key}}</span>\r\n            <span *ngIf=\"parsedKeys.length > 1 && i < parsedKeys.length - 1\" class=\"separator\"> / </span>\r\n        </div>\r\n    </div>\r\n</div>\r\n", styles: [".key{border:1px solid #CCCCCC;border-radius:4px;padding:5px 12px;margin-right:5px;background-color:#f5f5f5}.key__container{display:inline-block}.separator{margin-right:5px}.keys{float:right}.item{background-color:#ebebeb;padding:12px}.description{min-width:168px;display:inline-block;color:#333}.item--odd{background-color:#fff}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { index: [{
                type: Input
            }], shortcut: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcta2V5Ym9hcmQtc2hvcnRjdXRzLWhlbHAtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL25nLWtleWJvYXJkLXNob3J0Y3V0cy9zcmMvbGliL25nLWtleWJvYXJkLXNob3J0Y3V0cy1oZWxwLWl0ZW0uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vbGlicy9uZy1rZXlib2FyZC1zaG9ydGN1dHMvc3JjL2xpYi9uZy1rZXlib2FyZC1zaG9ydGN1dHMtaGVscC1pdGVtLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDL0IsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLFNBQVMsQ0FBQzs7O0FBRWpDOztHQUVHO0FBTUgsTUFBTSxPQUFPLGtDQUFrQztJQTZCM0M7SUFDQSxDQUFDO0lBekJELElBQ0ksUUFBUSxDQUFDLFFBQWtCO1FBQzNCLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDNUIsR0FBRzthQUNFLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixNQUFNLENBQUMsUUFBUSxDQUFDO2FBQ2hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUM7YUFDMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1AsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2QsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkI7WUFDRCxPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUNULENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFPRCxRQUFRO0lBQ1IsQ0FBQzs7K0hBakNRLGtDQUFrQzttSEFBbEMsa0NBQWtDLHlIQ2IvQyxnaUJBV0E7MkZERWEsa0NBQWtDO2tCQUw5QyxTQUFTOytCQUNJLGlDQUFpQzswRUFPbEMsS0FBSztzQkFBYixLQUFLO2dCQUdGLFFBQVE7c0JBRFgsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtTaG9ydGN1dH0gZnJvbSAnLi9uZy1rZXlib2FyZC1zaG9ydGN1dHMuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7c3ltYm9sc30gZnJvbSAnLi9rZXlzJztcclxuaW1wb3J0IHtpZGVudGl0eX0gZnJvbSAnLi91dGlscyc7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25nLWtleWJvYXJkLXNob3J0Y3V0cy1oZWxwLWl0ZW0nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL25nLWtleWJvYXJkLXNob3J0Y3V0cy1oZWxwLWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vbmcta2V5Ym9hcmQtc2hvcnRjdXRzLWhlbHAtaXRlbS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBLZXlib2FyZFNob3J0Y3V0c0hlbHBJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHB1YmxpYyBwYXJzZWRLZXlzOiBzdHJpbmdbXVtdO1xyXG5cclxuICAgIEBJbnB1dCgpIGluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBzaG9ydGN1dChzaG9ydGN1dDogU2hvcnRjdXQpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBBcnJheS5pc0FycmF5KHNob3J0Y3V0LmtleSkgPyBzaG9ydGN1dC5rZXkgOiBbc2hvcnRjdXQua2V5XTtcclxuICAgICAgICB0aGlzLnBhcnNlZEtleXMgPSBrZXkubWFwKGtleSA9PlxyXG4gICAgICAgICAgICBrZXlcclxuICAgICAgICAgICAgICAgIC5zcGxpdCgnICcpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGlkZW50aXR5KVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcihrZXkgPT4ga2V5ICE9PSAnKycpXHJcbiAgICAgICAgICAgICAgICAubWFwKGtleSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN5bWJvbHNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3ltYm9sc1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuX3Nob3J0Y3V0ID0gc2hvcnRjdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNob3J0Y3V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaG9ydGN1dDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zaG9ydGN1dDogU2hvcnRjdXQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cIml0ZW1cIiBbY2xhc3MuaXRlbS0tb2RkXT1cImluZGV4ICUgMiAhPT0gMFwiICpuZ0lmPVwic2hvcnRjdXQuZGVzY3JpcHRpb25cIj5cclxuICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPlxyXG4gICAgICAgIDxzcGFuPnt7c2hvcnRjdXQuZGVzY3JpcHRpb259fTwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImtleXNcIj5cclxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBzS2V5IG9mIHBhcnNlZEtleXM7bGV0IGkgPSBpbmRleFwiIGNsYXNzPVwia2V5X19jb250YWluZXJcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJrZXlcIiAqbmdGb3I9XCJsZXQga2V5IG9mIHNLZXk7XCI+e3trZXl9fTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJwYXJzZWRLZXlzLmxlbmd0aCA+IDEgJiYgaSA8IHBhcnNlZEtleXMubGVuZ3RoIC0gMVwiIGNsYXNzPVwic2VwYXJhdG9yXCI+IC8gPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=