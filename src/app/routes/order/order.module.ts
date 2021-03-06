import { FormsModule } from '@angular/forms';
import { DropdownModule, TabViewModule } from 'primeng/primeng';
import { AgGridModule } from 'ag-grid-angular/main';
import { DataTableModule } from 'angular2-datatable/index';
import { WiskSharedsModule } from './../../dnn/shared/wiskshared.module';
import { SharedModule } from './../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { OrderapiService } from './orderapi.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';
import { OrderdetreportComponent } from './orderdetreport/orderdetreport.component';
import { OrderdetcxreportComponent } from './orderdetcxreport/orderdetcxreport.component';
import { OrdercalcComponent } from './ordercalc/ordercalc.component';
import { SaledetreportComponent } from './saledetreport/saledetreport.component';
import { ProorderdetailComponent } from './proorderdetail/proorderdetail.component';
import { OrderjiagongfeeComponent } from './orderjiagongfee/orderjiagongfee.component';
import { SelectModule } from 'ng2-select';
import { JiagongmsgComponent } from './jiagongmsg/jiagongmsg.component';
import { EditComponent } from './edit/edit.component';
import { OnlineorderkaoheComponent } from './onlineorderkaohe/onlineorderkaohe.component';
import { JingliaoorderdetailComponent } from './jingliaoorderdetail/jingliaoorderdetail.component';
import { QihuodaiyundetComponent } from './qihuodaiyundet/qihuodaiyundet.component';
import { NoticewuliuyuanComponent } from 'app/dnn/shared/noticewuliuyuan/noticewuliuyuan.component';
import { TudusaledetComponent } from './tudusaledet/tudusaledet.component';
import { DaydealdetailComponent } from './daydealdetail/daydealdetail.component';
import { NeicaigoufapiaodetailComponent } from './neicaigoufapiaodetail/neicaigoufapiaodetail.component';
import { NeicaigoufapiaoreporterComponent } from './neicaigoufapiaoreporter/neicaigoufapiaoreporter.component';

const routes: Routes = [
  { path: 'order', component: OrderComponent, data: { 'title': '????????????' } },
  { path: 'order/:id', component: OrderdetailComponent, data: { 'title': '????????????' } },
  { path: 'orderdetreport', component: OrderdetreportComponent, data: { 'title': '???????????????' } },
  { path: 'orderdetcxreport', component: OrderdetcxreportComponent, data: { 'title': '?????????????????????' } },
  { path: 'order_calc', component: OrdercalcComponent, data: { 'title': '????????????????????????' } },
  { path: 'saledetreport', component: SaledetreportComponent, data: { 'title': '?????????????????????' } },
  { path: 'proorder/:id', component: ProorderdetailComponent, data: { 'title': '?????????????????????' } },
  { path: 'orderjiagongfee', component: OrderjiagongfeeComponent, data: { 'title': '???????????????????????????' } },
  { path: 'onlineorderkaohe', component: OnlineorderkaoheComponent, data: { 'title': '???????????????????????????' } },
  { path: 'jingliaoorderdetail', component: JingliaoorderdetailComponent, data: { 'title': '???????????????????????????' } },
  { path: 'qihuodaiyundet', component: QihuodaiyundetComponent, data: { 'title': '?????????????????????' } },
  { path: 'tudusaledet', component: TudusaledetComponent, data: { 'title': '????????????????????????' } },
  { path: 'daydealdetail', component: DaydealdetailComponent, data: { 'title': '??????????????????????????????' } },
  { path: 'neicaigoufapiao/:id', component: NeicaigoufapiaodetailComponent, data: { 'title': '???????????????????????????' } },
  { path: 'neicaigoufapiaoreporter', component: NeicaigoufapiaoreporterComponent, data: { 'title': '?????????????????????' } },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    WiskSharedsModule,
    RouterModule.forChild(routes),
    DataTableModule,
    AgGridModule,
    TabViewModule,
    DropdownModule,
    FormsModule,
    SelectModule
  ],
  declarations: [OrderComponent, OrderdetailComponent, OrderdetreportComponent, OrderdetcxreportComponent,
    OrdercalcComponent,
    SaledetreportComponent, ProorderdetailComponent, OrderjiagongfeeComponent, JiagongmsgComponent,
    EditComponent, OnlineorderkaoheComponent, JingliaoorderdetailComponent, QihuodaiyundetComponent,
    TudusaledetComponent, DaydealdetailComponent, NeicaigoufapiaodetailComponent, NeicaigoufapiaoreporterComponent],
  providers: [OrderapiService],
  entryComponents: [JiagongmsgComponent, EditComponent, NoticewuliuyuanComponent]
})
export class OrderModule { }
