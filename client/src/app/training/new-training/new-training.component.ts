import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from 'src/app/_models/exercise.model';
import { TrainingService } from 'src/app/_services/training.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from 'src/app/shared/ui.service';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  // exercises: Exercise[];
  // exercisesSubscription = new Subscription();
  // Moving exercises to store and converting them to be an observable
  exercises$: Observable<Exercise[]>;

  // isLoading = false;
  isLoading$: Observable<boolean>;
  // private loadingSubs: Subscription;
  constructor(
    public trainingService: TrainingService,
    private firestore: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) { }
  ngOnInit(): void {
    // this.loadingSubs = this.uiService
    //   .loadingSubjectChanged
    //   .subscribe(isLoading => this.isLoading = isLoading);
    this.isLoading$ = this.store.select(fromRoot.getIsLoadingState);
    // this.exercisesSubscription = this.trainingService
    //   .exercisesChanged
    //   .subscribe(
    //     (exercises: Exercise[]) => {
    //       this.exercises = exercises;
    //     }
    //   );
    // Moving the exercises to be retrieved from the store.
    this.exercises$ = this.store.select(fromTraining.getAvailableTrainings);
    this.fetchExercises();
  }
  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }
  fetchExercises(): void {
    this.trainingService.fetchAvailableExercises();
  }
  ngOnDestroy(): void {
    // No need for ngOnDestroy as there is nothing to unsubscribe
    // if (this.exercisesSubscription) {
    //   this.exercisesSubscription.unsubscribe();
    // }
    // if (this.loadingSubs) {
    //   this.loadingSubs.unsubscribe();
    // }
  }

}
