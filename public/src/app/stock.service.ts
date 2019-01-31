import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StockService {
  
  constructor(private _http: HttpClient) { }

  getQuote(symbol: string){
    return this._http.get(`/api/stock/${symbol}`);
    // return this._http.get(`https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,news,chart&range=1m&last=10`);//this grabs data from API directly and won't need the backend
  }

  getNews(symbol: string){
    return this._http.get(`https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,news,chart&range=1m&last=10`);
    // return this._http.get(`https://newsapi.org/v2/everything?q=${symbol}&from=2019-01-29&sortBy=popularity&apiKey=3978d00e72c34c9f9d5f6da04b681b80`);
  }

  getMultipleStock(){
    return this._http.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb, msft&types=quote,news,chart&range=1m&last=5`);
  }

  order(order){
    console.log('INSIDE SERVICE', order);
    return this._http.post('/api/order', order);
  }

  showOrder(){
    return this._http.get('/api/order/');
  }

  allPositions(){
    return this._http.get('/api/position');
  }

  getOnePosition() {
    return this._http.get('/api/position/FB');
  }

  currentBalance(){
    return this._http.get('/api/account');
  }
}
