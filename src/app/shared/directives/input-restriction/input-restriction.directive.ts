import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgControl } from '@angular/forms';

const enum RestrictionType {
    USER = 'user',
    NAME = 'name',
    EMAIL_PREFIX = 'email-prefix',
    ONLY_NUMBERS = 'number',
    SEARCH = 'search',
    APLHA_NUMERIC = 'alphanumeric',
    KEY = 'key',
    SPECIAL_NAME = 'special-name',
    CLAVE = 'clave',
}

@Directive({
    selector: '[appInputRestriction]',
})
export class InputRestrictionDirective {
    @Input() appInputRestriction: RestrictionType | string;
    @Output() appRestrictionResult: EventEmitter<string>;
    private element: ElementRef;

    constructor(element: ElementRef, private control: NgControl) {
        this.element = element;
        this.appRestrictionResult = new EventEmitter<string>();
    }

    @HostListener('input')
    handleInputChange() {
        const regex = this.getRegex(this.appInputRestriction as RestrictionType);
        const value: string = this.element.nativeElement.value;
        this.element.nativeElement.value = value.replace(regex, '');
        this.appRestrictionResult.emit(value);
        if (this.control && this.control.control && this.control.control.value) {
            this.control.control.setValue(value.replace(regex, ''));
        }
    }

    private getRegex(type: RestrictionType): RegExp {
        let regex: RegExp = null;
        switch (type) {
            case RestrictionType.USER:
                regex = new RegExp(/[\W_]/g);
                break;
            case RestrictionType.NAME:
                regex = new RegExp(/[^a-zA-ZÀ-ÿ ]/g);
                break;
            case RestrictionType.EMAIL_PREFIX:
                regex = new RegExp(/[^a-zA-Z0-9.]/g);
                break;
            case RestrictionType.ONLY_NUMBERS:
                regex = new RegExp(/[\D]/g);
                break;
            case RestrictionType.SEARCH:
                regex = new RegExp(/[<$#\"!>$%&;_='’*~+°`¡¬\'\-?$^{}()|[\]\\]/g);
                break;
            case RestrictionType.APLHA_NUMERIC:
                regex = new RegExp(/[<$#\"!>$%&;_=@:'’*~+°`¡¬\'\-?$^{}()|[\]\\]/g);
                break;
            case RestrictionType.KEY:
                regex = new RegExp(/[^a-zA-Z0-9\-_]/g);
                break;
            case RestrictionType.CLAVE:
                regex = new RegExp(/[^a-zA-Z0-9\-_]/g);
                break;
            case RestrictionType.SPECIAL_NAME:
                regex = new RegExp(/[^a-zA-Z0-9\-_ ]/g);
                break;
            default:
                regex = new RegExp(/[<$#\"!>$%&\/;_='’*~+°`¡¬\'\-?$^{}()|[\]\\]/g);
        }

        return regex;
    }
}
