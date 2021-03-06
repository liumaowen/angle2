import { CaigoudetimportComponent } from './../../dnn/shared/caigoudetimport/caigoudetimport.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaigouComponent } from './caigou/caigou.component';
import { CaigoudetComponent } from './caigoudet/caigoudet.component';
import { CaigouService } from './caigou.service';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular/main';
import { SelectModule } from 'ng2-select';
import { SharedModule } from '../../shared/shared.module';
import { WiskSharedsModule } from '../../dnn/shared/wiskshared.module';
import { CalendarModule, DropdownModule } from 'primeng/primeng';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule } from '@angular/forms';
import { CgfukuanComponent } from './cgfukuan/cgfukuan.component';
import { CgfukuandetComponent } from './cgfukuandet/cgfukuandet.component';
import { CgtuihuoComponent } from './cgtuihuo/cgtuihuo.component';
import { CgtuihuodetComponent } from './cgtuihuodet/cgtuihuodet.component';
import { CginvoiceingComponent } from './cginvoiceing/cginvoiceing.component';
import { CginvoicedetComponent } from './cginvoicedet/cginvoicedet.component';
import { CginvoicedetailComponent } from './cginvoicedetail/cginvoicedetail.component';
import { CgwanglaiComponent } from './cgwanglai/cgwanglai.component';
import { Cgwanglai2Component } from './cgwanglai2/cgwanglai2.component';
import { CgwanglaiyueComponent } from './cgwanglaiyue/cgwanglaiyue.component';
import { Cgwanglaiyue2Component } from './cgwanglaiyue2/cgwanglaiyue2.component';
import { CginvoiceCountComponent } from './cginvoice-count/cginvoice-count.component';
import { JsbuchaComponent } from './jsbucha/jsbucha.component';
import { JsbuchadetComponent } from './jsbuchadet/jsbuchadet.component';
import { JsbuchaimportComponent } from 'app/dnn/shared/jsbuchaimport/jsbuchaimport.component';
import { JinhuoguanzhiComponent } from './jinhuoguanzhi/jinhuoguanzhi.component';
import { CgfanliComponent } from './cgfanli/cgfanli.component';
import { RukuapplyComponent } from './rukuapply/rukuapply.component';
import { RukuapplydetComponent } from './rukuapplydet/rukuapplydet.component';
import { JsbuchadetailsComponent } from './jsbuchadetails/jsbuchadetails.component';
import { UrgentcontractComponent } from './urgentcontract/urgentcontract.component';
import { CgfanlihuizongComponent } from './cgfanlihuizong/cgfanlihuizong.component';
import { CaigoujiaofureportComponent } from './caigoujiaofureport/caigoujiaofureport.component';
import { CaigoudetimpComponent } from 'app/dnn/shared/caigoudetimp/caigoudetimp.component';
import { CginvoiceTiaohuoComponent } from './cginvoice-tiaohuo/cginvoice-tiaohuo.component';
import { WeidaofanlihuizongComponent } from './weidaofanlihuizong/weidaofanlihuizong.component';
import { LastyearwdfanlihuizongComponent } from './lastyearwdfanlihuizong/lastyearwdfanlihuizong.component';
import { CginvoiceingdetComponent } from './cginvoiceingdet/cginvoiceingdet.component';
import { CgfukuanplanComponent } from './cgfukuanplan/cgfukuanplan.component';
import { CaigoujiaofuhuizongComponent } from './caigoujiaofuhuizong/caigoujiaofuhuizong.component';
import { CaigoujiaofukaoheComponent } from './caigoujiaofukaohe/caigoujiaofukaohe.component';

