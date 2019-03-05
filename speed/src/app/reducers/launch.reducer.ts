import { Action } from '@ngrx/store';
import { LaunchActions, LoadLaunches, SetFilters, LaunchActionTypes } from './launch.actions';
import { Launch } from '../store/models/launch';
import { Filters } from '../store/models/filters';
import { throwError } from 'rxjs';


export interface State {
  launches: Launch[];
  filters: Filters;
  filteredLaunches: Launch[];
}

export const initialState: State = {

  launches: [],
  filters: null,
  filteredLaunches: []

};

export function reducer(state = initialState, action: LaunchActions): State {
  var act: string;
  act = action.type;
  if (act != "@ngrx/store/init") {
    console.log("\\n")
    console.log("---- launch reducer ----------------------------");
    console.log(action);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  }

  switch (action.type) {
    case LaunchActionTypes.LoadLaunches:
      state.launches = action.payload;
      return { ...state };
    case LaunchActionTypes.SetFilters:
      console.log("Setting filters in reducer");
      state.filters = action.payload;
      state.filteredLaunches = applyFilters(state.launches, state.filters);
      return { ...state };
    default:
      if (act != "@ngrx/store/init") {
        console.log("Something is awfully wrong");
      }
  }
}

/**
 * Devuelve una copia del parámetro launches eliminando los elementos que no cumplan los filtros.
 * @param launches No es modificado
 * @param filters Filtros de búsqueda
 * 
 */
function applyFilters(launches: Launch[], filterParam: any): Launch[] {

  console.log("Launches in applyFilters");
  console.log(launches);
  var aux = launches;
  // TODO ¿Por qué no puedo decirle a filterParam que es un Filters?
  var filters: Filters = filterParam;

  if (filters == null) {
    // At load, filters is null
    return aux;
  }

  console.log("Filtering status: " + filters.status);
  // Filter by estado
  if (filters.status != -1) {
    aux = aux.filter((launch) => launch.status == filters.status);
  }

  // Filter by agencia
  if (filters.agency != "") {
    aux = aux.filter((launch) => {
      var coincidences = 0;
      if (launch.missions[0] && launch.missions[0].agencies && launch.missions[0].agencies[0]) {
        if (launch.missions[0].agencies[0].name.search(filters.agency) != -1) {
          coincidences++;
        }
      }
      if (launch.rocket.agencies && launch.rocket.agencies[0]) {
        if (launch.rocket.agencies[0].name.search(filters.agency) != -1) {
          coincidences++;
        }
      }
      if (launch.location && launch.location.pads[0] && launch.location.pads[0].agencies && launch.location.pads[0].agencies[0]) {
        if (launch.location.pads[0].agencies[0].name.search(filters.agency) != -1) {
          coincidences++;
        }
      }

      return coincidences > 0;
    });
  }

  // Filter by tipo
  // TODO falla, hay algunas sin misión
  if (filters.type != -1) {
    aux = aux.filter((launch) => {
      if (launch.missions[0]) {
        return launch.missions[0].type == filters.type;
      } else {
        return false;
      }
    });
  }

  console.log("Filtro aplicado, " + aux.length + " resultados");
  return aux;
}
