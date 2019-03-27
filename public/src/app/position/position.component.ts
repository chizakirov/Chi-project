import { Component, OnInit } from '@angular/core';
import { StockService} from '../stock.service';
import { ActivatedRoute, Params, Router } from '@angular/router'; 

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  positions: any;
  stockTotal: number = 0;
  remainingCash: number;
  return: number;
  initial: number = 25000;

  constructor(
    private _stockservice: StockService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.allPositions();
    this.getOnePosition();
  }

  allPositions(){
    this._stockservice.allPositions()
      .subscribe(data => {
        // COMMENT: We need more comments here. There's a lot of math logic that I could either read in one or two comments or read the code (which takes longer). Tell me what math is going on.
        this.positions = data;
        for(let i = 0; i < this.positions.length; i++){
          this.positions[i].total = Math.round(this.positions[i].total* 100) / 100;
          this.stockTotal += this.positions[i].total;
          this.stockTotal = Math.round(this.stockTotal * 100) / 100;
          // console.log('POSITION TOTALS', this.stockTotal);
        }
        this.remainingCash = this.stockTotal;
        let initial: number = 25000;
        this.remainingCash = this.stockTotal + initial;
        this.remainingCash = Math.round(this.remainingCash * 100) / 100;
        // console.log('CASH AVAILBLE', this.remainingCash);
        this.return = 100 * (this.remainingCash -this.initial)/this.initial;
        this.return = Math.round(this.return * 100) / 100;
      })
  }

  getOnePosition() {
    this._stockservice.getOnePosition()
      .subscribe();
  }

}
