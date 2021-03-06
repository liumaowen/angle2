import { ModalDirective } from 'ngx-bootstrap/modal';
import { OrderapiService } from './../orderapi.service';
import { ToasterService } from 'angular2-toaster';
import { ColDef, GridOptions } from 'ag-grid';
import { SettingsService } from './../../../core/settings/settings.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { OrgApiService } from 'app/dnn/service/orgapi.service';

@Component({
  selector: 'app-tudusaledet',
  templateUrl: './tudusaledet.component.html',
  styleUrls: ['./tudusaledet.component.scss']
})
export class TudusaledetComponent implements OnInit {
  gridOptions: GridOptions;
  workdaygridOptions: GridOptions;
  orgplangridOptions: GridOptions;
  daigpgridOptions: GridOptions;
  bakOptions: GridOptions;
  model: any = {};
  orgs: any = [];
  orgid: any;
  count = 0;
  count1 = 0;
  search: any = {};
  @ViewChild('workdayModal') private workdayModal: ModalDirective;
  @ViewChild('orgplanModal') private orgplanModal: ModalDirective;
  @ViewChild('daigpModal') private daigpModal: ModalDirective;
  @ViewChild('orgModal') private orgModal: ModalDirective;
  @ViewChild('bakModal') private bakModal: ModalDirective;

