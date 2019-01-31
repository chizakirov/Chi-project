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
  constructor(
    private _stockservice: StockService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  getNews(){
    let obs = this._stockservice.getNews(this.textInput);
    obs.subscribe(data => {
      console.log(data);
      this.stock = data;
      this.stock.quote.changePercent = Math.round(this.stock.quote.changePercent * 100) / 100;
      this.stock.quote.ytdChange = Math.round(this.stock.quote.ytdChange * 100) / 100;
      this.stock.quote.marketCap = Math.round(this.stock.quote.marketCap * 100) / 100;
      this.textInput = "";
    })
  }
  
}
