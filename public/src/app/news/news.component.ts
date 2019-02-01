import { Component, OnInit } from '@angular/core';
import { StockService} from '../stock.service';
import { ActivatedRoute, Params, Router } from '@angular/router'; 

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news: any = {articles: ""}; 
  textInput: any = ''; 
  stock: any = { 
    quote: {
        symbol: "",
        companyName: "",
        week52High: "",
        week52Low: "",
        ytdChange: "", 
        marketCap: "",
        peRatio: "",
        changePercent: ""
      }
    };

  graph: any = { data: { x: [], y: [] }, layout: {} };

  constructor(
    private _stockservice: StockService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getNews();
  }

  getNews(){
    let obs = this._stockservice.getNews(this.textInput);
    obs.subscribe(data => {
      this.stock = data;
      this.stock.quote.changePercent = Math.round(this.stock.quote.changePercent * 100) / 100;
      this.stock.quote.ytdChange = Math.round(this.stock.quote.ytdChange * 100) / 100;
      this.stock.quote.marketCap = Math.round(this.stock.quote.marketCap * 100) / 100;
      this.textInput = "";

      console.log('WHOLE OBJECT', data);
      for (let i of this.graph.data){
        for (let x of this.stock['chart']){
          let y_axis = parseInt(x['open']);
          let x_axis = new Date(x['date']);
          this.graph.data[0].y.push(y_axis);
          this.graph.data[0].x.push(x_axis);

        }};
    })

    this.graph = {
      data: [
          { x: [this.graph.data.x], y: [this.graph.data.y], type: 'scatter', mode: 'lines+points', marker: {color: 'green'} },
          // { x: [1, 2, 3], y: [2, 5, 3], type: 'line' },
      ],
      
      layout: {width: 450, height: 350, title: 'Historical Price Chart'}
    };
    console.log('GOT GRAPH', this.graph);
  }
}
