import { Component, OnInit, ViewChild } from '@angular/core';
import { CaigouService } from '../caigou.service';
import { GridOptions } from 'ag-grid/main';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SettingsService } from './../../../core/settings/settings.service';
import { DatePipe } from '@angular/common';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cginvoiceing',
  templateUrl: './cginvoiceing.component.html',
  styleUrls: ['./cginvoiceing.component.scss']
})
export class CginvoiceingComponent implements OnInit {

  @ViewChild('classicModal') classicModal: ModalDirective;
  // @ViewChild('createModal') createModal: ModalDirective;
  parentthis;
  gridOptions: GridOptions;
  search: object = { supplierid: '', grno: '' };
  tweight = 0;
  tjine = 0;
  invoicedatemax: Date = new Date();
  invoicedate: Date = new Date();
  create: object = { rukuids: [], tuihuoids: [], buchaids: [], id: '' };
  constructor(private caigouApi: CaigouService, public settings: SettingsService, private datepipe: DatePipe,
    private toast: ToasterService, public bsModalRef: BsModalRef) {
    this.gridOptions = {
      groupDefaultExpanded: -1,
      rowSelection: 'multiple',
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
      onRowSelected: event2 => {
        console.log(event2);
        if (event2.node['selected']) {
          this.tweight = this.tweight + Number(event2.node.data.weight);
          this.tjine = this.tjine + Number(event2.node.data.jine);
        } else {
          this.tweight = this.tweight - Number(event2.node.data.weight);
          this.tjine = this.tjine - Number(event2.node.data.jine);
        }
      }
    };
    this.gridOptions.onGridReady = this.settings.onGridReady;
    this.gridOptions.groupSuppressAutoColumn = true;
    // ??????aggird?????????
    this.gridOptions.columnDefs = [
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', minWidth: 50, checkboxSelection: true, headerCheckboxSelection: true },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'billno', minWidth: 80 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'beizhu', minWidth: 80 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'grno', minWidth: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'supplier', minWidth: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'buyername', minWidth: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'chandi', minWidth: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'gn', minWidth: 80 },
      { cellStyle: { 'text-align': 'right' }, headerName: '??????', field: 'weight', minWidth: 80,
        valueFormatter: this.settings.valueFormatter3},
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'price', minWidth: 80,
        valueFormatter: this.settings.valueFormatter2},
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'jine', minWidth: 100,
        valueFormatter: this.settings.valueFormatter2},
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'guige', minWidth: 150 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'houdu', minWidth: 80,
        valueFormatter: this.settings.valueFormatter3},
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'width', minWidth: 80 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'color', minWidth: 80 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'caizhi', minWidth: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'beiqi', minWidth: 80 }
    ];
  }

  ngOnInit() {
  }
  querydata() {
    this.search['supplierid'] = this.parentthis.cginvoice['supplierid'];
    // this.search['gn'] = this.parentthis.cginvoice['billgn']; 20200213 lmw ??????????????????
    // this.search['orgid'] = this.parentthis.cginvoice['orgid'];
    this.caigouApi.getcginvoiceing(this.search).then(data => {
      this.gridOptions.api.setRowData(data);
    });
    this.hideDialog();
  }
  showDialog() {
    this.search = { supplierid: '', grno: '' };
    this.classicModal.show();
  }
  import() {
    this.create = { rukuids: [], tuihuoids: [], buchaids: [], id: '' };
    let list = [];
    const ids = new Array();
    const buchaids = new Array();
    const tuihuoids = new Array();
    list = this.gridOptions.api.getSelectedNodes();
    if (list.length === 0) {
      this.toast.pop('warning', '????????????????????????');
      return '';
    } else {
      console.log('select', list);
      for (let i = 0; i < list.length; i++) {
        if (list[i].data.type === 1) {
          ids.push(list[i].data.billid);
        } else if (list[i].data.type === 2) {
          tuihuoids.push(list[i].data.billid);
        } else if (list[i].data.type === 3) {
          buchaids.push(list[i].data.billid);
        }
      }
      this.create['id'] = this.parentthis.cginvoice['id'];
      this.create['rukuids'] = ids;
      this.create['tuihuoids'] = tuihuoids;
      this.create['buchaids'] = buchaids;
    }
    console.log('create', this.create);
    this.caigouApi.importinvoice(this.create).then(data => {
      this.parentthis.querydata();
    });
    this.bsModalRef.hide();
  }
  hideDialog() {
    this.classicModal.hide();
  }
}
