import { ApplicationRef, Component, ComponentFactoryResolver, ElementRef, Injector, Input, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { DomPortalOutlet } from "./dom-portal-outlet";
import { TemplatePortal } from "./portal";
import { KeyboardShortcutsService } from "./ng-keyboard-shortcuts.service";
import { KeyboardShortcutsHelpService } from "./ng-keyboard-shortcuts-help.service";
import { animate, style, transition, trigger } from "@angular/animations";
import { distinctUntilChanged, map } from "rxjs/operators";
import { groupBy } from "./utils";
import * as i0 from "@angular/core";
import * as i1 from "./ng-keyboard-shortcuts.service";
import * as i2 from "./ng-keyboard-shortcuts-help.service";
import * as i3 from "./ng-keyboard-shortcuts-help-item.component";
import * as i4 from "@angular/common";
/**
 * @ignore
 */
const scrollAbleKeys = new Map([
    [31, 1],
    [38, 1],
    [39, 1],
    [40, 1]
]);
/**
 * @ignore
 */
const preventDefault = (ignore) => (e) => {
    const modal = e.target.closest(ignore);
    if (modal) {
        return;
    }
    e = e || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.returnValue = false;
};
/**
 * @ignore
 */
const preventDefaultForScrollKeys = (e) => {
    if (!scrollAbleKeys.has(e.keyCode)) {
        return true;
    }
    preventDefault(e);
    return false;
};
/**
 * @ignore
 */
let scrollEvents = [
    { name: "wheel", callback: null },
    { name: "touchmove", callback: null },
    { name: "DOMMouseScroll", callback: null }
];
/**
 * @ignore
 */
const disableScroll = (ignore) => {
    scrollEvents = scrollEvents.map((event) => {
        const callback = preventDefault(ignore);
        window.addEventListener(event.name, callback, { passive: false });
        return {
            ...event,
            callback
        };
    });
    window.addEventListener("keydown", preventDefaultForScrollKeys);
};
/**
 * @ignore
 */
const enableScroll = () => {
    scrollEvents = scrollEvents.map((event) => {
        window.removeEventListener(event.name, event.callback);
        return {
            ...event,
            callback: null
        };
    });
    window.removeEventListener("keydown", preventDefaultForScrollKeys);
};
/**
 * A Component to show all registered shortcut in the app
 * it is shown as a modal
 */
export class KeyboardShortcutsHelpComponent {
    /**
     * @ignore
     */
    constructor(componentFactoryResolver, appRef, keyboard, element, keyboardHelp, viewContainer, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.keyboard = keyboard;
        this.element = element;
        this.keyboardHelp = keyboardHelp;
        this.viewContainer = viewContainer;
        this.injector = injector;
        /**
         * Disable scrolling while modal is open
         */
        this.disableScrolling = true;
        this.className = "help-modal";
        /**
         * The title of the help screen
         * @default: "Keyboard shortcuts"
         */
        this.title = "Keyboard shortcuts";
        /**
         * What message to show when no shortcuts are available on the page.
         * @default "No shortcuts available"
         */
        this.emptyMessage = "No shortcuts available";
        /**
         * @ignore
         */
        this.showing = false;
        this.bodyPortalHost = new DomPortalOutlet(document.body, this.componentFactoryResolver, this.appRef, this.injector);
    }
    /**
     * The shortcut to show/hide the help screen
     */
    set key(value) {
        this._key = value;
        if (!value) {
            return;
        }
        if (this.clearIds) {
            this.keyboard.remove(this.clearIds);
        }
        this.clearIds = this.addShortcut({
            key: value,
            preventDefault: true,
            command: () => this.toggle(),
            description: this.keyDescription,
            label: this.keyLabel
        });
    }
    addShortcut(shortcut) {
        return this.keyboard.add(shortcut);
    }
    /**
     * Reveal the help screen manually.
     */
    reveal() {
        this.hide();
        if (this.disableScrolling) {
            disableScroll(`.${this.className}`);
        }
        const portal = new TemplatePortal(this.template, this.viewContainer);
        this.bodyPortalHost.attach(portal);
        this.showing = true;
        return this;
    }
    /**
     * Check if help screen is visible.
     * @returns boolean
     */
    visible() {
        return this.bodyPortalHost.hasAttached();
    }
    /**
     * Hide the help screen manually.
     */
    hide() {
        if (this.disableScrolling) {
            enableScroll();
        }
        if (!this.bodyPortalHost.hasAttached()) {
            return this;
        }
        this.bodyPortalHost.detach();
        this.showing = false;
        return this;
    }
    /**
     * @ignore
     */
    ngOnDestroy() {
        this.hide();
        if (this.clearIds) {
            this.keyboard.remove(this.clearIds);
        }
        if (this.closeKeyIds) {
            this.keyboard.remove(this.closeKeyIds);
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
    /**
     * Show/Hide the help screen manually.
     */
    toggle() {
        this.visible() ? this.hide() : this.reveal();
        return this;
    }
    /**
     * @ignore
     */
    ngOnInit() {
        this.subscription = this.keyboardHelp.shortcuts$
            .pipe(distinctUntilChanged(), map((shortcuts) => groupBy(shortcuts, "label")))
            .subscribe((shortcuts) => {
            this.shortcuts = shortcuts;
            this.labels = Object.keys(shortcuts);
        });
    }
    ngOnChanges(changes) {
        if (!changes["closeKey"].currentValue) {
            return;
        }
        if (this.closeKeyIds) {
            this.keyboard.remove(this.closeKeyIds);
        }
        this.closeKeyIds = this.addShortcut({
            key: changes["closeKey"].currentValue,
            preventDefault: true,
            command: () => this.hide(),
            description: this.closeKeyDescription,
            label: this.closeKeyDescription
        });
    }
}
KeyboardShortcutsHelpComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsHelpComponent, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ApplicationRef }, { token: i1.KeyboardShortcutsService }, { token: i0.ElementRef }, { token: i2.KeyboardShortcutsHelpService }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
KeyboardShortcutsHelpComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.7", type: KeyboardShortcutsHelpComponent, selector: "ng-keyboard-shortcuts-help", inputs: { disableScrolling: "disableScrolling", keyDescription: "keyDescription", keyLabel: "keyLabel", closeKeyLabel: "closeKeyLabel", closeKeyDescription: "closeKeyDescription", key: "key", closeKey: "closeKey", title: "title", emptyMessage: "emptyMessage" }, viewQueries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-template>\r\n    <div class=\"help-modal__container\" [attr.aria-labelledby]=\"'modal-' + title\" role=\"dialog\">\r\n        <div class=\"{{className}}\" [@enterAnimation] *ngIf=\"showing\">\r\n            <div class=\"title\">\r\n                <h3 id=\"modal-{{title}}\" class=\"title__text\">{{title}}</h3>\r\n            </div>\r\n            <div class=\"help-modal__body\">\r\n                <span *ngIf=\"!labels.length\">\r\n                    {{emptyMessage}}\r\n                </span>\r\n                <div>\r\n                    <ul *ngFor=\"let label of labels\" class=\"help-modal__list\">\r\n                        <h4 class=\"item-group-label\">{{label}}</h4>\r\n                        <ng-keyboard-shortcuts-help-item\r\n                                *ngFor=\"let shortcut of shortcuts[label]; let i = index\"\r\n                                [shortcut]=\"shortcut\"\r\n                                [index]=\"i\"\r\n                        ></ng-keyboard-shortcuts-help-item>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"help-modal__backdrop\" [@overlayAnimation] (mousedown)=\"hide()\" *ngIf=\"showing\"></div>\r\n    </div>\r\n</ng-template>\r\n", styles: [".help-modal__container{position:fixed;top:0;right:0;z-index:500;left:0;bottom:0;display:flex;align-items:center;justify-content:center}.help-modal{z-index:2000;min-width:420px;max-height:calc(100% - 100px);overflow:auto;padding:20px;box-shadow:0 11px 15px -7px #0003,0 24px 38px 3px #00000024,0 9px 46px 8px #0000001f;background:#fff}.item-group-label{text-transform:capitalize}.title{padding:20px 0}.title__text{margin:0;padding:0}.help-modal__list{padding:0}.help-modal__backdrop{position:absolute;background:rgba(0,0,0,.27);top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;opacity:1}\n"], components: [{ type: i3.KeyboardShortcutsHelpItemComponent, selector: "ng-keyboard-shortcuts-help-item", inputs: ["index", "shortcut"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], animations: [
        trigger("enterAnimation", [
            transition(":enter", [
                style({ transform: "translateX(-100%)", opacity: 0 }),
                animate("0.33s cubic-bezier(0,0,0.3,1)", style({ transform: "translateX(0)", opacity: 1 }))
            ]),
            transition(":leave", [
                style({ transform: "translateX(0)", opacity: 1 }),
                animate("0.23s cubic-bezier(0,0,0.3,1)", style({ transform: "translateX(-100%)", opacity: 0 }))
            ])
        ]),
        trigger("overlayAnimation", [
            transition(":enter", [
                style({ opacity: 0 }),
                animate("1s cubic-bezier(0,0,0.3,1)", style({ opacity: 1 }))
            ]),
            transition(":leave", [
                style({ opacity: 1 }),
                animate("1s cubic-bezier(0,0,0.3,1)", style({ opacity: 0 }))
            ])
        ])
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsHelpComponent, decorators: [{
            type: Component,
            args: [{ selector: "ng-keyboard-shortcuts-help", animations: [
                        trigger("enterAnimation", [
                            transition(":enter", [
                                style({ transform: "translateX(-100%)", opacity: 0 }),
                                animate("0.33s cubic-bezier(0,0,0.3,1)", style({ transform: "translateX(0)", opacity: 1 }))
                            ]),
                            transition(":leave", [
                                style({ transform: "translateX(0)", opacity: 1 }),
                                animate("0.23s cubic-bezier(0,0,0.3,1)", style({ transform: "translateX(-100%)", opacity: 0 }))
                            ])
                        ]),
                        trigger("overlayAnimation", [
                            transition(":enter", [
                                style({ opacity: 0 }),
                                animate("1s cubic-bezier(0,0,0.3,1)", style({ opacity: 1 }))
                            ]),
                            transition(":leave", [
                                style({ opacity: 1 }),
                                animate("1s cubic-bezier(0,0,0.3,1)", style({ opacity: 0 }))
                            ])
                        ])
                    ], template: "<ng-template>\r\n    <div class=\"help-modal__container\" [attr.aria-labelledby]=\"'modal-' + title\" role=\"dialog\">\r\n        <div class=\"{{className}}\" [@enterAnimation] *ngIf=\"showing\">\r\n            <div class=\"title\">\r\n                <h3 id=\"modal-{{title}}\" class=\"title__text\">{{title}}</h3>\r\n            </div>\r\n            <div class=\"help-modal__body\">\r\n                <span *ngIf=\"!labels.length\">\r\n                    {{emptyMessage}}\r\n                </span>\r\n                <div>\r\n                    <ul *ngFor=\"let label of labels\" class=\"help-modal__list\">\r\n                        <h4 class=\"item-group-label\">{{label}}</h4>\r\n                        <ng-keyboard-shortcuts-help-item\r\n                                *ngFor=\"let shortcut of shortcuts[label]; let i = index\"\r\n                                [shortcut]=\"shortcut\"\r\n                                [index]=\"i\"\r\n                        ></ng-keyboard-shortcuts-help-item>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"help-modal__backdrop\" [@overlayAnimation] (mousedown)=\"hide()\" *ngIf=\"showing\"></div>\r\n    </div>\r\n</ng-template>\r\n", styles: [".help-modal__container{position:fixed;top:0;right:0;z-index:500;left:0;bottom:0;display:flex;align-items:center;justify-content:center}.help-modal{z-index:2000;min-width:420px;max-height:calc(100% - 100px);overflow:auto;padding:20px;box-shadow:0 11px 15px -7px #0003,0 24px 38px 3px #00000024,0 9px 46px 8px #0000001f;background:#fff}.item-group-label{text-transform:capitalize}.title{padding:20px 0}.title__text{margin:0;padding:0}.help-modal__list{padding:0}.help-modal__backdrop{position:absolute;background:rgba(0,0,0,.27);top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;opacity:1}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }, { type: i1.KeyboardShortcutsService }, { type: i0.ElementRef }, { type: i2.KeyboardShortcutsHelpService }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { disableScrolling: [{
                type: Input
            }], keyDescription: [{
                type: Input
            }], keyLabel: [{
                type: Input
            }], closeKeyLabel: [{
                type: Input
            }], closeKeyDescription: [{
                type: Input
            }], key: [{
                type: Input
            }], closeKey: [{
                type: Input
            }], title: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], template: [{
                type: ViewChild,
                args: [TemplateRef]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcta2V5Ym9hcmQtc2hvcnRjdXRzLWhlbHAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9uZy1rZXlib2FyZC1zaG9ydGN1dHMvc3JjL2xpYi9uZy1rZXlib2FyZC1zaG9ydGN1dHMtaGVscC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9saWJzL25nLWtleWJvYXJkLXNob3J0Y3V0cy9zcmMvbGliL25nLWtleWJvYXJkLXNob3J0Y3V0cy1oZWxwLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxjQUFjLEVBQ2QsU0FBUyxFQUNULHdCQUF3QixFQUN4QixVQUFVLEVBQ1YsUUFBUSxFQUNSLEtBQUssRUFLTCxXQUFXLEVBQ1gsU0FBUyxFQUNULGdCQUFnQixFQUNuQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7OztBQUlsQzs7R0FFRztBQUNILE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDO0lBQzNCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNQLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNQLENBQUMsRUFBRSxFQUFF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RUFBRSxDQUFDLEVBQUUsQ0FBQztnQ0FDckIsT0FBTyxDQUFDLDRCQUE0QixFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzZCQUMvRCxDQUFDO3lCQUNMLENBQUM7cUJBQ0w7NlNBTVEsZ0JBQWdCO3NCQUF4QixLQUFLO2dCQWFHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBT0csUUFBUTtzQkFBaEIsS0FBSztnQkFPRyxhQUFhO3NCQUFyQixLQUFLO2dCQU9HLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFNRixHQUFHO3NCQUROLEtBQUs7Z0JBdUJHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBTUcsS0FBSztzQkFBYixLQUFLO2dCQUtHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBSWtCLFFBQVE7c0JBQS9CLFNBQVM7dUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBBcHBsaWNhdGlvblJlZixcclxuICAgIENvbXBvbmVudCxcclxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBJbmplY3RvcixcclxuICAgIElucHV0LFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT25Jbml0LFxyXG4gICAgU2ltcGxlQ2hhbmdlcyxcclxuICAgIFRlbXBsYXRlUmVmLFxyXG4gICAgVmlld0NoaWxkLFxyXG4gICAgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERvbVBvcnRhbE91dGxldCB9IGZyb20gXCIuL2RvbS1wb3J0YWwtb3V0bGV0XCI7XHJcbmltcG9ydCB7IFRlbXBsYXRlUG9ydGFsIH0gZnJvbSBcIi4vcG9ydGFsXCI7XHJcbmltcG9ydCB7IEtleWJvYXJkU2hvcnRjdXRzU2VydmljZSB9IGZyb20gXCIuL25nLWtleWJvYXJkLXNob3J0Y3V0cy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEtleWJvYXJkU2hvcnRjdXRzSGVscFNlcnZpY2UgfSBmcm9tIFwiLi9uZy1rZXlib2FyZC1zaG9ydGN1dHMtaGVscC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IGFuaW1hdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSBcIkBhbmd1bGFyL2FuaW1hdGlvbnNcIjtcclxuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5pbXBvcnQgeyBncm91cEJ5IH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uTGlrZSB9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7IFNob3J0Y3V0IH0gZnJvbSBcIi4vbmcta2V5Ym9hcmQtc2hvcnRjdXRzLmludGVyZmFjZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5jb25zdCBzY3JvbGxBYmxlS2V5cyA9IG5ldyBNYXAoW1xyXG4gICAgWzMxLCAxXSxcclxuICAgIFszOCwgMV0sXHJcbiAgICBbMzksIDFdLFxyXG4gICAgWzQwLCAxXVxyXG5dKTtcclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmNvbnN0IHByZXZlbnREZWZhdWx0ID0gKGlnbm9yZTogc3RyaW5nKSA9PiAoZSkgPT4ge1xyXG4gICAgY29uc3QgbW9kYWwgPSBlLnRhcmdldC5jbG9zZXN0KGlnbm9yZSk7XHJcbiAgICBpZiAobW9kYWwpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxufTtcclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmNvbnN0IHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cyA9IChlKSA9PiB7XHJcbiAgICBpZiAoIXNjcm9sbEFibGVLZXlzLmhhcyhlLmtleUNvZGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBwcmV2ZW50RGVmYXVsdChlKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmxldCBzY3JvbGxFdmVudHMgPSBbXHJcbiAgICB7IG5hbWU6IFwid2hlZWxcIiwgY2FsbGJhY2s6IG51bGwgfSxcclxuICAgIHsgbmFtZTogXCJ0b3VjaG1vdmVcIiwgY2FsbGJhY2s6IG51bGwgfSxcclxuICAgIHsgbmFtZTogXCJET01Nb3VzZVNjcm9sbFwiLCBjYWxsYmFjazogbnVsbCB9XHJcbl07XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKi9cclxuY29uc3QgZGlzYWJsZVNjcm9sbCA9IChpZ25vcmU6IHN0cmluZykgPT4ge1xyXG4gICAgc2Nyb2xsRXZlbnRzID0gc2Nyb2xsRXZlbnRzLm1hcCgoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBjYWxsYmFjayA9IHByZXZlbnREZWZhdWx0KGlnbm9yZSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQubmFtZSwgY2FsbGJhY2ssIHsgcGFzc2l2ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4uZXZlbnQsXHJcbiAgICAgICAgICAgIGNhbGxiYWNrXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cyk7XHJcbn07XHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5jb25zdCBlbmFibGVTY3JvbGwgPSAoKSA9PiB7XHJcbiAgICBzY3JvbGxFdmVudHMgPSBzY3JvbGxFdmVudHMubWFwKChldmVudCkgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50Lm5hbWUsIGV2ZW50LmNhbGxiYWNrKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi5ldmVudCxcclxuICAgICAgICAgICAgY2FsbGJhY2s6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgcHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBIENvbXBvbmVudCB0byBzaG93IGFsbCByZWdpc3RlcmVkIHNob3J0Y3V0IGluIHRoZSBhcHBcclxuICogaXQgaXMgc2hvd24gYXMgYSBtb2RhbFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJuZy1rZXlib2FyZC1zaG9ydGN1dHMtaGVscFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9uZy1rZXlib2FyZC1zaG9ydGN1dHMtaGVscC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL25nLWtleWJvYXJkLXNob3J0Y3V0cy1oZWxwLmNvbXBvbmVudC5zY3NzXCJdLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICAgIHRyaWdnZXIoXCJlbnRlckFuaW1hdGlvblwiLCBbXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oXCI6ZW50ZXJcIiwgW1xyXG4gICAgICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06IFwidHJhbnNsYXRlWCgtMTAwJSlcIiwgb3BhY2l0eTogMCB9KSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgXCIwLjMzcyBjdWJpYy1iZXppZXIoMCwwLDAuMywxKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZVgoMClcIiwgb3BhY2l0eTogMSB9KVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbihcIjpsZWF2ZVwiLCBbXHJcbiAgICAgICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogXCJ0cmFuc2xhdGVYKDApXCIsIG9wYWNpdHk6IDEgfSksXHJcbiAgICAgICAgICAgICAgICBhbmltYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiMC4yM3MgY3ViaWMtYmV6aWVyKDAsMCwwLjMsMSlcIixcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogXCJ0cmFuc2xhdGVYKC0xMDAlKVwiLCBvcGFjaXR5OiAwIH0pXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgXSksXHJcbiAgICAgICAgdHJpZ2dlcihcIm92ZXJsYXlBbmltYXRpb25cIiwgW1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKFwiOmVudGVyXCIsIFtcclxuICAgICAgICAgICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMCB9KSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGUoXCIxcyBjdWJpYy1iZXppZXIoMCwwLDAuMywxKVwiLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpXHJcbiAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKFwiOmxlYXZlXCIsIFtcclxuICAgICAgICAgICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMSB9KSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGUoXCIxcyBjdWJpYy1iZXppZXIoMCwwLDAuMywxKVwiLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgXSlcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEtleWJvYXJkU2hvcnRjdXRzSGVscENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNhYmxlIHNjcm9sbGluZyB3aGlsZSBtb2RhbCBpcyBvcGVuXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIGRpc2FibGVTY3JvbGxpbmcgPSB0cnVlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2tleTogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBjbGFzc05hbWUgPSBcImhlbHAtbW9kYWxcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgZGVzY3JpcHRpb24gdGhhdCB3aWxsIGJlIHNob3duIGluIHRoZSBoZWxwIG1lbnUuXHJcbiAgICAgKiBNVVNUIGFsbW9zdCBwcm92aWRlIGEgbGFiZWwgZm9yIHRoZSBrZXkgdG8gYmUgc2hvd25cclxuICAgICAqIGluIHRoZSBoZWxwIG1lbnVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkga2V5RGVzY3JpcHRpb246IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsYWJlbCB0byBncm91cCBieSB0aGUgaGVscCBtZW51IHRvZ2dsZSBzaG9ydGN1dC5cclxuICAgICAqIG11c3QgcHJvdmlkZSBhIGRlc2NyaXB0aW9uIGZvciB0aGUga2V5IHRvIHNob3dcclxuICAgICAqIGluIHRoZSBoZWxwIG1lbnVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkga2V5TGFiZWw6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsYWJlbCB0byBncm91cCBieSB0aGUgaGVscCBtZW51IGNsb3NlIHNob3J0Y3V0LlxyXG4gICAgICogbXVzdCBwcm92aWRlIGEgZGVzY3JpcHRpb24gZm9yIHRoZSBrZXkgdG8gc2hvd1xyXG4gICAgICogaW4gdGhlIGhlbHAgbWVudVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBjbG9zZUtleUxhYmVsOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIGRlc2NyaXB0aW9uIHRoYXQgd2lsbCBiZSBzaG93biBpbiB0aGUgaGVscCBtZW51LlxyXG4gICAgICogTVVTVCBhbG1vc3QgcHJvdmlkZSBhIGxhYmVsIGZvciB0aGUga2V5IHRvIGJlIHNob3duXHJcbiAgICAgKiBpbiB0aGUgaGVscCBtZW51XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIGNsb3NlS2V5RGVzY3JpcHRpb246IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBzaG9ydGN1dCB0byBzaG93L2hpZGUgdGhlIGhlbHAgc2NyZWVuXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQga2V5KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9rZXkgPSB2YWx1ZTtcclxuICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY2xlYXJJZHMpIHtcclxuICAgICAgICAgICAgdGhpcy5rZXlib2FyZC5yZW1vdmUodGhpcy5jbGVhcklkcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xlYXJJZHMgPSB0aGlzLmFkZFNob3J0Y3V0KHtcclxuICAgICAgICAgICAga2V5OiB2YWx1ZSxcclxuICAgICAgICAgICAgcHJldmVudERlZmF1bHQ6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbW1hbmQ6ICgpID0+IHRoaXMudG9nZ2xlKCksXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmtleURlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICBsYWJlbDogdGhpcy5rZXlMYWJlbFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkU2hvcnRjdXQoc2hvcnRjdXQ6IFNob3J0Y3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5Ym9hcmQuYWRkKHNob3J0Y3V0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jbG9zZUtleTtcclxuICAgIEBJbnB1dCgpIGNsb3NlS2V5O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHRpdGxlIG9mIHRoZSBoZWxwIHNjcmVlblxyXG4gICAgICogQGRlZmF1bHQ6IFwiS2V5Ym9hcmQgc2hvcnRjdXRzXCJcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgdGl0bGUgPSBcIktleWJvYXJkIHNob3J0Y3V0c1wiO1xyXG4gICAgLyoqXHJcbiAgICAgKiBXaGF0IG1lc3NhZ2UgdG8gc2hvdyB3aGVuIG5vIHNob3J0Y3V0cyBhcmUgYXZhaWxhYmxlIG9uIHRoZSBwYWdlLlxyXG4gICAgICogQGRlZmF1bHQgXCJObyBzaG9ydGN1dHMgYXZhaWxhYmxlXCJcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgZW1wdHlNZXNzYWdlID0gXCJObyBzaG9ydGN1dHMgYXZhaWxhYmxlXCI7XHJcbiAgICAvKipcclxuICAgICAqIEBpZ25vcmVcclxuICAgICAqL1xyXG4gICAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgICAvKipcclxuICAgICAqIEBpZ25vcmVcclxuICAgICAqL1xyXG4gICAgc2hvcnRjdXRzOiBSZWNvcmQ8XCJsYWJlbFwiLCB7IGtleTogc3RyaW5nW107IGxhYmVsOiBzdHJpbmc7IGRlc2NyaXB0aW9uOiBzdHJpbmcgfVtdPjtcclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICovXHJcbiAgICBzaG93aW5nID0gZmFsc2U7XHJcbiAgICAvKipcclxuICAgICAqIEBpZ25vcmVcclxuICAgICAqL1xyXG4gICAgbGFiZWxzOiBzdHJpbmdbXTtcclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGJvZHlQb3J0YWxIb3N0OiBEb21Qb3J0YWxPdXRsZXQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxyXG4gICAgICAgIHByaXZhdGUga2V5Ym9hcmQ6IEtleWJvYXJkU2hvcnRjdXRzU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBrZXlib2FyZEhlbHA6IEtleWJvYXJkU2hvcnRjdXRzSGVscFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmJvZHlQb3J0YWxIb3N0ID0gbmV3IERvbVBvcnRhbE91dGxldChcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keSxcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICAgICAgICAgIHRoaXMuYXBwUmVmLFxyXG4gICAgICAgICAgICB0aGlzLmluamVjdG9yXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldmVhbCB0aGUgaGVscCBzY3JlZW4gbWFudWFsbHkuXHJcbiAgICAgKi9cclxuICAgIHJldmVhbCgpOiBLZXlib2FyZFNob3J0Y3V0c0hlbHBDb21wb25lbnQge1xyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVTY3JvbGxpbmcpIHtcclxuICAgICAgICAgICAgZGlzYWJsZVNjcm9sbChgLiR7dGhpcy5jbGFzc05hbWV9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBvcnRhbCA9IG5ldyBUZW1wbGF0ZVBvcnRhbCh0aGlzLnRlbXBsYXRlLCB0aGlzLnZpZXdDb250YWluZXIpO1xyXG4gICAgICAgIHRoaXMuYm9keVBvcnRhbEhvc3QuYXR0YWNoKHBvcnRhbCk7XHJcbiAgICAgICAgdGhpcy5zaG93aW5nID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIGhlbHAgc2NyZWVuIGlzIHZpc2libGUuXHJcbiAgICAgKiBAcmV0dXJucyBib29sZWFuXHJcbiAgICAgKi9cclxuICAgIHZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9keVBvcnRhbEhvc3QuaGFzQXR0YWNoZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZGUgdGhlIGhlbHAgc2NyZWVuIG1hbnVhbGx5LlxyXG4gICAgICovXHJcbiAgICBoaWRlKCk6IEtleWJvYXJkU2hvcnRjdXRzSGVscENvbXBvbmVudCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZVNjcm9sbGluZykge1xyXG4gICAgICAgICAgICBlbmFibGVTY3JvbGwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmJvZHlQb3J0YWxIb3N0Lmhhc0F0dGFjaGVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYm9keVBvcnRhbEhvc3QuZGV0YWNoKCk7XHJcbiAgICAgICAgdGhpcy5zaG93aW5nID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKi9cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmNsZWFySWRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMua2V5Ym9hcmQucmVtb3ZlKHRoaXMuY2xlYXJJZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jbG9zZUtleUlkcykge1xyXG4gICAgICAgICAgICB0aGlzLmtleWJvYXJkLnJlbW92ZSh0aGlzLmNsb3NlS2V5SWRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXRJZCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0SWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3cvSGlkZSB0aGUgaGVscCBzY3JlZW4gbWFudWFsbHkuXHJcbiAgICAgKi9cclxuICAgIHRvZ2dsZSgpOiBLZXlib2FyZFNob3J0Y3V0c0hlbHBDb21wb25lbnQge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSgpID8gdGhpcy5oaWRlKCkgOiB0aGlzLnJldmVhbCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uTGlrZTtcclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsZWFySWRzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsb3NlS2V5SWRzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdGltZW91dElkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICovXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMua2V5Ym9hcmRIZWxwLnNob3J0Y3V0cyRcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxyXG4gICAgICAgICAgICAgICAgbWFwKChzaG9ydGN1dHMpID0+IGdyb3VwQnkoc2hvcnRjdXRzLCBcImxhYmVsXCIpKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHNob3J0Y3V0cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9ydGN1dHMgPSBzaG9ydGN1dHM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVscyA9IE9iamVjdC5rZXlzKHNob3J0Y3V0cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIWNoYW5nZXNbXCJjbG9zZUtleVwiXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jbG9zZUtleUlkcykge1xyXG4gICAgICAgICAgICB0aGlzLmtleWJvYXJkLnJlbW92ZSh0aGlzLmNsb3NlS2V5SWRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbG9zZUtleUlkcyA9IHRoaXMuYWRkU2hvcnRjdXQoe1xyXG4gICAgICAgICAgICBrZXk6IGNoYW5nZXNbXCJjbG9zZUtleVwiXS5jdXJyZW50VmFsdWUsXHJcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiB0cnVlLFxyXG4gICAgICAgICAgICBjb21tYW5kOiAoKSA9PiB0aGlzLmhpZGUoKSxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuY2xvc2VLZXlEZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgbGFiZWw6IHRoaXMuY2xvc2VLZXlEZXNjcmlwdGlvblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsIjxuZy10ZW1wbGF0ZT5cclxuICAgIDxkaXYgY2xhc3M9XCJoZWxwLW1vZGFsX19jb250YWluZXJcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiJ21vZGFsLScgKyB0aXRsZVwiIHJvbGU9XCJkaWFsb2dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwie3tjbGFzc05hbWV9fVwiIFtAZW50ZXJBbmltYXRpb25dICpuZ0lmPVwic2hvd2luZ1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgIDxoMyBpZD1cIm1vZGFsLXt7dGl0bGV9fVwiIGNsYXNzPVwidGl0bGVfX3RleHRcIj57e3RpdGxlfX08L2gzPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlbHAtbW9kYWxfX2JvZHlcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWxhYmVscy5sZW5ndGhcIj5cclxuICAgICAgICAgICAgICAgICAgICB7e2VtcHR5TWVzc2FnZX19XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDx1bCAqbmdGb3I9XCJsZXQgbGFiZWwgb2YgbGFiZWxzXCIgY2xhc3M9XCJoZWxwLW1vZGFsX19saXN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cIml0ZW0tZ3JvdXAtbGFiZWxcIj57e2xhYmVsfX08L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bmcta2V5Ym9hcmQtc2hvcnRjdXRzLWhlbHAtaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBzaG9ydGN1dCBvZiBzaG9ydGN1dHNbbGFiZWxdOyBsZXQgaSA9IGluZGV4XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2hvcnRjdXRdPVwic2hvcnRjdXRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpbmRleF09XCJpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPjwvbmcta2V5Ym9hcmQtc2hvcnRjdXRzLWhlbHAtaXRlbT5cclxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJoZWxwLW1vZGFsX19iYWNrZHJvcFwiIFtAb3ZlcmxheUFuaW1hdGlvbl0gKG1vdXNlZG93bik9XCJoaWRlKClcIiAqbmdJZj1cInNob3dpbmdcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L25nLXRlbXBsYXRlPlxyXG4iXX0=