import { Component, OnInit, OnDestroy } from '@angular/core';
import { StockService} from './stock.service';
import { ActivatedRoute, Params, Router } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Stock Simulator';

  constructor(
    private _stockservice: StockService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
  }

}
