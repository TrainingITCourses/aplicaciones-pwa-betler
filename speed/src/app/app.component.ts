import { Component } from '@angular/core';
import { Launch } from './store/models/launch';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { State } from './reducers/launch.reducer';
import { SetFilters, LoadLaunches } from './reducers/launch.actions';
import { Filters } from './store/models/filters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private launchesUrl = 'assets/data/launches.json';
  public filteredLaunches: Launch[];
  title = 'LauncheS';

  constructor(private http: HttpClient, private store: Store<State>) { }

  public onSearch(event) {
    this.store.dispatch(new SetFilters(new Filters(event.estado, event.agencia, event.tipo)));
  }


  ngOnInit(): void {
    // Cachea todos los lanzamientos
    console.log("Starting app, dispatching LoadLaunches");
    this.http.get<Response>(this.launchesUrl).subscribe((res: Response) => {
      this.store.dispatch(new LoadLaunches(res['launches']));
    });

    this.store.select('launch').subscribe(value => {
      console.log(" ")
      console.log("----- app.component \'launch\' subscribed info -------------");
      console.log(value);
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

      if (value) {
        this.filteredLaunches = value.filteredLaunches;
      }
    });

    this.store.select(state => state.filteredLaunches).subscribe(value => {
      console.log(" ")
      console.log("----- app.component \'filteredLaunches\' subscribed info -------------");
      console.log(value);
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    });

    this.store.select(state => state.filters).subscribe(value => {
      console.log(" ")
      console.log("----- app.component \'filters\' subscribed info -------------");
      console.log(value);
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    });
  }
}
