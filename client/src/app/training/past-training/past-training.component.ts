import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription, VirtualAction } from 'rxjs';
import { Exercise } from 'src/app/_models/exercise.model';
import { TrainingService } from 'src/app/_services/training.service';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  // finishedExerciseSubscription = new Subscription();
  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService, private store: Store<{}>) { }
  ngOnInit(): void {
    // Moving it to the store
    // this.finishedExerciseSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
    //   this.dataSource.data = exercises;
    // });
    this.store.select(fromTraining.getFinishedTrainings).subscribe(exercises => {
      this.dataSource.data = exercises;
    });
    this.trainingService.fetchCancelledOrCompletedExercises();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy(): void {
    // if (this.finishedExerciseSubscription) {
    //   this.finishedExerciseSubscription.unsubscribe();
    // }
  }
  doFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