  constructor(public settings: SettingsService,
     private toast: ToasterService,
    private orderApi: OrderapiService,
    public numberPipe: DecimalPipe,
    private orgApi: OrgApiService) {

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
      localeText: this.settings.LOCALETEXT,
      animateRows: true
    };
    this.gridOptions.onGridReady = this.settings.onGridReady;
    this.gridOptions.groupSuppressAutoColumn = true;
    this.gridOptions.columnDefs = [
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'orgname', minWidth: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'orgusername', minWidth: 100
      },
      {
        cellStyle: { 'display': 'block' }, headerName: '?????????1??????', headerClass: 'wis-ag-center', colId: 'curmonthname',
        children: [
          { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'curweight', minWidth: 100,
            valueGetter: (params) => {
              if (params.data && params.data['curweight']) {
                return Number(params.data['curweight']);
              } else {
                return 0;
              }
            },
            valueFormatter: this.settings.valueFormatter
          },
          { cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'yuejiedan', minWidth: 100,
            valueGetter: (params) => {
              if (params.data && params.data['yuejiedan']) {
                return Number(params.data['yuejiedan']);
              } else {
                return 0;
              }
            },
            valueFormatter: this.settings.valueFormatter
          },
          { cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'yuedadan', minWidth: 100,
            valueGetter: (params) => {
              if (params.data && params.data['yuedadan']) {
                return Number(params.data['yuedadan']);
              } else {
                return 0;
              }
            },
            valueFormatter: this.settings.valueFormatter
          },
          { cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'yueshiti', minWidth: 100,
            valueGetter: (params) => {
              if (params.data && params.data['yueshiti']) {
                return Number(params.data['yueshiti']);
              } else {
                return 0;
              }
            },
            valueFormatter: this.settings.valueFormatter
          },
          { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'currate', minWidth: 100
          }
        ]
      },
      {
        cellStyle: { 'display': 'block' }, headerName: '?????????1?????????', headerClass: 'wis-ag-center', colId: 'jiname',
        children: [
          { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'jiweight', minWidth: 100,
            valueGetter: (params) => {
              if (params.data && params.data['jiweight']) {
                return Number(params.data['jiweight']);
              } else {
                return 0;
              }
            },
            valueFormatter: this.settings.valueFormatter
          },
          { cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'quartershiti', minWidth: 100,
            valueGetter: (params) => {
              if (params.data && params.data['quartershiti']) {
                return Number(params.data['quartershiti']);
              } else {
                return 0;
              }
            },
            valueFormatter: this.settings.valueFormatter
          },
          { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'jirate', minWidth: 100
          }
        ]
      },
      {
        cellStyle: { 'display': 'block' }, headerName: '??????', headerClass: 'wis-ag-center',
        children: [
          { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'yearweight', minWidth: 100,
            valueGetter: (params) => {
              if (params.data && params.data['yearweight']) {
                return Number(params.data['yearweight']);
              } else {
                return 0;
              }
            },
            valueFormatter: this.settings.valueFormatter
          },
          { cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'yearshiti', minWidth: 100,
            valueGetter: (params) => {
              if (params.data && params.data['yearshiti']) {
                return Number(params.data['yearshiti']);
              } else {
                return 0;
              }
            },
            valueFormatter: this.settings.valueFormatter
          },
          { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'yearrate', minWidth: 100
          }
        ]
      },
      {
        cellStyle: { 'display': 'block' }, headerName: '?????????1??????', headerClass: 'wis-ag-center', colId: 'curmonthname',
        children: [
          { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'newproduct', minWidth: 110,
            valueGetter: (params) => {
              if (params.data && params.data['newproduct']) {
                return Number(params.data['newproduct']);
              } else {
                return 0;
              }
            },
            valueFormatter: this.settings.valueFormatter
          },
          { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'salesrate', minWidth: 110
          },
          { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'yueqihuojiedan', minWidth: 110,
            valueGetter: (params) => {
              if (params.data && params.data['yueqihuojiedan']) {
                return Number(params.data['yueqihuojiedan']);
              } else {
                return 0;
              }
            },
            valueFormatter: this.settings.valueFormatter
          }

        ]
      },
    ];
    this.workdaygridOptions = {
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
      localeText: this.settings.LOCALETEXT,
      singleClickEdit: true, // ????????????
      stopEditingWhenGridLosesFocus: true // ????????????????????????
    };
    this.workdaygridOptions.onGridReady = this.settings.onGridReady;
    this.workdaygridOptions.groupSuppressAutoColumn = true;
    this.workdaygridOptions.columnDefs = [
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'month', minWidth: 70
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'day', minWidth: 70
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'workday', minWidth: 70,
       editable: (params) => params.node.data['id'],
      onCellValueChanged: (params) => { this.updateworkday(params, 'workday'); }
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????????????????', field: 'finishworkday', minWidth: 110,
      editable: (params) => params.node.data['id'],
      onCellValueChanged: (params) => { this.updateworkday(params, 'finishworkday'); }
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'jindu', minWidth: 70
      },
    ];
    this.orgplangridOptions = {
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
      localeText: this.settings.LOCALETEXT,
      singleClickEdit: true, // ????????????
      stopEditingWhenGridLosesFocus: true // ????????????????????????
    };
    this.orgplangridOptions.onGridReady = this.settings.onGridReady;
    this.orgplangridOptions.groupSuppressAutoColumn = true;
    this.orgplangridOptions.columnDefs = [
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'orgname', minWidth: 70}
    ];
    this.daigpgridOptions = {
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
      localeText: this.settings.LOCALETEXT,
      singleClickEdit: true, // ????????????
      stopEditingWhenGridLosesFocus: true // ????????????????????????
    };
    this.daigpgridOptions.onGridReady = this.settings.onGridReady;
    this.daigpgridOptions.groupSuppressAutoColumn = true;
    this.daigpgridOptions.columnDefs = [
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'orgname', minWidth: 70}
    ];
    this.bakOptions = {
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
      localeText: this.settings.LOCALETEXT
    };
    this.bakOptions.onGridReady = this.settings.onGridReady;
    this.bakOptions.groupSuppressAutoColumn = true;
    this.bakOptions.columnDefs = [
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'month', minWidth: 70,
        cellRenderer: (params) => {
          if (params && params.data && null != params.data.month) {
            return '<a>' + params.data.month + '</a>';
          } else {
            return '';
          }
        },
        onCellClicked: (params) => {
          if (params.data.month) {
            const mon = params.data.month.substr(0, 4) + '-' + params.data.month.substr(4) + '-01';
            this.search['month'] = mon;
            this.bakcoles();
            this.listDetail();
          }
        }
      }
    ];
  }

  ngOnInit() {
    this.search = {};
    this.listDetail();
  }
  headerformat() {
    let date: Date = null;
      if (this.search['month']) {
        date = new Date(this.search['month']);
      } else {
        date = new Date();
      }
      this.gridOptions.columnDefs.forEach((colde: ColDef) => {
        if (colde.colId === 'curmonthname') {
          const month = date.getMonth() + 1;
          colde.headerName = `?????????${month}??????`;
        }
        if (colde.colId === 'jiname') {
          const ji = this.getQuarter(date);
          colde.headerName = `?????????${ji}?????????`;
        }
      });
      this.gridOptions.api.setColumnDefs(this.gridOptions.columnDefs);
  }
  refresh() {
    this.search = {};
    this.listDetail();
  }
  // ????????????
  listDetail() {
    this.orderApi.gettudusaledet(this.search).then(data => {
      this.model = data['map'];
      this.gridOptions.api.setRowData(data['list']);
      this.gridOptions.columnApi.autoSizeAllColumns();
    });
    setTimeout(() => {
      this.headerformat();
    }, 10);
  }

  // ??????
  impyunfee() {
    const params = {
      skipHeader: false,
      skipFooters: false,
      skipGroups: false,
      allColumns: false,
      onlySelected: false,
      suppressQuotes: false,
      fileName: '????????????????????????.xls',
      columnSeparator: ''
    };
    this.gridOptions.api.exportDataAsExcel(params);
  }
  getworkday() {
    const year = new Date().getFullYear();
    this.orderApi.getworkday({year: year}).then(data => {
      this.workdaygridOptions.api.setRowData(data);
    });
  }
  // ?????????????????????
  showworkday() {
    this.workdayModal.show();
    this.getworkday();
  }
  workdaycoles() {
    this.workdayModal.hide();
  }
  /**??????????????? */
  updateworkday(params, filed) {
    if (!params.node.data.id) {
      return;
    }
    if (isNaN(params.data[filed])) {
      this.toast.pop('warning', '??????????????????');
      return;
    }
    if (!isNaN(params.data[filed]) && params.data[filed]) {
      params.node.data[filed] = Number(this.numberPipe.transform(params.node.data[filed], '1.0-0'));
    }
    const id = params.node.data.id;
    const update = {workday: params.node.data['workday'], finishworkday: params.node.data['finishworkday']};
    this.orderApi.updateworkday(id, update).then(data => {
      this.getworkday();
    }, err => {
      params.node.data[filed] = params.oldValue;
      params.node.setData(params.node.data);
    });
  }
  /**
   * ????????????????????????
   */
  getcolumnDefs() {
    for (let index = 1; index < 13; index++) {
      const column = { cellStyle: { 'text-align': 'center' }, headerName: `${index}???`, field: `month${index}`, minWidth: 50,
        editable: (params) => params.node.data['orgid'],
        onCellValueChanged: (params) => { this.updateorgplan(params, `month${index}`); }
      };
      this.orgplangridOptions.columnDefs.push(column);
    }
    const column1 = { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: `caozuo`, minWidth: 50,
      cellRenderer: (params) => { return '<a target="_blank">??????</a>'; } , onCellClicked: (data) => {
        if (confirm('????????????????????????')) {
          this.delete(data.data);
        }
      }
    };
    const column2 = { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: `sortorder`, minWidth: 50,
    editable: (params) => params.node.data['orgid'],
    onCellValueChanged: (params) => { this.updatesortorder(params, 'sortorder'); }
    };
    this.orgplangridOptions.columnDefs.push(column2);
    this.orgplangridOptions.columnDefs.push(column1);
    this.orgplangridOptions.api.setColumnDefs(this.orgplangridOptions.columnDefs);
    this.orgplangridOptions.onGridReady = this.settings.onGridReady;
    this.count++;
  }
  /**
   * ????????????????????????
   */
  getcolumnDefs1() {
    for (let index = 1; index < 13; index++) {
      const column = { cellStyle: { 'text-align': 'center' }, headerName: `${index}???`, field: `month${index}`, minWidth: 50,
        editable: (params) => params.node.data['orgid'],
        onCellValueChanged: (params) => { this.updatedaigp(params, `month${index}`); }
      };
      this.daigpgridOptions.columnDefs.push(column);
    }
    this.daigpgridOptions.api.setColumnDefs(this.daigpgridOptions.columnDefs);
    this.daigpgridOptions.onGridReady = this.settings.onGridReady;
    this.count1++;
  }
  getorgplanlist() {
    this.orderApi.getOrgplanList().then(data => {
      this.orgplangridOptions.api.setRowData(data);
    });
  }
  getdaigplist() {
    this.orderApi.getDaigpList().then(data => {
      this.daigpgridOptions.api.setRowData(data);
    });
  }
  showdaigp() {
    this.daigpModal.show();
    if (this.count1 < 1) {
      this.getcolumnDefs1();
    }
    setTimeout(() => {
      this.getdaigplist();
    }, 0);
  }
  daigpcoles() {
    this.daigpModal.hide();
  }
  showplan() {
    this.orgplanModal.show();
    if (this.count < 1) {
      this.getcolumnDefs();
    }
    setTimeout(() => {
      this.getorgplanlist();
    }, 0);
  }
  orgplancoles() {
    this.orgplanModal.hide();
  }
  showorg() {
    this.orgModal.show();
    this.getorg();
    this.orgid = '';
  }
  /**??????????????????????????? */
  updatedaigp(params, filed) {
    if (!params.node.data.orgid) {
      this.toast.pop('warning', '???????????????????????????');
      return;
    }
    if (isNaN(params.data[filed])) {
      this.toast.pop('warning', '??????????????????');
      params.node.data[filed] = params.oldValue;
      params.node.setData(params.node.data);
      return; 
    }
    if (!isNaN(params.data[filed]) && params.data[filed]) {
      params.node.data[filed] = params.node.data[filed].fmoney(3, 0);
    }
    this.orderApi.updatedaigp(params.node.data).then(data => {
      this.getdaigplist();
    }, err => {
      params.node.data[filed] = params.oldValue;
      params.node.setData(params.node.data);
    });
  }
  /**????????????????????? */
  updateorgplan(params, filed) {
    if (!params.node.data.orgid) {
      this.toast.pop('warning', '???????????????????????????');
      return;
    }
    if (isNaN(params.data[filed])) {
      this.toast.pop('warning', '??????????????????');
      params.node.data[filed] = params.oldValue;
      params.node.setData(params.node.data);
      return;
    }
    if (!isNaN(params.data[filed]) && params.data[filed]) {
      params.node.data[filed] = Number(params.node.data[filed]).toFixed(3);
    }
    this.orderApi.updateorgplan(params.node.data).then(data => {
      this.getorgplanlist();
    }, err => {
      params.node.data[filed] = params.oldValue;
      params.node.setData(params.node.data);
    });
  }
  /**?????????????????? */
  updatesortorder(params, filed) {
    if (!params.node.data.orgid) {
      this.toast.pop('warning', '???????????????????????????');
      return;
    }
    if (isNaN(params.data[filed])) {
      this.toast.pop('warning', '??????????????????');
      params.node.data[filed] = params.oldValue;
      params.node.setData(params.node.data);
      return;
    }
    if (!isNaN(params.data[filed]) && params.data[filed]) {
      params.node.data[filed] = params.node.data[filed].fmoney(0);
    }
    this.orderApi.updateorgplan(params.node.data).then(data => {
      this.getorgplanlist();
    }, err => {
      params.node.data[filed] = params.oldValue;
      params.node.setData(params.node.data);
    });
  }
  getorg() {
    this.orgs = [{ value: '', label: '??????' }];
    this.orgApi.listAll(0).then((response) => {
      response.forEach(element => {
        this.orgs.push({
          value: element.id,
          label: element.name
        });
      });
    });
  }
  orgcoles() {
    this.orgModal.hide();
  }
  addorg() {
    if (!this.orgid) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    const year = new Date().getFullYear();
    const obj = {year: year, orgid: this.orgid};
    this.orderApi.createorgplan(obj).then(data => {
      this.orgcoles();
      this.getorgplanlist();
    });
  }
  /**??????????????????????????? */
  delete(params) {
    this.orderApi.deleteorgplan({orgid: params.orgid, year: params.year}).then(data => {
      this.getorgplanlist();
    });
  }
  gethistory() {
    this.bakModal.show();
    this.orderApi.tudusalegroupByMonth().then(data => {
      this.bakOptions.api.setRowData(data);
      this.bakOptions.columnApi.autoSizeAllColumns();
    });
  }
  bakcoles() {
    this.bakModal.hide();
  }
  /**
   * ?????????????????????
   */
  getQuarter(date: Date) {
    const month = date.getMonth();
    if (month < 3) {
      return '1';
    }else if (month < 6) {
      return '2';
    }else if (month < 9) {
      return '3';
    }else if (month < 12) {
      return '4';
    }
  }
}
