import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TrainingService } from '../_services/training.service';
import * as fromTraining from './training.reducer';
import * as TRAINING from './training.actions';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit
// , OnDestroy
{
  // ongoingTraining = false;
  // exerciseChangedSubscription: Subscription;
  // Moving to an Observable that get set from the store instead of the subscription.
  ongoingTraining$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private store: Store<{training: fromTraining.State}>) { }
  ngOnInit(): void {
    // this.exerciseChangedSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
    //   if (exercise) {
    //     this.ongoingTraining = true;
    //   } else {
    //     this.ongoingTraining = false;
    //   }
    // });
    // Moving from the Subscription to the Store to get the isactive training.
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);

  }
  // No need for ngOnDestroy as there is nothing to subscribe
  // ngOnDestroy(): void {
  //   if (this.exerciseChangedSubscription) {
  //     this.exerciseChangedSubscription.unsubscribe();
  //   }
  // }

}
