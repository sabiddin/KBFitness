import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject, Subscription } from 'rxjs';
import { catchError, filter, map, take, tap } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';
import { Exercise } from '../_models/exercise.model';
import * as UI from '../shared/ui.actions';
import * as TRAINING from '../training/training.actions';
import * as fromTraining from '../training/training.reducer';
import * as fromRoot from '../app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  // exerciseChanged = new Subject<Exercise>();
  // exercisesChanged = new Subject<Exercise[]>();
  // finishedExercisesChanged = new Subject<Exercise[]>();
  // private availableExercises: Exercise[] = [];
  // private runningExercise: Exercise;
  private fbsubs: Subscription[] = [];

  constructor(
    private firestore: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.TrainingState>) { }
  // getAvailableExercises(): Exercise[] {
  //   return this.availableExercises.slice();
  // }
  fetchAvailableExercises(): void {
    // this.uiService.loadingSubjectChanged.next(true);
    // Moving the progress bar to store
    this.store.dispatch(new UI.StartLoading());
    this.fbsubs.push(this.firestore.collection('availableExercises')
      .snapshotChanges()
      .pipe(map(
        docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...(doc.payload.doc.data() as {})
            } as Exercise;
          });
        }))
      .subscribe((exercises: Exercise[]) => {
        // this.uiService.loadingSubjectChanged.next(false);
        // moving the progress bar to the store
        this.store.dispatch(new UI.StopLoading());
        // console.log(exercises);
        // this.availableExercises = exercises;
        // this.exercisesChanged.next([...this.availableExercises]);
        // Moving the training to store instead of the subject
        this.store.dispatch(new TRAINING.SetAvailableTrainings(exercises));
      }, error => {
        // this.uiService.loadingSubjectChanged.next(false);
        // moving the progress bar to the store
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar('Failed to fetch exercises from Db', null, 3000);
        console.log(error);
        // this.exercisesChanged.next(null);
      }));
  }
  startExercise(exerciseId: string): void {
    // this.firestore.doc('availableExercises/' + exerciseId).update({lastSelected: new Date()});
    // this.runningExercise = this.availableExercises.find(x => x.id === exerciseId);
    // this.exerciseChanged.next({ ...this.runningExercise });
    // Moving from Subject to the store
    this.store.dispatch(new TRAINING.StartTraining(exerciseId));
  }
  // getRunningExercise(): Exercise {
  //   return { ...this.runningExercise };
  // }
  completeExercise(): void {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe( exercise => {
      this.addDataToDatabase({ ...exercise, date: new Date(), state: 'completed' });
    });
    // Moving to the store in the above logic.
    // this.addDataToDatabase({ ...this.runningExercise, date: new Date(), state: 'completed' });
    // this.runningExercise = null;
    // this.exerciseChanged.next(null);
    // Moving from Subject to the store.
    this.store.dispatch(new TRAINING.StopTraining());
  }
  cancelExercises(progress: number): void {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(exercise => {
      this.addDataToDatabase({
        ...exercise,
        date: new Date(),
        duration: exercise.duration * (progress / 100),
        calories: exercise.calories * (progress / 100),
        state: 'cancelled'
      });
    });
    // Moving it to get the active exercise from Store
    // this.addDataToDatabase({
    //   ...this.runningExercise,
    //   date: new Date(),
    //   duration: this.runningExercise.duration * (progress / 100),
    //   calories: this.runningExercise.calories * (progress / 100),
    //   state: 'cancelled'
    // });
    // this.runningExercise = null;
    // this.exerciseChanged.next(null);
    // Moving from Subject to Store
    this.store.dispatch(new TRAINING.StopTraining());
  }
  fetchCancelledOrCompletedExercises(): void {
    this.fbsubs.push(this.firestore
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
       // this.finishedExercisesChanged.next(exercises);
       // Moving to store from Subject
       this.store.dispatch(new TRAINING.SetFinishedTrainings(exercises));
      }, error => {
        console.log(error);
      }));
  }
  addDataToDatabase(exercise: Exercise): void {
    this.firestore.collection('finishedExercises').add(exercise);
  }
  cancelSubscriptions(): void {
    this.fbsubs.forEach(subs => subs.unsubscribe());
  }
}
