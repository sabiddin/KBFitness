import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from 'src/app/_services/training.service';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import * as fromTraining from '../training.reducer';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;
  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }
  onStop(): void {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data:
      {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancelExercises(this.progress);
      }
      else {
        this.startOrResumeTimer();
      }
      console.log(result);
    });
  }
  // startOrResumeTimer(): void {
  //   const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
  //   this.timer = setInterval(() => {
  //     this.progress = this.progress + 5;
  //     if (this.progress >= 100) {
  //       this.trainingService.completeExercise();
  //       clearInterval(this.timer);
  //     }
  //   }, step);
  // }

  /**
   * Store version of the startOrResumeTimer
   */
  startOrResumeTimer(): void {
    this.store.select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe(exercise => {
        const step = exercise.duration / 100 * 1000;
        this.timer = setInterval(() => {
          this.progress = this.progress + 5;
          if (this.progress >= 100) {
            this.trainingService.completeExercise();
            clearInterval(this.timer);
          }
        }, step);
      });
  }

}
