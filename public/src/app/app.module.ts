import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StockService } from './stock.service';
import { TradeComponent } from './trade/trade.component';
import { OrderComponent } from './order/order.component';
import { PositionComponent } from './position/position.component';
import { NewsComponent } from './news/news.component';
import { PlotlyModule } from 'angular-plotly.js';


@NgModule({
  declarations: [
    AppComponent,
    TradeComponent,
    OrderComponent,
    PositionComponent,
    NewsComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PlotlyModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
