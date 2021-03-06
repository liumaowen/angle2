import { ToasterService } from 'angular2-toaster';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { SettingsService } from 'app/core/settings/settings.service';
import { ReportService } from 'app/routes/report/report.service';
import { CustomerapiService } from 'app/routes/customer/customerapi.service';
import { OrgApiService } from 'app/dnn/service/orgapi.service';
import { ClassifyApiService } from 'app/dnn/service/classifyapi.service';
import { DatePipe } from '@angular/common';
import { XiaoshouapiService } from '../xiaoshouapi.service';

const sweetalert = require('sweetalert');

@Component({
  selector: 'app-cangkutihuo',
  templateUrl: './cangkutihuo.component.html',
  styleUrls: ['./cangkutihuo.component.scss']
})
export class CangkutihuoComponent implements OnInit {
  names:any;
  flags:any;
  requestparams = { id: '', start: '', end: '', shitistart: '', shitiend: '', tihuotype: '', status: '',sijiname:'',idcardno:'',carno:'' };
  gridOptions: GridOptions;

  constructor(public settings: SettingsService, private cangkutihuoApi: XiaoshouapiService, private customerApi: CustomerapiService, private orgApi: OrgApiService, private classifyApi: ClassifyApiService, private reportApi: ReportService, private toast: ToasterService, private datepipe: DatePipe) {
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
      enableFilter: true
    };

    this.gridOptions.onGridReady = this.settings.onGridReady;
    this.gridOptions.groupSuppressAutoColumn = true;
    this.gridOptions.columnDefs = [
      { field: 'group', rowGroup: true, headerName: '??????', hide: true , valueGetter: (params) => '??????'},
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'billno', minWidth: 100,
        cellRenderer: (params) => {
          if (params.data) {
            return '<a target="_blank" href="#/cangkutihuo/' + params.data.billid + '">' + params.data.billno + '</a>';
          }else {
            return '??????';
          }
        }
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????ID', field: 'tihuodetid', minWidth: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'billtype', minWidth: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'isonline', minWidth: 60 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'billstatus', minWidth: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'detstatus', minWidth: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'cangkuname', minWidth: 100 },
      { cellStyle: { 'text-align': 'right' }, headerName: '??????', field: 'weight', minWidth: 60, aggFunc: 'sum',
        valueGetter: (params) => {
          if (params.data) {
            return Number(params.data['weight']);
          } else {
            return 0;
          }
        }, valueFormatter: this.settings.valueFormatter3
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'sijiname', minWidth: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'idcardno', minWidth: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'carno', minWidth: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'gn', minWidth: 60 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'chandi', minWidth: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'houdu', minWidth: 60,
      valueFormatter: this.settings.valueFormatter3
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'width', minWidth: 60
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'lengths', minWidth: 60 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'color', minWidth: 70 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'duceng', minWidth: 70 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'caizhi', minWidth: 70 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'ppro', minWidth: 70 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'kunbaohao', minWidth: 150 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'grno', minWidth: 150 },

      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'shitidate', minWidth: 150 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'cdate', minWidth: 150 },
      { cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'orgname', minWidth: 150 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'salemanname', minWidth: 150 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'sorgname', minWidth: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'cusername', minWidth: 75 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'ausername', minWidth: 75 },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????ID', field: 'kucunid', minWidth: 75,
        cellRenderer: (params) => {
          if (params.data) {
            if (null != params.data.kucunid) {
              return '<a target="_blank" href="#/chain/' + params.data.kucunid + '">' + params.data.kucunid + '</a>';
            }
          }else {
            return '';
          }
        }
      }
    ];

    this.listDetail();
  }


  ngOnInit() {
  }

  listDetail() {
    this.requestparams.start = this.datepipe.transform(this.start, 'y-MM-dd');
    if (this.end) this.requestparams.end = this.datepipe.transform(this.end, 'y-MM-dd');
    if (this.shitistart) this.requestparams.shitistart = this.datepipe.transform(this.shitistart, 'y-MM-dd');
    if (this.shitiend) this.requestparams.shitiend = this.datepipe.transform(this.shitiend, 'y-MM-dd');
    console.log(this.requestparams);
    this.cangkutihuoApi.cangkutihuodet(this.requestparams).then((response) => {
      this.gridOptions.api.setRowData(response); // ????????????
    });
  };

  openQueryDialog() {
    this.names = [{ label: '??????', value: '' }, { value: 1, label: '?????????' }, { value: 2, label: '?????????' }, { value: 3, label: '?????????' }];
    this.flags = [{ label: '??????', value: '' }, { value: false, label: '??????' }, { value: true, label: '??????' }];
    this.showDialog();
  }

  // ??????????????????
  @ViewChild('classicModal') private classicModal: ModalDirective;

  // ??????????????????
  showDialog() {
    this.classicModal.show();
  }

  // ??????????????????
  hideDialog() {
    this.classicModal.hide();
  }

  start: Date = new Date();
  end: Date;
  shitistart: Date;
  shitiend: Date;
  // ??????
  query() {
    if (!this.start) {
      this.toast.pop('warning', '???????????????????????????');
      return;
    } else {
      this.listDetail();
      this.hideDialog();
    }
  }
  // ??????
  selectNull() {
    this.start = new Date();
    this.end = null;
    this.shitiend = null;
    this.shitistart = null;
    this.requestparams = { id: '', start: '', end: '', shitistart: '', shitiend: '', tihuotype: '', status: '',sijiname:'',idcardno:'',carno:'' };
  }
 
}
