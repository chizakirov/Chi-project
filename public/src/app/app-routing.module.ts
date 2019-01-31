import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradeComponent } from './trade/trade.component';
import { PositionComponent } from './position/position.component';
import { NewsComponent } from './news/news.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: 'position', component: PositionComponent},
  { path: 'trade', component: TradeComponent},
  { path: 'news', component: NewsComponent},
  { path: 'order', component: OrderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
