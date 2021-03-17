import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UIService {
    loadingSubjectChanged = new Subject<boolean>();
    constructor(private snckbar: MatSnackBar) {

    }
    showSnackbar(message, action, duration): void {
        this.snckbar.open(message, action, {
            duration
        });
    }
}