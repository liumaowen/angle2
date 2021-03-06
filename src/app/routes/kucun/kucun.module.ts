import { RadioButtonModule } from 'primeng/primeng';
import { GetdayPipe } from './../../dnn/shared/pipe/getday.pipe';
import { OrderstatusPipe } from './../../dnn/shared/pipe/orderstatus.pipe';
import { DataTableModule } from 'angular2-datatable';
import { ReportService } from './../report/report.service';
import { FavoritelistComponent } from './../../dnn/shared/favoritelist/favoritelist.component';
import { DropdownModule } from 'primeng/primeng';
import { SharedModule } from './../../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular/main';
import { WiskSharedsModule } from './../../dnn/shared/wiskshared.module';
import { RouterModule, Routes } from '@angular/router';
import { KucunService } from './kucun.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KucunComponent } from './kucun/kucun.component';
import { KucundetailComponent } from './kucundetail/kucundetail.component';
import { KucunkulingComponent } from './kucunkuling/kucunkuling.component';
import { KucunsaledetailComponent } from './kucunsaledetail/kucunsaledetail.component';
import { ChainComponent } from './chain/chain.component';
import { PricekucunComponent } from './pricekucun/pricekucun.component';
import { GoodscodeComponent } from './goodscode/goodscode.component';
import { CangkudetComponent } from './cangkudet/cangkudet.component';
import { KucundayComponent } from './kucunday/kucunday.component';
import { SaleandcaigouComponent } from './saleandcaigou/saleandcaigou.component';
import { TudufenxiComponent } from './tudufenxi/tudufenxi.component';
import { PricekucundateilComponent } from './pricekucundateil/pricekucundateil.component';
import { NoticeshelveComponent } from './noticeshelve/noticeshelve.component';
import { OnlinekucundetailComponent } from './onlinekucundetail/onlinekucundetail.component';
import { ZaitukucundetailComponent } from './zaitukucundetail/zaitukucundetail.component';
import { ZaitucangkuComponent } from './zaitukucundetail/zaitucangku/zaitucangku.component';
import { OverduekucunComponent } from './overduekucun/overduekucun.component';
import { QzkulingComponent } from './qzkuling/qzkuling.component';
import { LongkucuninterestComponent } from './longkucuninterest/longkucuninterest.component';
import { BasematerialComponent } from './basematerial/basematerial.component';
import { KucuncheckComponent } from './kucuncheck/kucuncheck.component';
import { KucuncheckhuizongComponent } from './kucuncheckhuizong/kucuncheckhuizong.component';
import { KucunfqkComponent } from './kucunfqk/kucunfqk.component';
import { AutopaidanComponent } from './autopaidan/autopaidan.component';
import { DailypriceComponent } from './dailyprice/dailyprice.component';
import { SelectModule } from 'ng2-select';
import { LaoercolornumComponent } from './laoercolornum/laoercolornum.component';

const routes: Routes = [{ path: 'kucun', component: KucunComponent, data: { 'title': '???????????????' } },
{ path: 'kucundetail', component: KucundetailComponent, data: { 'title': '???????????????' } },
{ path: 'kucunkuling', component: KucunkulingComponent, data: { 'title': '????????????' } },
{ path: 'kucunsaledetail', component: KucunsaledetailComponent, data: { 'title': '???????????????????????????' } },
{ path: 'chain', component: ChainComponent, data: { 'title': '??????????????????' } },
{ path: 'chain/:id', component: ChainComponent, data: { 'title': '??????????????????' } },
{ path: 'pricekucun', component: PricekucunComponent, data: { 'title': '??????-??????' } },
{ path: 'goodscode', component: GoodscodeComponent, data: { 'title': '????????????' } },
{ path: 'cangkudet', component: CangkudetComponent, data: { 'title': '???????????????' } },
{ path: 'saleandcaigou', component: SaleandcaigouComponent, data: { 'title': '????????????????????????' } },
{ path: 'dinghuofenxi', component: TudufenxiComponent, data: { 'title': '????????????????????????' } },
{ path: 'kucunday', component: KucundayComponent, data: { 'title': '???????????????' } },
{ path: 'pricekucundateil/:id', component: PricekucundateilComponent, data: { 'title': '??????????????????' } },
{ path: 'pricekucundateil', component: NoticeshelveComponent, data: { 'title': '?????????????????????' } },
{ path: 'onlinekucundetail', component: OnlinekucundetailComponent, data: { 'title': '?????????????????????' } },
{ path: 'zaitukucundetail', component: ZaitukucundetailComponent, data: { 'title': '?????????????????????' } },
{ path: 'overduekucun', component: OverduekucunComponent, data: { 'title': '????????????' } },
{ path: 'qzkuling', component: QzkulingComponent, data: { 'title': '????????????????????????' } },
{ path: 'longkucuninterest', component: LongkucuninterestComponent, data: { 'title': '???????????????????????????' } },
{ path: 'countbasematerial', component: BasematerialComponent, data: { 'title': '???????????????' } },
{ path: 'kucuncheckdet', component: KucuncheckComponent, data: { 'title': '?????????????????????' } },
{ path: 'kucuncheckhuizong', component: KucuncheckhuizongComponent, data: { 'title': '?????????????????????' } },
{ path: 'kucunfqk', component: KucunfqkComponent, data: { 'title': '?????????????????????????????????' } },
{ path: 'autopaidan', component: AutopaidanComponent, data: { 'title': '???????????????' } },
{ path: 'dailyprice', component: DailypriceComponent, data: { 'title': '??????????????????' } },
{ path: 'laoercolornum', component: LaoercolornumComponent, data: { 'title': '?????????????????????' } },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WiskSharedsModule,
    SharedModule,
    DropdownModule,
    SelectModule,
    DataTableModule,
    AgGridModule,
    RadioButtonModule
  ],
  declarations: [KucunComponent, KucundetailComponent, FavoritelistComponent,
    KucunsaledetailComponent, ChainComponent, PricekucunComponent, PricekucundateilComponent,
    GoodscodeComponent, CangkudetComponent, KucundayComponent, SaleandcaigouComponent,
    TudufenxiComponent, NoticeshelveComponent, OnlinekucundetailComponent, ZaitukucundetailComponent,
    ZaitucangkuComponent, OverduekucunComponent, QzkulingComponent, LongkucuninterestComponent, BasematerialComponent,KucunkulingComponent,
    KucuncheckComponent, KucuncheckhuizongComponent, KucunfqkComponent, AutopaidanComponent, DailypriceComponent, LaoercolornumComponent],
  providers: [KucunService, ReportService, OrderstatusPipe, GetdayPipe],
  entryComponents: [FavoritelistComponent, ZaitucangkuComponent]
})
export class KucunModule { }
