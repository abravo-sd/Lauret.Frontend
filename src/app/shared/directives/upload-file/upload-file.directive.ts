import { DOCUMENT } from '@angular/common';
import {
  Directive,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Utils } from 'src/app/utils/utils';

@Directive({
  selector: 'button[uploadFile]',
})
export class UploadFileDirective implements OnInit, OnChanges, OnDestroy {
  @Input() accept: string;
  @Input() multiple: boolean;
  @Output() changeFile: EventEmitter<File[]>;
  @Output() invalidFile: EventEmitter<File[]>;
  private inputRef: HTMLInputElement;
  private extensions: string[];

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    this.accept = '*';
    this.inputRef = null;
    this.multiple = false;
    this.extensions = [];
    this.changeFile = new EventEmitter<File[]>();
    this.invalidFile = new EventEmitter<File[]>();
  }

  private static makeId(): string {
    const length = 20;
    let s = '';
    while (s.length < length) {
      s += Math.random()
        .toString(36)
        .substr(2, length - s.length);
    }
    return s;
  }

  private get acceptAll(): boolean {
    return this.accept === '*';
  }

  @HostListener('click')
  click(): void {
    this.inputRef.click();
  }

  ngOnInit(): void {
    this.injectInput();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('accept' in changes) {
      this.accept = this.accept || '*';
      this.parseAcceptAtr();
      if (this.inputRef) {
        this.inputRef.accept = this.accept;
      }
    }
    if ('multiple' in changes && this.inputRef) {
      this.inputRef.multiple = this.multiple;
    }
  }

  ngOnDestroy(): void {
    this.removeInput();
  }

  private injectInput(): void {
    this.inputRef = this.document.createElement('input');
    this.inputRef.id = UploadFileDirective.makeId();
    this.inputRef.type = 'file';
    this.inputRef.accept = this.accept;
    this.inputRef.multiple = this.multiple;
    this.inputRef.style.display = 'none';
    this.inputRef.addEventListener('change', this.onChange.bind(this));
    this.document.body.appendChild(this.inputRef);
  }

  private removeInput(): void {
    if (this.inputRef) {
      this.document.body.removeChild(this.inputRef);
    }
  }

  private parseAcceptAtr(): void {
    this.extensions = [];
    if (this.acceptAll) {
      return;
    }
    this.extensions = this.accept
      .replace(',', '')
      .split('.')
      .filter((ext) => ext)
      .map((ext) => `.${ext.trim()}`);
  }

  private onChange(ev: any): void {
    const files = ev.target.files as FileList;
    if (!files || files.length === 0) {
      return;
    }
    if (this.acceptAll) {
      this.changeFile.emit(Array.from(files));
    } else {
      const result = Utils.checkExtFiles(Array.from(files), this.extensions);
      if (result.invalid.length > 0) {
        this.invalidFile.emit(result.invalid);
      }
      if (result.valid.length > 0) {
        this.changeFile.emit(result.valid);
        this.inputRef.value = '';
      }
    }
  }
}
