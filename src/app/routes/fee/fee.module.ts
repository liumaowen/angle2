import { FeeapiService } from './feeapi.service';
import { FeeimplistComponent } from './../../dnn/shared/feeimplist/feeimplist.component';
import { FeefukuanapiService } from './feefukuanapi.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeefukuanComponent } from './feefukuan/feefukuan.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { DropdownModule, CalendarModule } from 'primeng/primeng';
import { SelectModule } from 'ng2-select';
import { WiskSharedsModule } from 'app/dnn/shared/wiskshared.module';
import { DataTableModule } from 'angular2-datatable';
import { AgGridModule } from 'ag-grid-angular/main';
import { FeefukuandetailComponent } from './feefukuandetail/feefukuandetail.component';
import { FeeComponent } from './fee/fee.component';
import { FeehuizongComponent } from './feehuizong/feehuizong.component';
import { AdjfeehuizongComponent } from './adjfeehuizong/adjfeehuizong.component';
import { FeewanglaiComponent } from './feewanglai/feewanglai.component';
import { FeeyueComponent } from './feeyue/feeyue.component';
import { FeedetComponent } from './feedet/feedet.component';
import { FeefukuandetComponent } from './feefukuandet/feefukuandet.component';
import { BaoxiaofeedetComponent } from './baoxiaofeedet/baoxiaofeedet.component';
import { WuliubaojiadetComponent } from './wuliubaojiadet/wuliubaojiadet.component';
import { BiddingorderimportComponent } from './wuliubaojiadet/biddingorderimport/biddingorderimport.component';
import { YunfeeimportComponent } from './wuliubaojiadet/yunfeeimport/yunfeeimport.component';
import { FeeDetailReporterComponent } from './fee-detail-reporter/fee-detail-reporter.component';
import { FeefukuandetreporterComponent } from './feefukuandetreporter/feefukuandetreporter.component';
import { BaoxiaofeedethandanComponent } from './baoxiaofeedethandan/baoxiaofeedethandan';
import { MaycurloanComponent } from './maycurloan/maycurloan.component';
import { CarfeebaoxiaodetComponent } from './carfeebaoxiaodet/carfeebaoxiaodet.component';

const routes: Routes = [
  { path: 'feefukuan', component: FeefukuanComponent, data: { 'title': '??????????????????' } },
  { path: 'feefukuan/:id', component: FeefukuandetailComponent, data: { 'title': '??????????????????' } },
  { path: 'fee', component: FeeComponent, data: { 'title': '????????????' } },
  { path: 'feehuizong', component: FeehuizongComponent, data: { 'title': '???????????????' } },
  { path: 'feedetailreport', component: FeeDetailReporterComponent, data: { 'title': '???????????????' } },
  { path: 'feewanglai', component: FeewanglaiComponent, data: { 'title': '?????????????????????' } },
  { path: 'feewanglai/:id', component: FeewanglaiComponent, data: { 'title': '?????????????????????' } },
  { path: 'feeyue', component: FeeyueComponent, data: { 'title': '??????????????????' } },
  { path: 'feedet', component: FeedetComponent, data: { 'title': '???????????????' } },
  { path: 'feefukuandet', component: FeefukuandetComponent, data: { 'title': '?????????????????????' } },
  { path: 'feefukuandetreporter', component: FeefukuandetreporterComponent, data: { 'title': '?????????????????????' } },
  { path: 'baoxiaofeedet', component: BaoxiaofeedetComponent, data: { 'title': '?????????????????????' } },
  { path: 'wuliubaojiadet', component: WuliubaojiadetComponent, data: { 'title': '?????????????????????' } },
  { path: 'baoxiaofeedethandan', component: BaoxiaofeedethandanComponent, data: { 'title': '???????????????????????????' } },
  { path: 'maycurloan', component: MaycurloanComponent, data: { 'title': '??????????????????' } },
  { path: 'maycurcar', component: CarfeebaoxiaodetComponent, data: { 'title': '?????????????????????' } },
  { path: 'adjfeehuizong', component: AdjfeehuizongComponent, data: { 'title': '?????????????????????' } },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DropdownModule,
    CalendarModule,
    SelectModule,
    WiskSharedsModule,
    DataTableModule,
    AgGridModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FeefukuanComponent, FeefukuandetailComponent, FeeimplistComponent,
    FeeComponent, FeehuizongComponent, FeewanglaiComponent, FeeyueComponent,
    FeedetComponent, FeefukuandetComponent, BaoxiaofeedetComponent,
    WuliubaojiadetComponent, BiddingorderimportComponent, YunfeeimportComponent,
    FeeDetailReporterComponent, FeefukuandetreporterComponent, BaoxiaofeedethandanComponent,
    MaycurloanComponent, CarfeebaoxiaodetComponent, AdjfeehuizongComponent],
  providers: [
    FeefukuanapiService, FeeapiService
  ],
  entryComponents: [FeeimplistComponent, BiddingorderimportComponent, YunfeeimportComponent]
})
export class FeeModule { }
