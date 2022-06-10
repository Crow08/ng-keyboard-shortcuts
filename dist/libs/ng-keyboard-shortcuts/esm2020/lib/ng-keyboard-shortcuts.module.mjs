import { NgModule } from "@angular/core";
import { KeyboardShortcutsComponent } from "./ng-keyboard-shortcuts.component";
import { KeyboardShortcutsService } from "./ng-keyboard-shortcuts.service";
import { KeyboardShortcutsHelpService } from "./ng-keyboard-shortcuts-help.service";
import { KeyboardShortcutsSelectService } from "./ng-keyboard-shortcuts-select.service";
import { KeyboardShortcutsDirective } from "./ng-keyboard-shortcuts.directive";
import { KeyboardShortcutsHelpComponent } from "./ng-keyboard-shortcuts-help.component";
import { KeyboardShortcutsHelpItemComponent } from "./ng-keyboard-shortcuts-help-item.component";
import { CommonModule } from "@angular/common";
import { KeyboardShortcutsPluginProvider } from "./ng-keyboard-shortcuts.plugin";
import { KeyboardShortcutComponent } from "./keyboard-shortcut.component";
import * as i0 from "@angular/core";
export class KeyboardShortcutsModule {
    static forRoot() {
        return {
            ngModule: KeyboardShortcutsModule,
            providers: [
                KeyboardShortcutsService,
                KeyboardShortcutsHelpService,
                KeyboardShortcutsSelectService,
                KeyboardShortcutsPluginProvider
            ]
        };
    }
}
KeyboardShortcutsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
KeyboardShortcutsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsModule, declarations: [KeyboardShortcutsComponent,
        KeyboardShortcutsDirective,
        KeyboardShortcutsHelpComponent,
        KeyboardShortcutsHelpItemComponent,
        KeyboardShortcutComponent], imports: [CommonModule], exports: [KeyboardShortcutsComponent,
        KeyboardShortcutsDirective,
        KeyboardShortcutsHelpComponent,
        KeyboardShortcutComponent] });
KeyboardShortcutsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.7", ngImport: i0, type: KeyboardShortcutsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    entryComponents: [KeyboardShortcutsHelpComponent],
                    declarations: [
                        KeyboardShortcutsComponent,
                        KeyboardShortcutsDirective,
                        KeyboardShortcutsHelpComponent,
                        KeyboardShortcutsHelpItemComponent,
                        KeyboardShortcutComponent
                    ],
                    exports: [
                        KeyboardShortcutsComponent,
                        KeyboardShortcutsDirective,
                        KeyboardShortcutsHelpComponent,
                        KeyboardShortcutComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcta2V5Ym9hcmQtc2hvcnRjdXRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvbmcta2V5Ym9hcmQtc2hvcnRjdXRzL3NyYy9saWIvbmcta2V5Ym9hcmQtc2hvcnRjdXRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNqRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sK0JBQStCLENBQUM7O0FBbUIxRSxNQUFNLE9BQU8sdUJBQXVCO0lBQ3pCLE1BQU0sQ0FBQyxPQUFPO1FBQ2pCLE9BQU87WUFDSCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFNBQVMsRUFBRTtnQkFDUCx3QkFBd0I7Z0JBQ3hCLDRCQUE0QjtnQkFDNUIsOEJBQThCO2dCQUM5QiwrQkFBK0I7YUFDbEM7U0FDSixDQUFDO0lBQ04sQ0FBQzs7b0hBWFEsdUJBQXVCO3FIQUF2Qix1QkFBdUIsaUJBYjVCLDBCQUEwQjtRQUMxQiwwQkFBMEI7UUFDMUIsOEJBQThCO1FBQzlCLGtDQUFrQztRQUNsQyx5QkFBeUIsYUFQbkIsWUFBWSxhQVVsQiwwQkFBMEI7UUFDMUIsMEJBQTBCO1FBQzFCLDhCQUE4QjtRQUM5Qix5QkFBeUI7cUhBR3BCLHVCQUF1QixZQWhCdkIsQ0FBQyxZQUFZLENBQUM7MkZBZ0JkLHVCQUF1QjtrQkFqQm5DLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixlQUFlLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztvQkFDakQsWUFBWSxFQUFFO3dCQUNWLDBCQUEwQjt3QkFDMUIsMEJBQTBCO3dCQUMxQiw4QkFBOEI7d0JBQzlCLGtDQUFrQzt3QkFDbEMseUJBQXlCO3FCQUM1QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsMEJBQTBCO3dCQUMxQiwwQkFBMEI7d0JBQzFCLDhCQUE4Qjt3QkFDOUIseUJBQXlCO3FCQUM1QjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgS2V5Ym9hcmRTaG9ydGN1dHNDb21wb25lbnQgfSBmcm9tIFwiLi9uZy1rZXlib2FyZC1zaG9ydGN1dHMuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEtleWJvYXJkU2hvcnRjdXRzU2VydmljZSB9IGZyb20gXCIuL25nLWtleWJvYXJkLXNob3J0Y3V0cy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEtleWJvYXJkU2hvcnRjdXRzSGVscFNlcnZpY2UgfSBmcm9tIFwiLi9uZy1rZXlib2FyZC1zaG9ydGN1dHMtaGVscC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEtleWJvYXJkU2hvcnRjdXRzU2VsZWN0U2VydmljZSB9IGZyb20gXCIuL25nLWtleWJvYXJkLXNob3J0Y3V0cy1zZWxlY3Quc2VydmljZVwiO1xyXG5pbXBvcnQgeyBLZXlib2FyZFNob3J0Y3V0c0RpcmVjdGl2ZSB9IGZyb20gXCIuL25nLWtleWJvYXJkLXNob3J0Y3V0cy5kaXJlY3RpdmVcIjtcclxuaW1wb3J0IHsgS2V5Ym9hcmRTaG9ydGN1dHNIZWxwQ29tcG9uZW50IH0gZnJvbSBcIi4vbmcta2V5Ym9hcmQtc2hvcnRjdXRzLWhlbHAuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEtleWJvYXJkU2hvcnRjdXRzSGVscEl0ZW1Db21wb25lbnQgfSBmcm9tIFwiLi9uZy1rZXlib2FyZC1zaG9ydGN1dHMtaGVscC1pdGVtLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IEtleWJvYXJkU2hvcnRjdXRzUGx1Z2luUHJvdmlkZXIgfSBmcm9tIFwiLi9uZy1rZXlib2FyZC1zaG9ydGN1dHMucGx1Z2luXCI7XHJcbmltcG9ydCB7IEtleWJvYXJkU2hvcnRjdXRDb21wb25lbnQgfSBmcm9tIFwiLi9rZXlib2FyZC1zaG9ydGN1dC5jb21wb25lbnRcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGVudHJ5Q29tcG9uZW50czogW0tleWJvYXJkU2hvcnRjdXRzSGVscENvbXBvbmVudF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBLZXlib2FyZFNob3J0Y3V0c0NvbXBvbmVudCxcclxuICAgICAgICBLZXlib2FyZFNob3J0Y3V0c0RpcmVjdGl2ZSxcclxuICAgICAgICBLZXlib2FyZFNob3J0Y3V0c0hlbHBDb21wb25lbnQsXHJcbiAgICAgICAgS2V5Ym9hcmRTaG9ydGN1dHNIZWxwSXRlbUNvbXBvbmVudCxcclxuICAgICAgICBLZXlib2FyZFNob3J0Y3V0Q29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIEtleWJvYXJkU2hvcnRjdXRzQ29tcG9uZW50LFxyXG4gICAgICAgIEtleWJvYXJkU2hvcnRjdXRzRGlyZWN0aXZlLFxyXG4gICAgICAgIEtleWJvYXJkU2hvcnRjdXRzSGVscENvbXBvbmVudCxcclxuICAgICAgICBLZXlib2FyZFNob3J0Y3V0Q29tcG9uZW50XHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBLZXlib2FyZFNob3J0Y3V0c01vZHVsZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxLZXlib2FyZFNob3J0Y3V0c01vZHVsZT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBLZXlib2FyZFNob3J0Y3V0c01vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZFNob3J0Y3V0c1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBLZXlib2FyZFNob3J0Y3V0c0hlbHBTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRTaG9ydGN1dHNTZWxlY3RTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgS2V5Ym9hcmRTaG9ydGN1dHNQbHVnaW5Qcm92aWRlclxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG4iXX0=