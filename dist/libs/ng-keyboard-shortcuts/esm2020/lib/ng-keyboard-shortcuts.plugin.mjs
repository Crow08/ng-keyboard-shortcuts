import { Injectable, NgZone } from "@angular/core";
import { EVENT_MANAGER_PLUGINS } from "@angular/platform-browser";
import { KeyboardShortcutsService } from './ng-keyboard-shortcuts.service';
import * as i0 from "@angular/core";
import * as i1 from "./ng-keyboard-shortcuts.service";
export class KeyboardShortcutsPlugin {
    constructor(ngZone, keyboard) {
        this.ngZone = ngZone;
        this.keyboard = keyboard;
    }
    supports(eventName) {
        return eventName.split('.').includes('shortcut');
    }
    addEventListener(element, eventName, originalHandler) {
        const shortcut = eventName
            .split('.');
        const preventDefault = shortcut.includes("prevent");
        if (shortcut.length === 0) {
            throw new Error("please provide a shortcut");
        }
        const [, key, description, label] = shortcut;
        const id = this.keyboard.add({
            key,
            command(event) {
                originalHandler(event);
            },
            description,
            preventDefault,
            label
        });
        return () => {
            this.keyboard.remove(id);
        };
    }
}
KeyboardShortcutsPlugin.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsPlugin, deps: [{ token: i0.NgZone }, { token: i1.KeyboardShortcutsService }], target: i0.ɵɵFactoryTarget.Injectable });
KeyboardShortcutsPlugin.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsPlugin });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsPlugin, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i1.KeyboardShortcutsService }]; } });
export const KeyboardShortcutsPluginProvider = {
    multi: true,
    provide: EVENT_MANAGER_PLUGINS,
    useClass: KeyboardShortcutsPlugin
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcta2V5Ym9hcmQtc2hvcnRjdXRzLnBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvbmcta2V5Ym9hcmQtc2hvcnRjdXRzL3NyYy9saWIvbmcta2V5Ym9hcmQtc2hvcnRjdXRzLnBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUMscUJBQXFCLEVBQWUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQzs7O0FBS3pFLE1BQU0sT0FBTyx1QkFBdUI7SUFHaEMsWUFBb0IsTUFBYyxFQUFVLFFBQWtDO1FBQTFELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUEwQjtJQUM5RSxDQUFDO0lBRUQsUUFBUSxDQUFDLFNBQWlCO1FBQ3RCLE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUVELGdCQUFnQixDQUNaLE9BQU8sRUFDUCxTQUFTLEVBQ1QsZUFBZTtRQUVmLE1BQU0sUUFBUSxHQUFHLFNBQVM7YUFDckIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRWYsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFHO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztTQUNoRDtRQUNELE1BQU0sQ0FBQyxFQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQzVDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQ3pCLEdBQUc7WUFDSCxPQUFPLENBQUMsS0FBMEI7Z0JBQzlCLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUMxQixDQUFDO1lBQ0QsV0FBVztZQUNYLGNBQWM7WUFDZCxLQUFLO1NBQ1IsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxHQUFHLEVBQUU7WUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUM7SUFDTixDQUFDOztvSEFuQ1EsdUJBQXVCO3dIQUF2Qix1QkFBdUI7MkZBQXZCLHVCQUF1QjtrQkFEbkMsVUFBVTs7QUF1Q1gsTUFBTSxDQUFDLE1BQU0sK0JBQStCLEdBQUc7SUFDM0MsS0FBSyxFQUFFLElBQUk7SUFDWCxPQUFPLEVBQUUscUJBQXFCO0lBQzlCLFFBQVEsRUFBRSx1QkFBdUI7Q0FDcEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgTmdab25lfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge0VWRU5UX01BTkFHRVJfUExVR0lOUywgRXZlbnRNYW5hZ2VyfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xyXG5pbXBvcnQge0tleWJvYXJkU2hvcnRjdXRzU2VydmljZX0gZnJvbSAnLi9uZy1rZXlib2FyZC1zaG9ydGN1dHMuc2VydmljZSc7XHJcbmltcG9ydCB7U2hvcnRjdXRFdmVudE91dHB1dH0gZnJvbSAnLi9uZy1rZXlib2FyZC1zaG9ydGN1dHMuaW50ZXJmYWNlcyc7XHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRTaG9ydGN1dHNQbHVnaW4ge1xyXG4gICAgbWFuYWdlcjogRXZlbnRNYW5hZ2VyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUsIHByaXZhdGUga2V5Ym9hcmQ6IEtleWJvYXJkU2hvcnRjdXRzU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIHN1cHBvcnRzKGV2ZW50TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50TmFtZS5zcGxpdCgnLicpLmluY2x1ZGVzKCdzaG9ydGN1dCcpXHJcbiAgICB9XHJcblxyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICBlbGVtZW50LFxyXG4gICAgICAgIGV2ZW50TmFtZSxcclxuICAgICAgICBvcmlnaW5hbEhhbmRsZXJcclxuICAgICk6IEZ1bmN0aW9uIHtcclxuICAgICAgICBjb25zdCBzaG9ydGN1dCA9IGV2ZW50TmFtZVxyXG4gICAgICAgICAgICAuc3BsaXQoJy4nKVxyXG5cclxuICAgICAgICBjb25zdCBwcmV2ZW50RGVmYXVsdCA9IHNob3J0Y3V0LmluY2x1ZGVzKFwicHJldmVudFwiKTtcclxuICAgICAgICBpZiAoc2hvcnRjdXQubGVuZ3RoID09PSAwKSAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJwbGVhc2UgcHJvdmlkZSBhIHNob3J0Y3V0XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBbLGtleSwgZGVzY3JpcHRpb24sIGxhYmVsXSA9IHNob3J0Y3V0O1xyXG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5rZXlib2FyZC5hZGQoe1xyXG4gICAgICAgICAgICBrZXksXHJcbiAgICAgICAgICAgIGNvbW1hbmQoZXZlbnQ6IFNob3J0Y3V0RXZlbnRPdXRwdXQpOiBhbnkge1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxIYW5kbGVyKGV2ZW50KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgcHJldmVudERlZmF1bHQsXHJcbiAgICAgICAgICAgIGxhYmVsXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmtleWJvYXJkLnJlbW92ZShpZCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEtleWJvYXJkU2hvcnRjdXRzUGx1Z2luUHJvdmlkZXIgPSB7XHJcbiAgICBtdWx0aTogdHJ1ZSxcclxuICAgIHByb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUyxcclxuICAgIHVzZUNsYXNzOiBLZXlib2FyZFNob3J0Y3V0c1BsdWdpblxyXG59O1xyXG4iXX0=