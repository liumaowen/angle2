import { GridOptions } from 'ag-grid/main';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SettingsService } from 'app/core/settings/settings.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatchcarService } from 'app/routes/matchcar/matchcar.service';
import { AddressparseService } from 'app/dnn/service/address_parse';
import { ClassifyApiService } from 'app/dnn/service/classifyapi.service';
import { Router } from '@angular/router';
import { WuliuscoreapiService } from '../wuliuscore/wuliuscoreapi.service';

@Component({
  selector: 'app-wuliusupplier',
  templateUrl: './wuliusupplier.component.html',
  styleUrls: ['./wuliusupplier.component.scss']
})
export class WuliusupplierComponent implements OnInit {
  @ViewChild('classicModal') private classicModal: ModalDirective;
  @ViewChild('supplierModal') private supplierModal: ModalDirective;
  search: object = {};
  model: object = {customerid: null, suppliertype: null};
  suppliertypes;
  gridOptions: GridOptions;
  constructor(
    public settings: SettingsService,
    private WuliuscoreApi: WuliuscoreapiService,
    private toast: ToasterService,
    private fb: FormBuilder,
    private matchcarAPi: MatchcarService,
    private addressparseService: AddressparseService,
    private classifyApi: ClassifyApiService,
    private router: Router,
    private datepipe: DatePipe) {
    this.gridOptions = {
      groupDefaultExpanded: -1,
      suppressAggFuncInHeader: true,
      enableRangeSelection: true,
      rowSelection: 'multiple',
      rowDeselection: true,
      overlayLoadingTemplate: this.settings.overlayLoadingTemplate,
      overlayNoRowsTemplate: this.settings.overlayNoRowsTemplate,
      enableColResize: true,
      enableSorting: true,
      excelStyles: this.settings.excelStyles,
      getContextMenuItems: this.settings.getContextMenuItems,
      enableFilter: true,
      localeText: this.settings.LOCALETEXT
    };

    this.gridOptions.onGridReady = this.settings.onGridReady;
    this.gridOptions.groupSuppressAutoColumn = true;

    this.classifyApi.listBypid({ pid: 14064 }).then((data) => {
      const categorylist = [{ label: '????????????????????????', value: '' }];
      data.forEach(element => {
        categorylist.push({
          label: element.name,
          value: element.id
        });
      });
      this.suppliertypes = categorylist;
    });

    // ??????aggird?????????
    this.gridOptions.columnDefs = [
      { 
        cellStyle: { 'text-align': 'center' }, headerName: '?????????????????????', field: 'name', minWidth: 80 ,
        onCellClicked: (params) => {
          if(params.data.actualfeecustomerid){
            this.model['customerid'] = params.data.actualfeecustomerid;
            this.supplierModal.show();
          }
        }
    },
      { 
        cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'actualfeename', minWidth: 110,
        cellRenderer: (params) => {
          if (params.data && params.data.actualfeecustomerid) {
            return '<a target="_blank" href="#/customer/' + params.data.actualfeecustomerid + '/zixin">' + params.data.actualfeename + '</a>';
          } else {
            return '';
          }
        }
    },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'hezuolimit', minWidth: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'businesslicense', minWidth: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????????????????????????????', field: 'roadpermit', minWidth: 80 },
      { cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'proxystatement', minWidth: 80 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'paymentinformation', minWidth: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'thjishixing', minWidth: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'safegrade', minWidth: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'compensate', minWidth: 90 },
    ];
  }

  ngOnInit() {
    this.query();
  }

  queryDialog(){
    this.classicModal.show();
  }
  hideclassicModal(){
    this.classicModal.hide();
  }
  query() {
    this.WuliuscoreApi.findsupplier(this.search).then(data => {
      this.gridOptions.api.setRowData(data);
      this.hideclassicModal();
    });
  }
  closeSupplierModal(){
    this.supplierModal.hide();
  }
  confirm(){
    this.WuliuscoreApi.updateSupplierType(this.model).then(data => {
      this.toast.pop('success', '??????????????????????????????');
      this.query();
      this.closeSupplierModal();
    });
  }
}
