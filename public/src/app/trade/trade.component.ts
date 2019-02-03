import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { StockService} from '../stock.service';
import { ActivatedRoute, Params, Router } from '@angular/router'; 
import { checkAndUpdateDirectiveDynamic } from '@angular/core/src/view/provider';
// import * as _ from 'lodash';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
  title = 'Stock Simulator app';
  stock: any = { 
    quote: {
        symbol: "",
        
      }
    };
  chart: any = {'Time Series (1min)': ""};
  textInput: any = '';
  chartInput: any = '';

  order: any = {
    symbol: "",
    type: "",
    price: Number,
    quantity: Number,
    total: Number
  };
  orderErrors: any = '';

  graph: any = { data: { x: [], y: [] }, layout: {} };

  constructor(
    private _stockservice: StockService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }


  ngOnInit() {
    this.getChart();
  }

  getChart() {
    let obs = this._stockservice.getChart(this.chartInput);
    obs.subscribe(data => {
      this.chart = data;
      this.chartInput = '';
      // console.log('TIME SERIES', this.chart['Time Series (1min)']);
      for (let i of this.graph.data){
        for (let x in this.chart['Time Series (1min)']){
          let y_axis = parseInt(this.chart['Time Series (1min)'][x]['1. open']);
          let x_axis = new Date(x);
          this.graph.data[0].y.push(y_axis);
          this.graph.data[0].x.push(x_axis);

        };
      }
      
    })
    this.graph = {
      data: [
          { x: [this.graph.data.x], y: [this.graph.data.y], type: 'scatter', mode: 'lines+points', marker: {color: 'green'} },
          // { x: [1, 2, 3], y: [2, 5, 3], type: 'line' },
      ],
      
      layout: {width: 600, height: 350, title: 'Intraday Price Chart'}
    };
    console.log('GOT GRAPH', this.graph);
  }

  getStock(){
    let obs = this._stockservice.getQuote(this.textInput);
    obs.subscribe((data: string) => {
      console.log('the whole API  object', data);
      this.stock = JSON.parse(data);
      this.textInput = "";
    })
  }

  placeOrder(){
    if(this.order.type == 'buy' || this.order.type == 'buy cover' ){
      // console.log('INSIDE BUY');
      let qty = parseFloat(this.order.quantity);
      let price = parseFloat(this.order.price);
      this.order.total = qty*price;
      this.order.total = this.order.total *(-1);
    }
    else if (this.order.type == 'sell' || this.order.type == 'sell short'){
      let qty = parseFloat(this.order.quantity);
      // console.log('INSIDE SELL');
      qty = qty * (-1);
      // console.log('QUANTITY', qty);
      let price = parseFloat(this.order.price);
      this.order.total = qty*price;
      this.order.total = this.order.total *(-1);
      console.log(this.order.total);
    }
    let obs = this._stockservice.order(this.order);
    //console.log('NEW ORDER ===', this.order)
    obs.subscribe(data => {
      if(data['errors']){
        this.orderErrors = data;
      }
      else{
        // console.log('NEW ORDER', data);
        this.order = data;
        this._router.navigate(['/order']);
      }
    })
  }
}
