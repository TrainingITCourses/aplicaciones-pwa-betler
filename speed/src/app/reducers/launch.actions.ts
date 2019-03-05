import { Action } from '@ngrx/store';
import { Filters } from '../store/models/filters';
import { Launch } from '../store/models/launch';

export enum LaunchActionTypes {
  LoadLaunches = '[Launch] Load Launches',
  SetFilters = '[Launch] Set Filters'
  
}

export class LoadLaunches implements Action {
  readonly type = LaunchActionTypes.LoadLaunches;
  constructor(public readonly payload: Launch[]) { }
}

export class SetFilters implements Action {
  readonly type = LaunchActionTypes.SetFilters;

  constructor(public readonly payload: Filters) { }
}


export type LaunchActions = LoadLaunches | SetFilters;
