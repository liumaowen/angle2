import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { ClassifyApiService } from '../../../dnn/service/classifyapi.service';
import { OrgApiService } from '../../../dnn/service/orgapi.service';
import { CustomerapiService } from '../../customer/customerapi.service';
import { OrderapiService } from '../../order/orderapi.service';
import { DatePipe } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';
import { GridOptions } from 'ag-grid';
import { ReportService } from '../../report/report.service';
import { MaoliService } from './../maoli.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { start } from 'repl';

@Component({
  selector: 'app-teshumaoli',
  templateUrl: './teshumaoli.component.html',
  styleUrls: ['./teshumaoli.component.scss']
})
export class TeshumaoliComponent implements OnInit {

  orgitems:any;
  start: Date = new Date();
  end: Date = new Date();
  maxDate: Date = new Date();
  cdate :Date = new Date();
  mdate :Date = new Date();

  requestparams:any =
    {
      start: this.datepipe.transform(this.start, 'y-MM-dd'),
      end: this.datepipe.transform(this.end, 'y-MM-dd'),
      orgid:''
    };
  teshumaoli:any = {
    orgid:'',
    gnid:'',
    chandi:'',
    cdate:this.datepipe.transform(this.cdate, 'y-MM-dd'),
    teshumaoli:''
  }

  gridOptions: GridOptions;
  constructor(public settings: SettingsService, private maoliApi: MaoliService,private datepipe: DatePipe, 
    private orderApi: OrderapiService,private classifyapi: ClassifyApiService,
    private customerApi: CustomerapiService, private orgApi: OrgApiService, private classifyApi: ClassifyApiService,
    private toast: ToasterService,private reportService: ReportService,) {
    this.gridOptions = {

      groupDefaultExpanded: -1,
      suppressAggFuncInHeader: true,
      enableRangeSelection: true,
      rowDeselection: true,
      overlayLoadingTemplate: this.settings.overlayLoadingTemplate,
      overlayNoRowsTemplate: this.settings.overlayNoRowsTemplate,
      enableColResize: true,
      enableSorting: true,
      excelStyles: this.settings.excelStyles,
      getContextMenuItems: this.settings.getContextMenuItems,
      enableFilter: true,
    }
    this.gridOptions.groupSuppressAutoColumn = true;
    this.gridOptions.columnDefs = [
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'mdate', width: 180},
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'orgname', width: 120 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'gnname', width: 180},
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'chandiname', width: 180},
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'teshumaoli', width: 180,
      valueFormatter: this.settings.valueFormatter2 },
    
    ];

  }

  ngOnInit() {
    // console.log();
    this.listDetail();
  }

  // ????????????
  listDetail() {
    this.maoliApi.queryteshumaoli(this.requestparams).then((response) => {
      console.log(response);
      this.gridOptions.api.setRowData(response);//????????????
    });
  }

  orgs = [];

  sellersResult = [];

  cangku = [];
  gns = [];

  //????????????
  getOrg(){
    this.orgitems = [{ value: '', label: '??????' }];
    this.orgApi.listAll(0).then((response) => {
      response.forEach(element => {
        this.orgitems.push({
          value: element.id,
          label: element.name
        });
      });
    });
  }

  // ???????????????
  openQueryDialog() {
    this.getOrg();
    this.showdialog();
  }

  //?????????????????????
  getGnAndChandi() {
    this.classifyapi.getGnAndChandi().then((data) => {
      // console.log(data);
      data.forEach(element => {
        this.gns.push({
          label: element['name'],
          value: element
        })
      })
    });
  }
  //???????????????
  addteshumaoli(){
    this.getOrg();
    this.getGnAndChandi();
    this.showcreate();
  };

  //????????????
  create(){
    if (!this.teshumaoli['orgid']) { this.toast.pop('warning', '?????????????????????'); return; }
    if (!this.teshumaoli['gnid']) { this.toast.pop('warning', '?????????????????????'); return; }
    if (!this.teshumaoli['chandi']) { this.toast.pop('warning', '?????????????????????'); return; }
    if (!this.teshumaoli['cdate']) { this.toast.pop('warning', '?????????????????????'); return; }
    if (!this.teshumaoli['teshumaoli']) { this.toast.pop('warning', '?????????????????????????????????'); return; }

    this.teshumaoli["gnid"] = this.teshumaoli["gnid"]["id"];
    console.log(this.teshumaoli);
    this.maoliApi.createteshumaoli(this.teshumaoli).then(() => {
      this.toast.pop('success', '????????????')
      this.hidecreate();
      /* ??????????????????*/
      this.listDetail();

    });
    this.clear();
  }

  // ???????????????????????????
  filterConditionObj = {}; // {chandi:[],width:[]}


  filters = {};
  conditions = null;

  disabled = true;

  cuser;

  suser;

  companys;
  // ??????
  query() {
    this.requestparams.start = this.datepipe.transform(this.start, 'yyyy-MM-dd');
    this.requestparams.end = this.datepipe.transform(this.end, 'y-MM-dd');
    console.log(this.requestparams);
    this.listDetail();
    this.hidedialog();
  }

  // ???????????????????????????????????????????????????
  selectNull() {
    this.requestparams = {
      start: this.datepipe.transform(this.start, 'y-MM-dd'),
      end: this.datepipe.transform(this.end, 'y-MM-dd'),
      orgid:''
    };
    this.start = new Date();
    this.end = new Date();
  }

  clear(){
    this.teshumaoli = {
      orgid:'',
      gnid:'',
      chandiid:'',
      cdate:this.datepipe.transform(this.cdate, 'y-MM-dd'),
      teshumaoli:''
    }
  }

  agExport() {
    const params = {
      skipHeader: false,
      skipFooters: false,
      skipGroups: false,
      allColumns: false,
      onlySelected: false,
      suppressQuotes: false,
      fileName: '??????????????????????????????.xls',
      columnSeparator: ''
    };
    this.gridOptions.api.exportDataAsExcel(params);
  }

  attrs: any[];
  chandis: any[];
  isChandi: boolean = false;
  selectedgn(value) {
    this.isChandi = true;
    this.attrs = [];
    this.chandis = [];
    value.attrs.forEach(element => {
      this.chandis.push({
        value: element.id,
        label: element.name
      });
    });
  }

  guigelength: number;//???????????????????????????
  selectedchandi(value) {
    this.attrs = [];
    this.classifyapi.getAttrs(value).then(data => {
      this.guigelength = data['length'];
      this.attrs = data;
    });
  }

  @ViewChild('queryModal') private queryModal: ModalDirective;
  
  @ViewChild('createModal') private createModal: ModalDirective;

  showdialog() {
    this.queryModal.show();
  }

  hidedialog() {
    this.queryModal.hide();
  }

  showcreate(){
    this.createModal.show();
  }

  hidecreate(){
    this.createModal.hide();
  }

}
