import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Launch } from '../store/models/launch';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-result-counter',
  templateUrl: './result-counter.component.html',
  styleUrls: ['./result-counter.component.css']
})
export class ResultCounterComponent implements OnInit {

  @Input() public launchesResult: Launch[];

  constructor() { }

  ngOnInit() {
  }

}
