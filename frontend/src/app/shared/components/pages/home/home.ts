import { Component, effect, inject, ElementRef, signal, computed } from '@angular/core';
import { fromEvent, map, startWith, throttleTime } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

enum State {
  ENTRY,
  INTRO,
  CONTENT1
}

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  //
  //   Interfaces
  //

  private readonly elementRed = inject(ElementRef);

  //
  //   Bindings
  //

  // INPUTS

  private readonly scrollValue =
    globalThis.window === undefined ?
    signal(0) : toSignal(fromEvent(globalThis, 'scroll').pipe(
      throttleTime(16),
      map(() => globalThis.scrollY),
      startWith(globalThis.scrollY)
    ));

  public readonly $wheelEvent = signal<WheelEvent | null>(null);

  //
  //   States
  //

  public readonly state = computed<State>(() => State.ENTRY);

  //
  //   State machine
  //

  private readonly stateMachine = effect(() => {
    switch (this.state()) {
      case State.ENTRY:
        break;
      case State.INTRO:
        break;
      case State.CONTENT1:
        break;
    }
  });

  //
  //   Effects
  //

  private readonly scrollEffect = effect(() => {
    // Getting the lines
    const lineLeftV = this.elementRed.nativeElement.querySelector(
      '#home-container-left-line-v'
    );
    const lineLeftH = this.elementRed.nativeElement.querySelector(
      '#home-container-left-line-h'
    );
    const lineRightV = this.elementRed.nativeElement.querySelector(
      '#home-container-right-line-v'
    );
    const lineRightH = this.elementRed.nativeElement.querySelector(
      '#home-container-right-line-h'
    );

    // Updating the lines styles
    lineLeftV.style.width = `translate`;
  });
}
