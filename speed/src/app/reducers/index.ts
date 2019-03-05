import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromLaunch from './launch.reducer';

export interface State {

  launch: fromLaunch.State;
}

export const reducers: ActionReducerMap<State> = {

  launch: fromLaunch.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
