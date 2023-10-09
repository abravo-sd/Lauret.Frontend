import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgressService } from './progress.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  animations: [
    trigger('progressFadeAnimation', [
      state('in', style({ opacity: 1, display: 'flex' })),
      state('out', style({ opacity: 0, display: 'none' })),
      transition('out => in', [animate('.700ms')]),
      transition('in => out', [animate('.700ms')]),
    ]),
  ],
})
export class ProgressComponent implements OnInit, OnDestroy {
  @Input() visible: boolean;
  private subscription: Subscription;

  constructor(private readonly progress: ProgressService) {
    this.visible = false;
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.subscription.add(this.progress.getProgress().subscribe((load) => (this.visible = load)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