const routes: Routes = [
  { path: 'caigou', component: CaigouComponent, data: { 'title': '????????????' } },
  { path: 'caigou/:id', component: CaigoudetComponent, data: { 'title': '????????????' } },
  { path: 'cgfukuan', component: CgfukuanComponent, data: { 'title': '???????????????' } },
  { path: 'cgfukuan/:id', component: CgfukuandetComponent, data: { 'title': '?????????????????????' } },
  { path: 'cgtuihuo', component: CgtuihuoComponent, data: { 'title': '?????????????????????' } },
  { path: 'cgtuihuo/:id', component: CgtuihuodetComponent, data: { 'title': '??????????????????' } },
  { path: 'cginvoiceing', component: CginvoiceingComponent, data: { 'title': '???????????????' } },
  { path: 'cginvoice/det', component: CginvoicedetComponent, data: { 'title': '?????????????????????' } },
  { path: 'cginvoice/:id', component: CginvoicedetailComponent, data: { 'title': '??????????????????' } },
  { path: 'cgwanglai/:id', component: CgwanglaiComponent, data: { 'title': '?????????????????????' } },
  { path: 'cgwanglai2/:id', component: Cgwanglai2Component, data: { 'title': '?????????????????????' } },
  { path: 'cgwanglaiyue', component: CgwanglaiyueComponent, data: { 'title': '?????????????????????' } },
  { path: 'cgwanglaiyue2', component: Cgwanglaiyue2Component, data: { 'title': '?????????????????????' } },
  { path: 'cginvoicecount', component: CginvoiceCountComponent, data: { 'title': '???????????????' } },
  { path: 'jsbucha', component: JsbuchaComponent, data: { 'title': '?????????????????????' } },
  { path: 'jhgz', component: JinhuoguanzhiComponent, data: { 'title': '???????????????' } },
  { path: 'jsbucha/:id', component: JsbuchadetComponent, data: { 'title': '??????????????????' } },
  { path: 'cgfanli', component: CgfanliComponent, data: { 'title': '???????????????' } },
  { path: 'rukuapply', component: RukuapplyComponent, data: { 'title': '?????????????????????' } },
  { path: 'rukuapply/:id', component: RukuapplydetComponent, data: { 'title': '?????????????????????' } },
  { path: 'jsbuchadetails', component: JsbuchadetailsComponent, data: { 'title': '?????????????????????' } },
  { path: 'urgentcontract', component: UrgentcontractComponent, data: { 'title': '???????????????' } },
  { path: 'cgfanlihuizong', component: CgfanlihuizongComponent, data: { 'title': '?????????????????????' } },
  { path: 'caigoujiaofu', component: CaigoujiaofureportComponent, data: { 'title': '?????????????????????' } },
  { path: 'cginvoicetiaohuo', component: CginvoiceTiaohuoComponent, data: { 'title': '????????????????????????' } },
  { path: 'weidaofanlihuizong', component: WeidaofanlihuizongComponent, data: { 'title': '?????????????????????' } },
  { path: 'lastwdfanlihuizong', component: LastyearwdfanlihuizongComponent, data: { 'title': '???????????????????????????' } },
  { path: 'cginvoiceingdet', component: CginvoiceingdetComponent, data: { 'title': '??????????????????????????????' } },
  { path: 'cgfukuanplan', component: CgfukuanplanComponent, data: { 'title': '??????????????????' } },
  { path: 'caigoujiaofuhuizong', component: CaigoujiaofuhuizongComponent, data: { 'title': '?????????????????????' } },
  { path: 'caigoujiaofukaohe', component: CaigoujiaofukaoheComponent, data: { 'title': '?????????????????????' } },
];

@NgModule({
  imports: [
    CommonModule,
    AgGridModule,
    SharedModule,
    WiskSharedsModule,
    RouterModule.forChild(routes),
    AgGridModule.withComponents([]),
    SelectModule,
    CalendarModule,
    DropdownModule,
    DataTableModule,
    FormsModule
  ],
  declarations: [CaigouComponent, CaigoudetComponent, CaigoudetimportComponent, CaigoudetimpComponent,
    CgfukuanComponent, CgfukuandetComponent,
    CgtuihuoComponent, CgtuihuodetComponent, CginvoiceingComponent, CginvoicedetComponent, CginvoicedetailComponent,
    CgwanglaiComponent, Cgwanglai2Component, CgwanglaiyueComponent, Cgwanglaiyue2Component, CginvoiceCountComponent, JsbuchaComponent,
    JsbuchadetComponent, JsbuchaimportComponent, JinhuoguanzhiComponent, CgfanliComponent, RukuapplyComponent, RukuapplydetComponent,
    JsbuchadetailsComponent, UrgentcontractComponent, CgfanlihuizongComponent, CaigoujiaofureportComponent,
    CginvoiceTiaohuoComponent, WeidaofanlihuizongComponent, LastyearwdfanlihuizongComponent, CginvoiceingdetComponent,
    CgfukuanplanComponent, CaigoujiaofuhuizongComponent, CaigoujiaofukaoheComponent],
  exports: [RouterModule],
  providers: [CaigouService],
  entryComponents: [CaigoudetimportComponent, CaigoudetimpComponent, JsbuchaimportComponent]
})
export class CaigouModule { }
