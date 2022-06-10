import { OnDestroy, OnChanges, SimpleChanges, AfterViewInit, EventEmitter } from '@angular/core';
import { AllowIn } from './ng-keyboard-shortcuts.interfaces';
import { KeyboardShortcutsService } from './ng-keyboard-shortcuts.service';
import * as i0 from "@angular/core";
export declare class KeyboardShortcutComponent implements AfterViewInit, OnDestroy, OnChanges {
    private keyboard;
    constructor(keyboard: KeyboardShortcutsService);
    private clearId;
    description: string;
    label: string;
    preventDefault: boolean;
    allowIn: AllowIn[];
    key: string | string[];
    target: HTMLElement;
    throttleTime: number;
    fire: EventEmitter<any>;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KeyboardShortcutComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KeyboardShortcutComponent, "ng-keyboard-shortcut", never, { "description": "description"; "label": "label"; "preventDefault": "preventDefault"; "allowIn": "allowIn"; "key": "key"; "target": "target"; "throttleTime": "throttleTime"; }, { "fire": "fire"; }, never, ["*"]>;
}
