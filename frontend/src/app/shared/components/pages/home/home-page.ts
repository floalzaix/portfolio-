import { Component, effect, inject, ElementRef, signal } from '@angular/core';
import { combineLatest, map, throttleTime } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { getScrollSign } from '../../../utils/scroll-utils';

// Architecture

abstract class State {
  public readonly progress = signal(0);

  //
  //   Overrides
  //

  public is(state: new (...args: any[]) => State): boolean {
    return this instanceof state;
  }
};


//
//   States
//

class StateEntry extends State {}

class StateIntro extends State {}


//
//   Component
//

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  protected readonly StateEntry = StateEntry;
  protected readonly StateIntro = StateIntro;

  //
  //   Interfaces
  //

  private readonly elementRef = inject(ElementRef);

  //
  //   Bindings
  //

  /**
   * Input bindings
   */

  // Observables

  public readonly $wheelEvent = signal<WheelEvent | null>(null);
  public readonly wheelEvent$ = toObservable(this.$wheelEvent);

  // Combined latestl

  private readonly inputBindings = toSignal(combineLatest([
    this.wheelEvent$
  ]).pipe(
    throttleTime(16),
    map(([wheelEvent]) => ({ wheelEvent }))
  ));

  //
  //   State machine
  //

  public readonly state = signal<State>(
    new StateEntry()
  );

  /**
   * State machine
   */

  private readonly stateMachine = effect(() => {
    console.log('stateMachine', this.state());

    switch (this.state().constructor.name) {
      case "StateEntry": {
        break;
      }
      case "StateIntro": {
        break;
      }
    }
  });

  /**
   * State handlers
   */

  /**
   * When the user arrives to the home page
   *
   * Actions:
   * - lockScroll: Locks the scroll
   * - A_T_1: Title entry lines translating
   *
   * Output:
   * - INTRO: When the first animation is done and won't be
   * coming back until refresh
   */
  private readonly entryHandler = effect(() => {
    if (!this.state().is(StateEntry)) return;

    console.log('ENTRY', this.state());
    console.log('ENTRY', this.inputBindings());

    const inputs = this.inputBindings();

    if (inputs?.wheelEvent) {
      this.A_T_1(inputs.wheelEvent);
    }
  });

  //
  //   Animations
  //

  /**
   * Title entry lines animation sequence
   *
   * Actions:
   * - Updating the lines styles
   * - Updating the lines positions
   *
   * @param wheelEvent - The wheel event that triggered the animation
   */
  private A_T_1(wheelEvent: WheelEvent) {
    // Getting the scroll sign
    const scrollSign = getScrollSign(wheelEvent);

    // Updating the entry progress
    // this.state().progress.set(
    //   this.state().progress() + scrollSign / 100
    // );

    // Updating the lines styles
    // this.elementRef.nativeElement.querySelector(
    //   '#home-container-left-line-v'
    // ).style.setProperty('--entry-progress', this.state().progress());
  };

  //
  //   Other methods
  //
}
