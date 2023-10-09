import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ProgressService {
  private load: BehaviorSubject<boolean>;

  constructor() {
    this.load = new BehaviorSubject<boolean>(false);
  }

  getProgress(): Observable<boolean> {
    return this.load.asObservable();
  }

  setProgress(value: boolean): void {
    this.load.next(value);
  }
}
