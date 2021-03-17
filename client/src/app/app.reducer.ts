import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromTraining from './training/training.reducer';

export interface State {
    ui: fromUi.State;
    auth: fromAuth.State;
    training: fromTraining.TrainingState;
}

export const reducers: ActionReducerMap<State> = {
    ui: fromUi.uiReducer,
    auth: fromAuth.authReducer,
    training: fromTraining.trainingReducer
};

/**
 * UI Feature Selector
 */
export const getUIState = createFeatureSelector<fromUi.State>('ui');
/**
 * UI Selector
 */
export const getIsLoadingState = createSelector(getUIState, fromUi.getIsLoading);

/**
 * Auth Feature Selector
 */
export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
/**
 * UI Selector
 */
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuthenticated);

/**
 * Training Feature Selector
 */
export const getTrainingState = createFeatureSelector<fromTraining.TrainingState>('training');
/**
 * Available Trainings Selector
 */
export const getAvailableTrainings = createSelector(getTrainingState, fromTraining.getAvailableTrainings);
/**
 * Finished Trainings Selector
 */
export const getFinishedTrainings = createSelector(getTrainingState, fromTraining.getFinishedTrainings);
/**
 * Active Training Selector
 */
export const getActiveTraining = createSelector(getTrainingState, fromTraining.getActiveTraining);
/**
 * getIsTraining Selector
 */
export const getIsActiveTraining = createSelector(getTrainingState, fromTraining.getIsTraining);
