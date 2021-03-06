import { RadioButtonModule } from 'primeng/primeng';
import { XsbuchaimportComponent } from './../../dnn/shared/xsbuchaimport/xsbuchaimport.component';
import { XsbuchaapiService } from './xsbuchaapi.service';
import { FormsModule } from '@angular/forms';
import { XiaoshouapiService } from './xiaoshouapi.service';
import { CalendarModule, DropdownModule, TabViewModule } from 'primeng/primeng';
import { DataTableModule } from 'angular2-datatable';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular/main';
import { WiskSharedsModule } from './../../dnn/shared/wiskshared.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LdtihuodetailComponent } from './ldtihuodetail/ldtihuodetail.component';
import { LdtihuoComponent } from './ldtihuo/ldtihuo.component';
import { OfflineComponent } from './offline/offline.component';
import { TihuoComponent } from './tihuo/tihuo.component';
import { TihuodetailComponent } from './tihuodetail/tihuodetail.component';
import { TihuodetComponent } from './tihuodet/tihuodet.component';
import { TihuodetreportComponent } from './tihuodetreport/tihuodetreport.component';
import { TihuodetcxreportComponent } from './tihuodetcxreport/tihuodetcxreport.component';
import { XstuihuoComponent } from './xstuihuo/xstuihuo.component';
import { XsbuchadetailComponent } from './xsbuchadetail/xsbuchadetail.component';
import { XstuihuodetailComponent } from './xstuihuodetail/xstuihuodetail.component';
import { XsbuchaComponent } from './xsbucha/xsbucha.component';
import { LdorderComponent } from './ldorder/ldorder.component';
import { UrgeComponent } from './urge/urge.component';
import { CangkutihuoComponent } from './cangkutihuo/cangkutihuo.component';
import { CangkutihuodetailComponent } from './cangkutihuodetail/cangkutihuodetail.component';
import { MatchcarService } from '../matchcar/matchcar.service';
import { YanqitihuoComponent2 } from './yanqitihuo/yanqitihuo.component';
import { WuliuorderimportComponent } from './offline/wuliuorderimport/wuliuorderimport.component';
import { WstihuodetreportComponent } from './wstihuodetreport/wstihuodetreport.component';
import { CangkuApiService } from '../cangku/cangkuapi.service';
import { ReleasedetComponent } from './releasedet/releasedet.component';
import { RoleapiService } from '../role/roleapi.service';

const routes: Routes = [
  { path: 'offline', component: OfflineComponent, data: { 'title': '????????????', 'offline': true } },
  { path: 'tihuocreate', component: OfflineComponent, data: { 'title': '????????????' } },
  { path: 'tihuo', component: TihuoComponent, data: { 'title': '????????????????????????' } },
  { path: 'tihuo/:id', component: TihuodetailComponent, data: { 'title': '????????????????????????' } },
  { path: 'tihuodet', component: TihuodetComponent, data: { 'title': '???????????????' } },
  { path: 'tihuodetreport', component: TihuodetreportComponent, data: { 'title': '?????????????????????' } },
  { path: 'tihuodetcxreport', component: TihuodetcxreportComponent, data: { 'title': '?????????????????????????????????' } },
  { path: 'xstuihuo', component: XstuihuoComponent, data: { 'title': '?????????????????????' } },
  { path: 'xstuihuo/:id', component: XstuihuodetailComponent, data: { 'title': '??????????????????' } },
  { path: 'xsbucha', component: XsbuchaComponent, data: { 'title': '?????????????????????' } },
  { path: 'xsbucha/:id', component: XsbuchadetailComponent, data: { 'title': '??????????????????' } },
  { path: 'ldtihuo', component: LdtihuoComponent, data: { 'title': '?????????????????????' } },
  { path: 'ldtihuo/:id', component: LdtihuodetailComponent, data: { 'title': '?????????????????????' } },
  { path: 'ldorder/:id', component: LdorderComponent, data: { 'title': '??????????????????' } },
  { path: 'cangkutihuo', component: CangkutihuoComponent, data: { 'title': '????????????' } },
  { path: 'cangkutihuo/:id', component: CangkutihuodetailComponent, data: { 'title': '??????????????????' } },
  { path: 'urge', component: UrgeComponent, data: { 'title': '????????????????????????' } },
  { path: 'yanqitihuo', component: YanqitihuoComponent2, data: { 'title': '?????????????????????' } },
  { path: 'wstihuodetreport', component: WstihuodetreportComponent, data: { 'title': '?????????????????????' } },
  { path: 'releasedet', component: ReleasedetComponent, data: { 'title': '?????????????????????' } }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    WiskSharedsModule,
    RouterModule.forChild(routes),
    DataTableModule,
    CalendarModule,
    AgGridModule.withComponents([]),
    DropdownModule,
    TabViewModule,
    FormsModule,
    RadioButtonModule
  ],
  declarations: [
    LdtihuodetailComponent,
    LdtihuoComponent,
    OfflineComponent,
    TihuoComponent,
    TihuodetailComponent,
    TihuodetComponent,
    TihuodetreportComponent,
    TihuodetcxreportComponent,
    XstuihuoComponent,
    XsbuchaComponent,
    XsbuchadetailComponent,
    XstuihuodetailComponent,
    XsbuchaimportComponent,
    LdorderComponent,
    UrgeComponent,
    CangkutihuoComponent,
    CangkutihuodetailComponent,
    YanqitihuoComponent2,
    WuliuorderimportComponent,
    WstihuodetreportComponent,
    ReleasedetComponent
  ],
  providers: [XiaoshouapiService, XsbuchaapiService, MatchcarService, CangkuApiService,RoleapiService],
  entryComponents: [XsbuchaimportComponent, WuliuorderimportComponent]
})
export class XiaoshouModule { }
