import { ApplicationRef, ComponentFactoryResolver, ElementRef, Injector, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from "@angular/core";
import { KeyboardShortcutsService } from "./ng-keyboard-shortcuts.service";
import { KeyboardShortcutsHelpService } from "./ng-keyboard-shortcuts-help.service";
import * as i0 from "@angular/core";
/**
 * A Component to show all registered shortcut in the app
 * it is shown as a modal
 */
export declare class KeyboardShortcutsHelpComponent implements OnInit, OnDestroy, OnChanges {
    private componentFactoryResolver;
    private appRef;
    private keyboard;
    private element;
    private keyboardHelp;
    private viewContainer;
    private injector;
    /**
     * Disable scrolling while modal is open
     */
    disableScrolling: boolean;
    /**
     * @ignore
     */
    private _key;
    className: string;
    /**
     * A description that will be shown in the help menu.
     * MUST almost provide a label for the key to be shown
     * in the help menu
     */
    keyDescription: string;
    /**
     * The label to group by the help menu toggle shortcut.
     * must provide a description for the key to show
     * in the help menu
     */
    keyLabel: string;
    /**
     * The label to group by the help menu close shortcut.
     * must provide a description for the key to show
     * in the help menu
     */
    closeKeyLabel: string;
    /**
     * A description that will be shown in the help menu.
     * MUST almost provide a label for the key to be shown
     * in the help menu
     */
    closeKeyDescription: string;
    /**
     * The shortcut to show/hide the help screen
     */
    set key(value: string);
    private addShortcut;
    private _closeKey;
    closeKey: any;
    /**
     * The title of the help screen
     * @default: "Keyboard shortcuts"
     */
    title: string;
    /**
     * What message to show when no shortcuts are available on the page.
     * @default "No shortcuts available"
     */
    emptyMessage: string;
    /**
     * @ignore
     */
    template: TemplateRef<any>;
    /**
     * @ignore
     */
    shortcuts: Record<"label", {
        key: string[];
        label: string;
        description: string;
    }[]>;
    /**
     * @ignore
     */
    showing: boolean;
    /**
     * @ignore
     */
    labels: string[];
    /**
     * @ignore
     */
    private bodyPortalHost;
    /**
     * @ignore
     */
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, keyboard: KeyboardShortcutsService, element: ElementRef, keyboardHelp: KeyboardShortcutsHelpService, viewContainer: ViewContainerRef, injector: Injector);
    /**
     * Reveal the help screen manually.
     */
    reveal(): KeyboardShortcutsHelpComponent;
    /**
     * Check if help screen is visible.
     * @returns boolean
     */
    visible(): boolean;
    /**
     * Hide the help screen manually.
     */
    hide(): KeyboardShortcutsHelpComponent;
    /**
     * @ignore
     */
    ngOnDestroy(): void;
    /**
     * Show/Hide the help screen manually.
     */
    toggle(): KeyboardShortcutsHelpComponent;
    /**
     * @ignore
     */
    private subscription;
    /**
     * @ignore
     */
    private clearIds;
    /**
     * @ignore
     */
    private closeKeyIds;
    /**
     * @ignore
     */
    private timeoutId;
    /**
     * @ignore
     */
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KeyboardShortcutsHelpComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KeyboardShortcutsHelpComponent, "ng-keyboard-shortcuts-help", never, { "disableScrolling": "disableScrolling"; "keyDescription": "keyDescription"; "keyLabel": "keyLabel"; "closeKeyLabel": "closeKeyLabel"; "closeKeyDescription": "closeKeyDescription"; "key": "key"; "closeKey": "closeKey"; "title": "title"; "emptyMessage": "emptyMessage"; }, {}, never, never>;
}
