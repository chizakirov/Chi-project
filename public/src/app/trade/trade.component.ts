import { Component, OnInit } from '@angular/core';
import { StockService} from '../stock.service';
import { ActivatedRoute, Params, Router } from '@angular/router'; 
import { checkAndUpdateDirectiveDynamic } from '@angular/core/src/view/provider';

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
  chart: any;
  textInput: any = '';
  order: any = {
    symbol: "",
    type: "",
    price: Number,
    quantity: Number,
    total: Number
  };
  orderErrors: any = '';

  points:any;
  stocks:any;
  newarr:any;
  x: number;

  constructor(
    private _stockservice: StockService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.stocks = [{open: "13.1900"}, {open: "101.9000"},{open: "102.5100"}, {open: "105.2600"},{open:"105.0000"}];
    this.points = [50, 150, 100, 23, 150, 98];
    //this.x = 40;
    this.newarr = [];
    this.buildData();
  }

  buildData() {
    for (var x = 5; x < 400; x+=10) {
      this.newarr.push(x);
      this.newarr.push(Math.floor(Math.random()*70+50));
    }
    this.newarr.push(this.newarr[this.newarr.length-2]+10);
    this.newarr.push(parseInt(this.stocks[0].open));
  }

  updateChart() {
    console.log('UPDATING CHART');
    this.newarr.push(this.newarr[this.newarr.length-2]+10);
    var up = Math.floor(Math.random()*70+70);
    this.newarr.push(up);
    console.log(this.newarr);
  }

  getStock(){
    let obs = this._stockservice.getQuote(this.textInput);
    obs.subscribe((data: string) => {
      // console.log('the whole API  object', data);
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
