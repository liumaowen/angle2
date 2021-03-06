import { ModalDirective } from 'ngx-bootstrap';
import { GridOptions } from 'ag-grid/main';
import { SettingsService } from './../../../core/settings/settings.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { DatePipe } from '@angular/common';
import { UserapiService } from 'app/dnn/service/userapi.service';
import { ToasterService } from 'angular2-toaster';
import { MatchcarService } from 'app/routes/matchcar/matchcar.service';

@Component({
  selector: 'app-wuliupush',
  templateUrl: './wuliupush.component.html',
  styleUrls: ['./wuliupush.component.scss']
})
export class WuliupushComponent implements OnInit {
  @ViewChild('classicModal') private classicModal: ModalDirective;
  @ViewChild('addrdialog') private addrdialog: ModalDirective;
  model: any = {};
  gridOptions: GridOptions;
  start = new Date();
  end: Date;
  ckitems = [];
  isshowcreate = true;
  requestparams = {start: this.datepipe.transform(this.start, 'y-MM-dd'),
  end: '', cangkuid: '', grno: ''};
  params = {};
  results = [];
  endaddr: any;
  constructor(public settings: SettingsService,
    private reportService: ReportService,
    private datepipe: DatePipe, private userapi: UserapiService,
    private toast: ToasterService,
    private matchcarApi: MatchcarService) {
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
      rowSelection: 'multiple',
      localeText: this.settings.LOCALETEXT,
    };
    this.gridOptions.onGridReady = this.settings.onGridReady;
    this.gridOptions.groupSuppressAutoColumn = true;
    this.gridOptions.columnDefs = [
      { field: 'group', rowGroup: true, headerName: '??????', hide: true, valueGetter: (params) => '??????' },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'billno', minWidth: 100,
      cellRenderer: (params) => {
        if (params && params.data && null != params.data.billno) {
          if (params.data.billno.substring(0, 2) === 'AL') {
            return '<a target="_blank" href="#/allot/' + params.data.billid + '">' + params.data.billno + '</a>';
          } else if (params.data.billno.substring(0, 2) === 'MC') {
            return '<a target="_blank" href="#/matchcar/detail/' + params.data.billid + '">' + params.data.billno + '</a>';
          }
        } else {
          return '??????';
        }
      }, checkboxSelection: (params) => params && params.data, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true},
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'cdate', minWidth: 100 },
      // { cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'isdiaofee', minWidth: 90 },
      // { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'pingzheng', minWidth: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'cangkuname', minWidth: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'tihuoaddr', minWidth: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'songaddr', minWidth: 80 },
      { cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'xhlianxiren', minWidth: 80 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'xhlianxirenphone', minWidth: 80 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'orgname', minWidth: 80 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'salemanname', minWidth: 80 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'transtype', minWidth: 80 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'grno', minWidth: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'weight', minWidth: 90, aggFunc: 'sum',
      valueGetter: (params) => {
        if (params.data && params.data['weight']) {
          return Number(params.data['weight']);
        } else {
          return 0;
        }
      }, valueFormatter: this.settings.valueFormatter3 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'kunbaohao', minWidth: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'feeprice', minWidth: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'gn', minWidth: 80 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'chandi', minWidth: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'houdu', minWidth: 80,
      valueFormatter: this.settings.valueFormatter3
    },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'width', minWidth: 80
    },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'color', minWidth: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'duceng', minWidth: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'caizhi', minWidth: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'ppro', minWidth: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'packagetype', minWidth: 80 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'guige', minWidth: 120 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'zhongjiaobillno', minWidth: 120 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'transportno', minWidth: 120 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'carnum', minWidth: 120 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'driverinfo', minWidth: 120 },
    ];
  }

  ngOnInit() {
    this.ckitems = [{ value: '', label: '??????' }];
    this.userapi.cangkulist().then(data => {
      data.forEach(element => {
        this.ckitems.push(
          {
            value: element['id'],
            label: element['name']
          }
        );
      });
    });
  }

  listDetail() {
    if (this.end) {
      this.requestparams.end = this.datepipe.transform(this.end, 'y-MM-dd');
    }
    if (this.start) {
      this.requestparams.start = this.datepipe.transform(this.start, 'y-MM-dd');
    }
    this.reportService.getwuliupush(this.requestparams).then((response) => {
      this.gridOptions.api.setRowData(response); // ????????????
    });
  }
  openQueryDialog() {
    this.showclassicModal();
    this.selectNull();
  }

  selectNull() {
    this.requestparams = {start: this.datepipe.transform(this.start, 'y-MM-dd'),
    end: '', cangkuid: '', grno: ''};
  }

  // ??????
  query() {
    this.listDetail();
    this.hideclassicModal();
  }
  showclassicModal() {
    this.classicModal.show();
  }

  hideclassicModal() {
    this.classicModal.hide();
  }
  // ????????????????????????????????????
  addAddrDialog(no) {
    if (no === 2) {
      this.isshowcreate = false;
    } else if (no === 1) {
      this.isshowcreate = true;
    }
    const matchcardets = [];
    let xhlianxiren = '', xhlianxirenphone = '';
    const cangkuids = new Set(), xhlianxirenxinxi = new Set();
    const orderdetids = this.gridOptions.api.getModel()['rowsToDisplay'];
    for (let i = 0; i < orderdetids.length; i++) {
      if (orderdetids[i].selected && orderdetids[i]['field'] !== 'group') {
        matchcardets.push(orderdetids[i].data);
        cangkuids.add(orderdetids[i].data.cangkuid);
      }
    }
    if (matchcardets.length <= 0) {
      this.toast.pop('warning', '?????????????????????!');
      return;
    }
    if (cangkuids.size > 1) {
      this.toast.pop('warning', '??????????????????????????????!');
      return;
    }
    const matchcardetids = new Array();
    for (let i = 0; i < matchcardets.length; i++) {
      if (!xhlianxiren && matchcardets[i]['xhlianxiren']) {
        xhlianxiren = matchcardets[i]['xhlianxiren'];
      }
      if (!xhlianxirenphone && matchcardets[i]['xhlianxirenphone']) {
        xhlianxirenphone = matchcardets[i]['xhlianxirenphone'];
      }
      xhlianxirenxinxi.add(matchcardets[i]['xhlianxiren'] + '#' + matchcardets[i]['xhlianxirenphone']);
      matchcardetids.push({detid: matchcardets[i].detid, billtype: matchcardets[i].billtype, billid: matchcardets[i].billid});
    }
    if (xhlianxirenxinxi.size > 1) {
      this.toast.pop('warning', '?????????????????????????????????????????????!');
      return;
    }
    this.params['det'] = matchcardetids;
    this.params['cangkuid'] = Array.from(cangkuids)[0];
    this.params['xhlianxiren'] = xhlianxiren;
    this.params['xhlianxirenphone'] = xhlianxirenphone;
    this.addrdialog.show();
  }
  addrdialogclose() {
    this.addrdialog.hide();
  }
  searchplace(e) {
    this.matchcarApi.getSuggestionPlace(e.query).then(data => {
      console.log(data);
      this.results = [];
      data.forEach(element => {
        this.results.push({
          name: element.title + '\r\n' + element.address,
          code: element
        });
      });
    });
  }
  // ??????????????????????????????
  createwuliuorder() {
    if (!this.params['senddate']) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    if (!this.params['reachdate']) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    if (!this.endaddr['code']) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    this.params['senddate'] = this.datepipe.transform(this.params['senddate'], 'y-MM-dd');
    this.params['reachdate'] = this.datepipe.transform(this.params['reachdate'], 'y-MM-dd');
    this.params['endaddr'] = this.endaddr['code'];
    if (confirm('????????????????????????????????????')) {
      this.matchcarApi.createmoreRPCwuliuorder(this.params).then(data => {
        if (data['message']) {
          this.toast.pop('warning', data['message']);
        } else {
          this.toast.pop('success', '????????????');
          this.listDetail();
        }
        this.addrdialogclose();
      });
    }
  }
  // ????????????????????????
  updatewuliuorder() {
    if (!this.params['senddate']) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    if (!this.params['reachdate']) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    if (!this.endaddr['code']) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    this.params['senddate'] = this.datepipe.transform(this.params['senddate'], 'y-MM-dd');
    this.params['reachdate'] = this.datepipe.transform(this.params['reachdate'], 'y-MM-dd');
    this.params['endaddr'] = this.endaddr['code'];
    console.log(this.params);
    if (confirm('????????????????????????????????????')) {
      this.matchcarApi.moreupdateRPCwuliuorder(this.params).then(data => {
        if (data['message']) {
          this.toast.pop('warning', data['message']);
        } else {
          this.toast.pop('success', '???????????????');
          this.listDetail();
        }
        this.addrdialogclose();
      });
    }
  }
  // ??????/????????????
  cancelRPCWuliuOrder() {
    const matchcardets = [];
    let count = 0;
    let zhongjiaobillno = null;
    const orderdetids = this.gridOptions.api.getModel()['rowsToDisplay'];
    for (let i = 0; i < orderdetids.length; i++) {
      if (orderdetids[i].selected && orderdetids[i]['field'] !== 'group') {
        matchcardets.push(orderdetids[i].data);
        if (!zhongjiaobillno && orderdetids[i].data['zhongjiaobillno']) {
          zhongjiaobillno = orderdetids[i].data['zhongjiaobillno'];
          count++;
        }
        if (zhongjiaobillno !== orderdetids[i].data['zhongjiaobillno']) {
          count++;
        }
      }
    }
    if (matchcardets.length <= 0) {
      this.toast.pop('warning', '???????????????????????????!');
      return;
    }
    const matchcardetids = new Array();
    for (let i = 0; i < matchcardets.length; i++) {
      matchcardetids.push({detid: matchcardets[i].detid, billtype: matchcardets[i].billtype, billid: matchcardets[i].billid});
    }
    this.params['det'] = matchcardetids;
    if (confirm('??????????????????' + (count > 1 ? '    ??????    ' : '') + '??????????????????')) {
      this.matchcarApi.morecancelRPCwuliuorder(this.params).then(data => {
        if (data['message']) {
          this.toast.pop('warning', data['message']);
        } else {
          this.toast.pop('success', '???????????????');
          this.listDetail();
        }
      });
    }
  }
  // ????????????
  endRPCWuliuOrder() {
    const matchcardets = [];
    let count = 0;
    let zhongjiaobillno = null;
    const orderdetids = this.gridOptions.api.getModel()['rowsToDisplay'];
    for (let i = 0; i < orderdetids.length; i++) {
      if (orderdetids[i].selected && orderdetids[i]['field'] !== 'group') {
        matchcardets.push(orderdetids[i].data);
        if (!zhongjiaobillno && orderdetids[i].data['zhongjiaobillno']) {
          zhongjiaobillno = orderdetids[i].data['zhongjiaobillno'];
          count++;
        }
        if (zhongjiaobillno !== orderdetids[i].data['zhongjiaobillno']) {
          count++;
        }
      }
    }
    if (matchcardets.length <= 0) {
      this.toast.pop('warning', '????????????????????????????????????!');
      return;
    }
    const matchcardetids = new Array();
    for (let i = 0; i < matchcardets.length; i++) {
      matchcardetids.push(matchcardets[i].id); // ???orderdetid??????????????????
    }
    this.params['ids'] = matchcardetids;
    if (confirm('??????????????????' + (count > 1 ? '    ??????    ' : '') + '??????????????????')) {
      this.matchcarApi.endRPCwuliuorder(this.params).then(data => {
        this.toast.pop('success', '???????????????');
      });
    }
  }
  // ??????????????????
  syncRPCWuliuOrder() {
    const matchcardets = [];
    let count = 0;
    let zhongjiaobillno = null;
    const orderdetids = this.gridOptions.api.getModel()['rowsToDisplay'];
    for (let i = 0; i < orderdetids.length; i++) {
      if (orderdetids[i].selected && orderdetids[i]['field'] !== 'group') {
        matchcardets.push(orderdetids[i].data);
        if (!zhongjiaobillno && orderdetids[i].data['zhongjiaobillno']) {
          zhongjiaobillno = orderdetids[i].data['zhongjiaobillno'];
          count++;
        }
        if (zhongjiaobillno !== orderdetids[i].data['zhongjiaobillno']) {
          count++;
        }
      }
    }
    if (matchcardets.length <= 0) {
      this.toast.pop('warning', '????????????????????????????????????!');
      return;
    }
    const matchcardetids = new Array();
    for (let i = 0; i < matchcardets.length; i++) {
      matchcardetids.push({detid: matchcardets[i].detid, billtype: matchcardets[i].billtype, billid: matchcardets[i].billid});
    }
    this.params['det'] = matchcardetids;
    if (confirm('??????????????????' + (count > 1 ? '    ??????    ' : '') + '??????????????????')) {
      this.matchcarApi.moresyncRPCwuliuorder(this.params).then(data => {
        this.toast.pop('success', '???????????????');
        this.listDetail();
      });
    }
  }
}
