import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { ClassifyApiService } from '../../../dnn/service/classifyapi.service';
import { OrgApiService } from '../../../dnn/service/orgapi.service';
import { CustomerapiService } from '../../customer/customerapi.service';
import { OrderapiService } from '../../order/orderapi.service';
import { DatePipe } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';
import { GridOptions } from 'ag-grid';
import { ReportService } from '../report.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { start } from 'repl';

@Component({
  selector: 'app-bankuailirun',
  templateUrl: './bankuailirun.component.html',
  styleUrls: ['./bankuailirun.component.scss']
})
export class BankuailirunComponent implements OnInit {


  start: Date = new Date();
  y:any = new Date().getFullYear();
  m:any = new Date().getMonth();
  startDate :any = this.datepipe.transform(new Date(this.y,this.m,1),'y-MM-dd');

  end: Date = new Date();

  maxDate: Date = new Date();
  month:Date = new Date();

  requestparams =
    {
      // start: this.startDate,
      // end: this.datepipe.transform(this.end, 'y-MM-dd'),
      month: this.datepipe.transform(this.month, 'y-MM-dd'),
      bankuai:''
    };

  gridOptions: GridOptions;
  constructor(public settings: SettingsService, private datepipe: DatePipe, private orderApi: OrderapiService,
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
      { field: 'group', rowGroup: true, headerName: '??????', hide: true, valueGetter: (params) => '??????' },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'gn', width: 120 ,
      cellRenderer: (params) => {
        if (params.data) {
          return params.data['gn'];
        } else {
          return '??????';
        }
      }
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'chandi', width: 110 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????????????????????????????', field: 'tihuolirun', width: 160,
      aggFunc: 'sum', valueGetter: (params) => {
        if (params.data) {
          return Number(params.data['tihuolirun']);
        } else {
          return '';
        }
      }, 
      valueFormatter: this.settings.valueFormatter2 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????????????????????????????', field: 'feitiaohuolirun', width: 170,
      aggFunc: 'sum', valueGetter: (params) => {
        if (params.data) {
          return Number(params.data['feitiaohuolirun']);
        } else {
          return '';
        }
      }, 
      valueFormatter: this.settings.valueFormatter2 },
      { cellStyle: { 'text-align': 'center' }, headerName: '???????????????????????????', field: 'dzhidaojialirun', width: 150,
      aggFunc: 'sum', valueGetter: (params) => {
        if (params.data) {
          return Number(params.data['dzhidaojialirun']);
        } else {
          return '';
        }
      },
      valueFormatter: this.settings.valueFormatter2 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????????????????', field: 'beihuolirun', width: 150,
      aggFunc: 'sum', valueGetter: (params) => {
        if (params.data) {
          return Number(params.data['beihuolirun']);
        } else {
          return '';
        }
      },
      valueFormatter: this.settings.valueFormatter2 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????????????????', field: 'teshulirun', width: 150,
      aggFunc: 'sum', valueGetter: (params) => {
        if (params.data) {
          return Number(params.data['teshulirun']);
        } else {
          return '';
        }
      },
      valueFormatter: this.settings.valueFormatter2 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????????????????????????????', field: 'jigoulirun', width: 180,
      aggFunc: 'sum', valueGetter: (params) => {
        if (params.data) {
          return Number(params.data['jigoulirun']);
        } else {
          return '';
        }
      },
      valueFormatter: this.settings.valueFormatter2 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'zmaoli', width: 150,
      aggFunc: 'sum', valueGetter: (params) => {
        if (params.data) {
          return Number(params.data['zmaoli']);
        } else {
          return '';
        }
      },
      valueFormatter: this.settings.valueFormatter2 },
      { cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'ziyuanfp', width: 170,
      aggFunc: 'sum', valueGetter: (params) => {
        if (params.data) {
          return Number(params.data['ziyuanfp']);
        } else {
          return '';
        }
      },
      valueFormatter: this.settings.valueFormatter2 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'bankuai', width: 150 },
      
    ];

  }

  ngOnInit() {
    console.log();
    this.listDetail();
    //?????????????????????
    setInterval(() => {this.listDetail()},1800000);
  }

  // ????????????
  listDetail() {
    this.reportService.bankuailirun(this.requestparams).then((response) => {
      console.log(response);
      this.gridOptions.api.setRowData(response);//????????????
    });
  }

  orgs = [];

  sellersResult = [];

  cangku = [];
  gns = [];

  // ???????????????
  openQueryDialog() {
    this.showdialog();
  }

  data;

  // ???????????????????????????
  filterConditionObj = {}; // {chandi:[],width:[]}


  filters = {};
  conditions = null;

  disabled = true;

  cuser;

  suser;

    // ??????orgid??????
    bankuai = [{ label: '???????????????', value: '' }, { label: '????????????', value: 1 }, { label: '????????????', value: 2 }];

  companys;
  // ??????
  query() {
    // this.requestparams.start = this.datepipe.transform(this.start, 'y-MM-dd');
    // this.requestparams.end = this.datepipe.transform(this.end, 'y-MM-dd');
    // this.requestparams.month = this.datepipe.transform(this.month, 'y-MM-dd');
    console.log(this.requestparams);
    this.listDetail();
    this.hidedialog();
  }

  // ???????????????????????????????????????????????????
  selectNull() {
    this.requestparams = {
      month: this.datepipe.transform(this.month, 'y-MM-dd'),
      // start: this.datepipe.transform(this.start, 'y-MM-dd'),
      // end: this.datepipe.transform(this.end, 'y-MM-dd'),
      bankuai:''
    };
    // this.start = new Date();
    // this.end = new Date();
  }

  agExport() {
    const params = {
      skipHeader: false,
      skipFooters: false,
      skipGroups: false,
      allColumns: false,
      onlySelected: false,
      suppressQuotes: false,
      fileName: '??????????????????.xls',
      columnSeparator: ''
    };
    this.gridOptions.api.exportDataAsExcel(params);
  }

  @ViewChild('classicModal') private classicModal: ModalDirective;

  showdialog() {
    this.classicModal.show();
  }

  hidedialog() {
    this.classicModal.hide();
  }

  selectmonth(value) {
    this.requestparams['month'] = this.datepipe.transform(value, 'y-MM-dd');
  }

}
