import { StorageService } from './../../../dnn/service/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CaigoudetimportComponent } from './../../../dnn/shared/caigoudetimport/caigoudetimport.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CaigouService } from '../caigou.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QihuoService } from '../../qihuo/qihuo.service';
import { GridOptions } from 'ag-grid/main';
import { SettingsService } from './../../../core/settings/settings.service';
import { ClassifyApiService } from '../../../dnn/service/classifyapi.service';
import { ModalDirective, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { DatePipe } from '@angular/common';
// import { SelectComponent } from 'ng2-select';

const sweetalert = require('sweetalert');
@Component({
  selector: 'app-rukuapplydet',
  templateUrl: './rukuapplydet.component.html',
  styleUrls: ['./rukuapplydet.component.scss']
})
export class RukuapplydetComponent implements OnInit {

  form: FormGroup;
  // @ViewChild('defaultGroup') public nselect: SelectComponent;
  @ViewChild('classicModal') classicModal: ModalDirective;
  @ViewChild('supplierModal') supplierModal: ModalDirective;
  @ViewChild('weightModal') weightModal: ModalDirective;
  @ViewChild('priceModal') priceModal: ModalDirective;
  @ViewChild('gcmodify') private gcmodify: ModalDirective;
  @ViewChild('addrmodify') private addrmodify: ModalDirective;
  @ViewChild('gongchamodify') private gongchamodify: ModalDirective;
  @ViewChild('dateModal') private dateModal: ModalDirective;
  @ViewChild('countmodify') private countmodify: ModalDirective;
  @ViewChild('beizhumodify') private beizhumodify: ModalDirective;
  @ViewChild('jiesuanmodify') private jiesuanmodify: ModalDirective;
  @ViewChild('areamodify') private areamodify: ModalDirective;
  colors: Array<any>;
  color = { detid: null };
  @ViewChild('colormodify') private colormodify: ModalDirective;
  @ViewChild('gcinfodialog') private gcinfodialog: ModalDirective;
  @ViewChild('hetongdialog') private hetongdialog: ModalDirective;
  gridOptions: GridOptions;
  // ??????????????????
  jiaohuodatemin: Date = new Date();
  // ????????????
  jiaohuodate: Date = new Date();
  det: object = {
    gn: '', chandi: '', guige: '', rukuapplyid: '', weight: '', count: '', length: '', beizhu: '',
  };
  areas = new Array();
  // ??????
  gns: any[];
  gn;
  // ??????
  chandis: any[];
  cs: any[];
  showGuige: boolean;
  isChandi: boolean;
  // ??????
  attrs: any;
  modifyweight: Object = { caigouweight: null, detid: '' };
  modifyprice: Object = {};
  rukuapply: Object = { seller: '', buyer: '', vuser: '', org: '' };
  // ?????????
  grno: Object = { grno: null, detid: '' };
  // ??????????????????
  cgbsModalRef: BsModalRef;
  cg: object = { id: '', beizhu: '' };
  flag: Object = { qihuo: false, tijiao: false, shenhe: false, qishen: false };
  supplier: Object = { supplierid: '', id: '' };
  houdugongchas: any[];
  widthgongchas: any[];
  yongtus: any[];
  oneweights: any[];
  copy: Object = { id: '' };
  // ????????????????????????????????????
  values = [];
  newattrid: number;
  modifygcdetid: number;
  attrname: any;
  // ????????????
  jiaohuoaddrs: any[];
  // ????????????
  gongchas: any[];
  gongchaModel: Object = { detid: '', type: '', name: '', id: '' };
  // ??????
  types = [{ value: '1', label: '?????????' }, { value: '2', label: '?????????' }];
  nextflag = false;
  modfiyflag: number; // 1.??????2.??????3.??????4.??????5.??????
  chandiErro: boolean; // ????????????????????????????????????true
  iscountshow: boolean; // ??????????????????
  isrukuapply = true;
  constructor(private caigouApi: CaigouService, private fb: FormBuilder, private actroute: ActivatedRoute, public settings: SettingsService,
    private classifyApi: ClassifyApiService, private toast: ToasterService, private bsModalService: BsModalService,
    private qihuoapi: QihuoService, private router: Router, private datepipe: DatePipe, private storage: StorageService) {
    // ????????????
    this.form = fb.group({
      // 'rukuweight': [null, Validators.compose([Validators.required,
      // Validators.pattern('^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,3})?$')])],
      'price': [null, Validators.compose([Validators.required, Validators.pattern('^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$')])],
      'beizhu': [],
      'count': [null, Validators.compose([Validators.required,
      Validators.pattern('^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,3})?$')])],
      'length': [null, Validators.compose([Validators.required,
      Validators.pattern('^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,3})?$')])],
      'weight': [null, Validators.compose([Validators.required,
      Validators.pattern('^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,3})?$')])],
      'type': [],
      // 'yongtu': [],
      // 'gongcha': [],
      // 'houdugongcha': [],
      // 'widthgongcha': [],
      // 'jiesuanprice': [null, Validators.compose([Validators.required,
      // Validators.pattern('^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$')])],
      // 'zhuanhuo': [],
      // 'orgid': []
    });
    this.det['rukuapplyid'] = this.actroute.params['value']['id'];
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
      getContextMenuItems: (params) => {
        const result = [
          'copy',
          {
            name: '?????????',
            action: () => {
              params.columnApi.autoSizeAllColumns();
            }
          }
        ];
        if (params.node.data) {
          result.push({
            name: '????????????',
            action: () => {
              this.copy['id'] = params.node.data.id;
              this.caigouApi.copyrukudet(this.copy['id']).then(data => {
                this.toast.pop('success', '?????????????????????');
                this.getrukuapply();
              });
            }
          });
        }
        return result;
      }
    };
    this.gridOptions.onGridReady = this.settings.onGridReady;
    // this.gridOptions.groupUseEntireRow = true;
    this.gridOptions.groupSuppressAutoColumn = true;
    // ??????aggird?????????
    this.gridOptions.columnDefs = [
      { field: 'group', rowGroup: true, headerName: '??????', hide: true, valueGetter: (params) => '??????' },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.gn', minWidth: 80,
        cellRenderer: (params) => {
          if (params.data) {
            return params.data.goodscode.gn;
          } else {
            return '??????';
          }
        }
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.chandi', minWidth: 100 },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'grno', minWidth: 100,
        cellRenderer: (params) => {
          console.log('params', params);
          if (params.value === null || params.value === undefined) {
            return null;
          } else {
            return params.value;
          }
        },
        onCellValueChanged: (params) => {
          console.log('value', params.newValue);
          if (params.data.rukuweight !== '0') {
            this.getrukuapply();
            this.toast.pop('error', '????????????????????????????????????????????????', '');
            return;
          }
          if (params.newValue === null || params.newValue === undefined) {
            this.grno['grno'] = null;
          } else {
            console.log('value1', params.newValue);
            this.grno['grno'] = params.newValue;
          }
          this.grno['detid'] = params.data.id;
          this.caigouApi.addgrno(this.grno).then(data => {
            this.toast.pop('success', '????????????????????????');
            this.getrukuapply();
          });
          console.log('value1asd');
        }
        // onCellClicked: (params) => {
        //   this.grno['detid'] = params.data.id;
        //   this.grno['grno'] = params.data.grno;
        //   console.log(params);
        //   this.grnoModal.show();
        // }
      },
      // {
      //   cellStyle: { 'text-align': 'center' }, headerName: '??????', field: '', minWidth: 80,
      //   cellRenderer: (params) => {
      //     if (params.data) {
      //     if (!params.data.finish && params.data.id) {
      //       return '<a target="_blank">??????</a>';
      //     } else {
      //       return '';
      //     }}
      //   }, onCellClicked: (params) => {
      //     if (!params.data.finish && params.data.id) {
      //       sweetalert({
      //         title: '????????????????????????',
      //         type: 'warning',
      //         showCancelButton: true,
      //         confirmButtonColor: '#23b7e5',
      //         confirmButtonText: '??????',
      //         cancelButtonText: '??????',
      //         closeOnConfirm: false
      //       }, () => {
      //         this.caigouApi.finish(params.data.id).then(data => {
      //           this.toast.pop('success', '??????????????????');
      //           this.getrukuapply();
      //         });
      //         sweetalert.close();
      //       });
      //     }
      //   }
      // },
      // {
      //   cellStyle: { 'text-align': 'right' }, headerName: '?????????', field: 'caigouweight', minWidth: 80,
      //   onCellClicked: (params) => {
      //     if (params.data.id) {
      //       this.modifyweight['detid'] = params.data.id;
      //       this.modifyweight['caigouweight'] = params.data.caigouweight;
      //       this.weightModal.show();
      //     }
      //   }, valueFormatter: this.settings.valueFormatter
      // },
      // {
      //   cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'gchtweight', minWidth: 100, editable: true,
      //   cellRenderer: (params) => {
      //     console.log('params', params);
      //     if (params.value === null || params.value === undefined) {
      //       return null;
      //     } else {
      //       return params.value;
      //     }
      //   },
      //   onCellValueChanged: (params) => {
      //     console.log('value', params.newValue);
      //     if (params.data.finish) {
      //       this.toast.pop('warning', '???????????????????????????', '');
      //       return;
      //     }
      //     this.grno['detid'] = params.data.id;
      //     this.caigouApi.modifygchtweight({ gchtweight: params.newValue }, params.data.id).then(data => {
      //       this.toast.pop('success', '??????????????????????????????');
      //       this.getrukuapply();
      //     });
      //   }
      // },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '??????', field: 'weight', minWidth: 80,
        valueGetter: (params) => {
          if (params.data && params.data['weight']) {
            return Number(params.data['weight']);
          } else {
            return 0;
          }
        }, valueFormatter: this.settings.valueFormatter3, aggFunc: 'sum',
        onCellClicked: (params) => {
          if (params.data) {
            if (!params.data.rukuweight) {
              this.modifyprice = {};
              this.modifyprice['id'] = params.data.id;
              this.modfiyflag = 3;
              this.priceModal.show();
            }
          }
        }
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '??????', field: 'count', minWidth: 80,
        valueGetter: (params) => {
          if (params.data && params.data['count']) {
            return Number(params.data['count']);
          } else {
            return 0;
          }
        }, valueFormatter: this.settings.valueFormatter, aggFunc: 'sum',
        onCellClicked: (params) => {
          if (params.data) {
            if (!params.data.rukuweight) {
              this.modifyprice = {};
              this.modifyprice['id'] = params.data.id;
              this.modfiyflag = 4;
              this.priceModal.show();
            }
          }
        }
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '??????', field: 'length', minWidth: 80,
        valueGetter: (params) => {
          if (params.data && params.data['length']) {
            return Number(params.data['length']);
          } else {
            return 0;
          }
        }, valueFormatter: this.settings.valueFormatter, aggFunc: 'sum',
        onCellClicked: (params) => {
          if (params.data) {
            if (!params.data.rukuweight) {
              this.modifyprice = {};
              this.modifyprice['id'] = params.data.id;
              this.modfiyflag = 5;
              this.priceModal.show();
            }
          }
        }
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '?????????', field: 'rukuweight', minWidth: 80,
        valueGetter: (params) => {
          if (params.data && params.data['rukuweight']) {
            return Number(params.data['rukuweight']);
          } else {
            return 0;
          }
        }, valueFormatter: this.settings.valueFormatter3, aggFunc: 'sum'
      },
      // {
      //   cellStyle: { 'text-align': 'right' }, headerName: '?????????', field: 'tuihuoweight', minWidth: 80,
      //   valueFormatter: this.settings.valueFormatter
      // },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '??????', field: 'price', minWidth: 100,
        onCellClicked: (params) => {
          if (params.data) {
            if (!params.data.rukuweight) {
              this.modifyprice = {};
              this.modifyprice['id'] = params.data.id;
              this.modfiyflag = 1;
              this.priceModal.show();
            }
          }
        }, valueFormatter: this.settings.valueFormatter2
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '??????', field: 'jine', minWidth: 100,
        valueGetter: (params) => {
          if (params.data && params.data['jine']) {
            return Number(params.data['jine']);
          } else {
            return 0;
          }
        },
        valueFormatter: this.settings.valueFormatter2, aggFunc: 'sum'
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'orgname', minWidth: 100 },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'type', minWidth: 100,
        valueGetter: (params) => {
          if (params.data) {
            if (params.data['type'] === 1) {
              return '?????????';
            } else if (params.data['type'] === 2) {
              return '?????????';
            }
          }
        }, onCellClicked: (params) => {
          if (params.data) {
            if (!params.data.rukuweight) {
              this.modifyprice = {};
              this.modifyprice['id'] = params.data.id;
              this.modfiyflag = 2;
              this.priceModal.show();
            }
          }
        }
      },
      // {
      //   cellStyle: { 'text-align': 'right' }, headerName: '????????????', field: 'jiesuanprice', minWidth: 80,
      //   onCellClicked: (data) => {
      //     if (data.data.id) {
      //       if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
      //         this.openjiesuan(data['data']['id']);
      //       }
      //     }
      //   }, valueFormatter: this.settings.valueFormatter2
      // },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.houdu', minWidth: 80,
        onCellClicked: (data) => {
          if (data.data) {
            if (!data['data'].rukuweight) {
              this.showgcmodify(data['data']['goodscode']['houduid'], data['data']['id']);
            }
          }
        },
        valueFormatter: this.settings.valueFormatter3
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.width', minWidth: 80,
        onCellClicked: (data) => {
          if (data.data) {
            if (!data['data'].rukuweight) {
              this.showgcmodify(data['data']['goodscode']['widthid'], data['data']['id']);
            }
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.beiqi', minWidth: 80,
        onCellClicked: (data) => {
          if (data.data) {
            if (!data['data'].rukuweight) {
              this.showgcmodify(data['data']['goodscode']['beiqiid'], data['data']['id']);
            }
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '<span font="red">??????</span>', field: 'goodscode.color', minWidth: 80,
        onCellClicked: (data) => {
          if (data.data) {
            // if (data.data.orderdetid !== null) {
            //   this.opencolormodifydialog(data.data.colorid, data.data.id);
            // } else if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            //   this.showgcmodify(data['data']['colorid'], data['data']['id']);
            // }
            if (!data['data'].rukuweight) {
              this.showgcmodify(data['data']['goodscode']['colorid'], data['data']['id']);
            }
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.duceng', minWidth: 80,
        onCellClicked: (data) => {
          if (data.data) {
            if (!data['data'].rukuweight) {
              this.showgcmodify(data['data']['goodscode']['ducengid'], data['data']['id']);
            }
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.caizhi', minWidth: 80,
        onCellClicked: (data) => {
          if (data.data) {
            if (!data['data'].rukuweight) {
              this.showgcmodify(data['data']['goodscode']['caizhiid'], data['data']['id']);
            }
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'goodscode.ppro', minWidth: 80,
        onCellClicked: (data) => {
          if (data.data) {
            if (!data['data'].rukuweight) {
              this.showgcmodify(data['data']['goodscode']['pproid'], data['data']['id']);
            }
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'goodscode.painttype', minWidth: 80,
        onCellClicked: (data) => {
          if (data.data) {
            if (!data['data'].rukuweight) {
              this.showgcmodify(data['data']['goodscode']['painttypeid'], data['data']['id']);
            }
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.qimo', minWidth: 80,
        onCellClicked: (data) => {
          if (data.data) {
            if (!data['data'].rukuweight) {
              this.showgcmodify(data['data']['goodscode']['qimoid'], data['data']['id']);
            }
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.tuceng', minWidth: 80,
        onCellClicked: (data) => {
          if (data.data) {
            if (!data['data'].rukuweight) {
              this.showgcmodify(data['data']['goodscode']['tucengid'], data['data']['id']);
            }
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'goodscode.neijing', minWidth: 80,
        onCellClicked: (data) => {
          if (data.data) {
            if (!data['data'].rukuweight) {
              this.showgcmodify(data['data']['goodscode']['neijingid'], data['data']['id']);
            }
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.penma', minWidth: 80,
        onCellClicked: (data) => {
          if (data.data) {
            if (!data['data'].rukuweight) {
              this.showgcmodify(data['data']['goodscode']['penmaid'], data['data']['id']);
            }
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'goodscode.packagetype', minWidth: 80,
        onCellClicked: (data) => {
          if (data.data) {
            if (!data['data'].rukuweight) {
              this.showgcmodify(data['data']['goodscode']['packagetypeid'], data['data']['id']);
            }
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.xiubian', minWidth: 80,
        onCellClicked: (data) => {
          if (data.data) {
            if (!data['data'].rukuweight) {
              this.showgcmodify(data['data']['goodscode']['xiubianid'], data['data']['id']);
            }
          }
        }
      },
      // {
      //   cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'weight', minWidth: 80,
      //   onCellClicked: (data) => {
      //     if (data.data) {
      //       if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
      //         this.opengongcha('weight', data['data']['id']);
      //       }
      //     }
      //   }
      // },
      // {
      //   cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'yongtu', minWidth: 80,
      //   onCellClicked: (data) => {
      //     if (data.data) {
      //       if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
      //         this.opengongcha('yongtu', data['data']['id']);
      //       }
      //     }
      //   }
      // },
      // {
      //   cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'gongcha', minWidth: 80,
      //   onCellClicked: (data) => {
      //     if (data.data) {
      //       if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
      //         this.opencount(data['data']['id']);
      //       }
      //     }
      //   }
      // },
      // {
      //   cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'houdugongcha', minWidth: 80,
      //   onCellClicked: (data) => {
      //     if (data.data) {
      //       if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
      //         this.opengongcha('houdu', data['data']['id']);
      //       }
      //     }
      //   }
      // },
      // {
      //   cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'widthgongcha', minWidth: 80,
      //   onCellClicked: (data) => {
      //     if (data.data) {
      //       if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
      //         this.opengongcha('width', data['data']['id']);
      //       }
      //     }
      //   }
      // },
      // {
      //   cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'jiaohuodate', minWidth: 100,
      //   enableRowGroup: true, valueFormatter: data => {
      //     return this.datepipe.transform(data.value, 'y-MM-dd');
      //   },
      //   onCellClicked: (data) => {
      //     if (data.data) {
      //       if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
      //         this.opendate(data['data']['id'], data.value);
      //       }
      //     }
      //   }
      // },
      // {
      //   cellStyle: { 'text-align': 'center' }, headerName: '????????????ID', field: 'orderid', minWidth: 100,
      //   cellRenderer: (params) => {
      //     if (params && params.data && null != params.data.orderid) {
      //       return '<a target="_blank" href="#/qihuo/' + params.data.orderid + '">' + params.data.orderid + '</a>';
      //     } else {
      //       return '';
      //     }
      //   }
      // },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: '', minWidth: 80,
        cellRenderer: (params) => {
          if (params.data && !params.data.rukuweight) {
            return '<a target="_blank">??????</a>';
          } else {
            return '';
          }
        }, onCellClicked: (params) => {
          if (params.data && !params.data.rukuweight) {
            sweetalert({
              title: '????????????????????????',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#23b7e5',
              confirmButtonText: '??????',
              cancelButtonText: '??????',
              closeOnConfirm: false
            }, () => {
              this.caigouApi.deleterukuapplydet(params.data.id).then(data => {
                this.toast.pop('success', '???????????????');
                this.getrukuapply();
              });
              sweetalert.close();
            });
          }
        }
      },
      // { cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'yugumaoliprice', minWidth: 150 },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'beizhu', minWidth: 150,
        onCellClicked: (data) => {
          if (data.data) {
            if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
              this.openbeizhu(data['data']['id']);
            }
          }
        }
      }
    ];
  }

  ngOnInit() {
    this.getrukuapply();
  }
  getrukuapply() {
    this.jiaohuoaddrs = [];
    this.caigouApi.getrukuapply(this.actroute.params['value']['id']).then(data => {
      this.rukuapply = data.rukuapply;
      // if (data.caigou.kind === 1) {
      //   this.flag['qihuo'] = true;
      // } else {
      //   this.flag['qihuo'] = false;
      // }
      // console.log('saaaa', this.storage.getObject('cuser'));
      // if (data.caigou.status === 0 && this.storage.getObject('cuser').id === data.caigou.cuserid) {
      // this.flag['tijiao'] = true;
      // this.flag['shenhe'] = false;
      // this.flag['qishen'] = false;
      // }else if (data.caigou.status === 1 && this.storage.getObject('cuser').id === data.caigou.vuserid) {
      //   this.flag['tijiao'] = false;
      //   this.flag['shenhe'] = true;
      //   this.flag['qishen'] = false;
      // }else if (data.caigou.status === 2 && this.storage.getObject('cuser').id === data.caigou.vuserid) {
      //   this.flag['tijiao'] = false;
      //   this.flag['shenhe'] = false;
      //   this.flag['qishen'] = true;
      // }else {
      //   this.flag['tijiao'] = false;
      //   this.flag['shenhe'] = false;
      //   this.flag['qishen'] = false;
      // }
      // this.cg['jiaohuoaddr'] = data.rukuapply.jiaohuoaddr;
      this.cg['beizhu'] = data.rukuapply.beizhu;
      this.cg['id'] = data.rukuapply.id;
      this.gridOptions.api.setRowData(data.rukuapplydetlist);
    });
  }
  adddet() {
    this.nextflag = false;
    this.selectNull();
    this.jiaohuodate = undefined;
    this.gns = [];
    this.iscountshow = false;
    this.classifyApi.getGnAndChandi().then(data => {
      data.forEach(element => {
        this.gns.push({
          label: element.name,
          value: element
        });
      });
      console.log('gns11', this.gns);
    });
    this.classicModal.show();
  }
  selectedgn(value) {
    console.log('0002', value);
    this.cs = [];
    if (this.chandis.length > 0) {
      this.chandis = [];
    }
    this.showGuige = false; // ???????????????
    this.det['gn'] = value.id;
    this.det['chandi'] = '';
    this.cs = value.attrs;
    this.cs.forEach(element => {
      this.chandis.push({
        value: element.id,
        label: element.name
      });
    });
    this.isChandi = true;
    console.log('chandis', this.chandis);
  }
  selectedchandi(value) {
    console.log('c', value);
    this.det['guige'] = [];
    this.det['chandi'] = value;
    if (this.det['chandi'] !== this.rukuapply['chandiid']) {
      this.chandiErro = true;
    } else {
      this.chandiErro = false;
    }
    this.attrs = [];
    this.classifyApi.getAttrs(value).then(data => {
      console.log('guige', data);
      this.attrs = data;
    });
    this.showGuige = true;
    console.log('attr', this.attrs);
    this.houdugongchas = [];
    this.widthgongchas = [];
    this.yongtus = [];
    this.oneweights = [];
    this.qihuoapi.getchandigongcha().then(data => {
      data.forEach(element => {
        if (element['chandiid'] === this.rukuapply['chandiid']) {
          console.log('???????????????', element);
          // ????????????
          element.attr.houdugongcha.forEach(houdu => {
            this.houdugongchas.push({
              value: houdu.value,
              label: houdu.value
            });
          });
          // ????????????
          element.attr.widthgongcha.forEach(width => {
            this.widthgongchas.push({
              value: width.value,
              label: width.value
            });
          });
          // ?????????
          element.attr.oneweight.forEach(oneweight => {
            this.oneweights.push({
              value: oneweight.value,
              label: oneweight.value
            });
          });
          // ??????
          element.attr.yongtu.forEach(yongtu => {
            this.yongtus.push({
              value: yongtu.value,
              label: yongtu.value
            });
          });
        }
      }); // dataforeach
    }); // qihuoapi



  }
  // ???????????????
  selectedtype(typevalue) {
    if (typevalue === '1') {
      this.iscountshow = true;
    } else {
      this.iscountshow = false;
      delete this.det['count'];
    }
  }
  selectedguige(value, id) {
    if (this.det['guige'].length > 0) {
      for (let i = 0; i < this.det['guige'].length; i++) {
        if (this.det['guige'][i].name === id) {
          this.det['guige'].splice(i, 1);
        }
      }
    }
    this.det['guige'].push({ name: id, value: value });
    console.log('op', this.det);
  }
  close() {
    this.classicModal.hide();
  }
  supplierclose() {
    this.supplierModal.hide();
  }
  weightclose() {
    this.weightModal.hide();
  }
  priceclose() {
    this.priceModal.hide();
  }
  selectNull() {
    this.chandis = [];
    this.det = {
      gn: null,
      chandi: null,
      guige: [],
      rukuapplyid: this.actroute.params['value']['id'],
      // caigouweight: null,
      price: '0.00',
      beizhu: '',
      // jiaohuodate: null,
      weight: '',
      length: '',
      count: '',
      // yongtu: '',
      // gongcha: '',
      // houdugongcha: '',
      // widthgongcha: '',
      // jiesuanprice: '0.00',
      // zhuanhuo: '',
      // orgid: ''
    };
    this.isChandi = false;
    this.showGuige = false;
    this.chandiErro = false;
  }
  add() {
    console.log('op', this.det);
    console.log('opsss', this.attrs);
    // if (!this.det['price']) { this.toast.pop('error', '???????????????????????????', ''); return; }
    if (!this.det['weight'] || this.det['weight'] === '0') { this.toast.pop('error', '????????????????????????????????????', ''); return; }
    if (!this.det['length'] || this.det['length'] === '0') { this.toast.pop('error', '?????????????????????????????????', ''); return; }
    // if (!this.det['count'] || this.det['count'] === '0') { this.toast.pop('error', '?????????????????????????????????', ''); return; }
    // if (this.jiaohuodate) {
    //   this.det['jiaohuodate'] = this.datepipe.transform(this.jiaohuodate, 'y-MM-dd');
    // }
    if (!this.det['type'] || this.det['type'] === null) { this.toast.pop('error', '???????????????', ''); return; }
    // if (this.det['zhuanhuo'] === '') { this.toast.pop('error', '???????????????????????????', ''); return; }
    // if (this.det['zhuanhuo'] === 'true') {
    //   if (this.det['orgid'] === '') { this.toast.pop('error', '??????????????????????????????', ''); return; }
    //   if (this.det['orgid'] === '670') { this.toast.pop('error', '?????????????????????????????????????????????????????????', ''); return; }
    // }
    this.caigouApi.addrukuapplydet(this.det).then(data => {
      this.getrukuapply();
      this.classicModal.hide();
    });
  }
  selectstart() { }
  // ??????????????????
  importdet() {
    this.bsModalService.config.class = 'modal-all';
    this.cgbsModalRef = this.bsModalService.show(CaigoudetimportComponent);
    this.cgbsModalRef.content.parentthis = this;
  }
  // ???????????????
  // confirmgrno() {
  //   if (!this.grno['grno']) {
  //     this.toast.pop('error', '????????????????????????', '');
  //     return;
  //   }
  //   this.caigouApi.addgrno(this.grno).then(data => {
  //     this.toast.pop('success', '????????????????????????');
  //     this.getcaigou();
  //     this.grnoclose();
  //   });
  // }
  // ???????????????
  confirmweight() {
    if (!this.modifyweight['caigouweight'] || this.modifyweight['caigouweight'] === '0' || this.modifyweight['caigouweight'] < 0) {
      this.toast.pop('error', '??????????????????????????????????????????????????????', '');
      return;
    }
    this.caigouApi.modifyweight(this.modifyweight).then(data => {
      this.toast.pop('success', '????????????????????????');
      this.getrukuapply();
      this.weightclose();
    });
  }
  // ??????
  confirmprice() {
    if (this.modfiyflag === 1) {
      if (!this.modifyprice['price'] || this.modifyprice['price'] === '0' || this.modifyprice['price'] < 0) {
        this.toast.pop('error', '???????????????????????????????????????????????????');
        return;
      }
    } else if (this.modfiyflag === 2) {
      if (!this.modifyprice['type']) {
        this.toast.pop('error', '?????????????????????');
        return;
      }
    } else if (this.modfiyflag === 3) {
      if (!this.modifyprice['weight']) {
        this.toast.pop('error', '?????????????????????');
        return;
      }
    } else if (this.modfiyflag === 4) {
      if (!this.modifyprice['count']) {
        this.toast.pop('error', '?????????????????????');
        return;
      }
    } else if (this.modfiyflag === 5) {
      if (!this.modifyprice['length']) {
        this.toast.pop('error', '?????????????????????');
        return;
      }
    }
    this.caigouApi.modifyrukuapplydet(this.modifyprice).then(data => {
      this.toast.pop('success', '???????????????');
      this.getrukuapply();
      this.priceclose();
    });
  }
  // ????????????
  deleterukuapply() {
    sweetalert({
      title: '?????????????????????????????????',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#23b7e5',
      confirmButtonText: '??????',
      cancelButtonText: '??????',
      closeOnConfirm: false
    }, () => {
      this.caigouApi.deleterukuapply(this.actroute.params['value']['id']).then(data => {
        this.toast.pop('success', '??????????????????????????????');
        this.router.navigate(['rukuapply']);
      });
      sweetalert.close();
    });
  }
  jiaohuoaddr() {
    if (this.cg['jiaohuoaddr'] !== this.rukuapply['jiaohuoaddr']) {
      this.caigouApi.modifyjiaohuoaddr(this.cg).then(data => {
        this.toast.pop('success', '???????????????????????????');
        this.closeaddr();
        this.getrukuapply();
      });
    }
  }
  modbeizhu() {
    if (this.cg['beizhu'] !== this.rukuapply['beizhu']) {
      this.caigouApi.modifyrukuapplybeizhu(this.cg).then(data => {
        this.toast.pop('success', '?????????????????????');
        this.getrukuapply();
      });
    }
  }
  // ?????????????????????
  opencolormodifydialog(classifyid, detid) {
    this.colors = [];
    // ??????????????????
    this.classifyApi.getBrothernode({ classifyid: classifyid }).then(data => {
      data.forEach(element => {
        this.colors.push({
          value: element.id,
          label: element.name
        });
      });
    });
    this.color['detid'] = detid;
    this.colormodify.show();
  }
  closecolormodifydialog() {
    this.colormodify.hide();
  }

  modifycolor() {
    console.log(this.color);
    const model = { colorid: this.color['id'] };
    this.qihuoapi.modifycolor(this.color['detid'], model).then(data => {
      this.closecolormodifydialog();
      this.toast.pop('success', '????????????');
      this.getrukuapply();
    });
  }
  reload() {
    this.caigouApi.reloadcg(this.actroute.params['value']['id']).then(data => {
      this.toast.pop('success', data.msg);
    });
  }
  print() {
    this.caigouApi.cgprint(this.actroute.params['value']['id']).then(data => {
      if (!data.flag) {
        this.toast.pop('warning', data.msg);
      } else {
        window.open(data.msg);
      }
    });
  }
  // ????????????
  submitcg() {
    if (confirm('???????????????????????????')) {
      this.caigouApi.submitcg(this.actroute.params['value']['id']).then(data => {
        this.toast.pop('success', '????????????');
        this.getrukuapply();
      });
    }
  }
  verifycg() {
    if (confirm('?????????????????????')) {
      this.caigouApi.verifycg(this.actroute.params['value']['id']).then(data => {
        this.toast.pop('success', '????????????');
        this.getrukuapply();
      });
    }
  }
  opensupplier() {
    this.supplier = { supplierid: '', id: '' };
    this.supplier['id'] = this.actroute.params['value']['id'];
    this.supplierModal.show();
  }
  confirmsupplier() {
    if (this.supplier['supplierid'] instanceof Object) {
      this.supplier['supplierid'] = this.supplier['supplierid'].code;
    } else {
      this.supplier['supplierid'] = null;
    }
    if (this.supplier['supplierid'] === null) {
      this.toast.pop('error', '?????????????????????', '');
      return;
    }
    this.caigouApi.modifysupplier(this.supplier).then(data => {
      this.toast.pop('success', '?????????????????????');
      this.getrukuapply();
    });
    this.supplierclose();
  }
  back() {
    if (confirm('?????????????????????')) {
      this.caigouApi.backcg(this.actroute.params['value']['id']).then(data => {
        this.toast.pop('success', '????????????');
        this.getrukuapply();
      });
    }
  }
  refuse() {
    if (confirm('?????????????????????')) {
      this.caigouApi.refusecg(this.actroute.params['value']['id']).then(data => {
        this.toast.pop('success', '????????????');
        this.getrukuapply();
      });
    }
  }
  // ????????????
  showgcmodify(oldvalueid, detid) {
    if (!oldvalueid) {
      return;
    }
    this.values = [];
    this.newattrid = null;
    this.modifygcdetid = null;
    this.modifygcdetid = detid;
    const model = { classifyid: oldvalueid };
    this.classifyApi.getParentNode(oldvalueid).then(data => {
      this.attrname = data['value'];
    });
    this.classifyApi.getBrothernode(model).then(data => {
      this.values = [];
      data.forEach(element => {
        this.values.push({
          value: element.id,
          label: element.name
        });
      });
    });
    this.gcmodify.show();
  }
  modifygc() {
    const model = { name: this.attrname, value: this.newattrid, id: this.modifygcdetid };
    this.caigouApi.modifyrukuapplygc(model).then(data => {
      this.closegcmodify();
      this.toast.pop('success', '????????????');
      this.getrukuapply();
    });
  }
  closegcmodify() {
    this.gcmodify.hide();
  }
  closeaddr() {
    this.addrmodify.hide();
  }
  openaddr() {
    this.jiaohuoaddrs = [];
    this.qihuoapi.getchandigongcha().then(a => {
      a.forEach(element => {
        if (element['chandiid'] === this.rukuapply['chandiid']) {
          console.log('???????????????', element);
          // ????????????
          element.attr.jiaohuoaddr.forEach(addr => {
            this.jiaohuoaddrs.push({
              value: addr.value,
              label: addr.value
            });
          });
        }
      }); // dataforeach
    }); // qihuoapi
    this.addrmodify.show();
  }
  closegongchamodify() {
    this.gongchamodify.hide();
  }
  closedateModal() {
    this.dateModal.hide();
  }
  closecount() {
    this.countmodify.hide();
  }
  opengongcha(type, detid) {
    this.gongchaModel = { detid: '', type: '', name: '', id: '' };
    this.gongchaModel['detid'] = detid;
    this.gongchaModel['id'] = this.actroute.params['value']['id'];
    this.gongchaModel['type'] = type;
    this.gongchas = [];
    this.qihuoapi.getchandigongcha().then(a => {
      a.forEach(element => {
        if (element['chandiid'] === this.rukuapply['chandiid']) {
          console.log('???????????????', element);
          if (type === 'yongtu') {
            element.attr.yongtu.forEach(addr => {
              this.gongchas.push({
                value: addr.value,
                label: addr.value
              });
            });
          } else if (type === 'weight') {
            element.attr.oneweight.forEach(addr => {
              this.gongchas.push({
                value: addr.value,
                label: addr.value
              });
            });
          } else if (type === 'houdu') {
            element.attr.houdugongcha.forEach(addr => {
              this.gongchas.push({
                value: addr.value,
                label: addr.value
              });
            });
          } else if (type === 'width') {
            element.attr.widthgongcha.forEach(addr => {
              this.gongchas.push({
                value: addr.value,
                label: addr.value
              });
            });
          }
        }
      }); // dataforeach
    }); // qihuoapi
    this.gongchamodify.show();
  }
  modifygongcha() {
    if (this.gongchaModel['name'] === '') {
      this.closegongchamodify();
      this.closecount();
      this.closebeizhu();
      this.closejiesuan();
      return;
    }
    this.caigouApi.modifygongcha(this.gongchaModel).then(data => {
      this.closegongchamodify();
      this.closecount();
      this.closebeizhu();
      this.closejiesuan();
      this.toast.pop('success', '????????????');
      this.getrukuapply();
    });
  }
  opendate(detid, date) {
    this.gongchaModel = { detid: '', type: '', name: '', id: '' };
    this.gongchaModel['detid'] = detid;
    this.gongchaModel['id'] = this.actroute.params['value']['id'];
    this.gongchaModel['type'] = 'date';
    this.jiaohuodate = new Date(date);
    this.dateModal.show();
  }
  datemodify() {
    if (this.jiaohuodate) {
      this.gongchaModel['name'] = this.datepipe.transform(this.jiaohuodate, 'y-MM-dd');
    }
    this.closedateModal();
    this.modifygongcha();
  }
  opencount(detid) {
    this.gongchaModel = { detid: '', type: '', name: '', id: '' };
    this.gongchaModel['detid'] = detid;
    this.gongchaModel['id'] = this.actroute.params['value']['id'];
    this.gongchaModel['type'] = 'count';
    this.countmodify.show();
  }
  closebeizhu() {
    this.beizhumodify.hide();
  }
  openbeizhu(detid) {
    this.gongchaModel = { detid: '', type: '', name: '', id: '' };
    this.gongchaModel['detid'] = detid;
    this.gongchaModel['id'] = this.actroute.params['value']['id'];
    this.gongchaModel['type'] = 'beizhu';
    this.beizhumodify.show();
  }
  selectezhuanhuo(value) {
    this.det['zhuanhuo'] = value.id;
  }
  next() {
    if (this.attrs.length !== this.det['guige'].length) { this.toast.pop('error', '????????????????????????????????????', ''); return; }
    this.nextflag = true;
    // this.nselect.active = [];
  }
  fanhui() {
    this.nextflag = false;
  }
  closejiesuan() {
    this.jiesuanmodify.hide();
  }
  openjiesuan(detid) {
    this.gongchaModel = { detid: '', type: '', name: '', id: '' };
    this.gongchaModel['detid'] = detid;
    this.gongchaModel['id'] = this.actroute.params['value']['id'];
    this.gongchaModel['type'] = 'jiesuan';
    this.jiesuanmodify.show();
  }
  //??????????????????
  showgcinfodialog() {
    this.gcinfodialog.show();
  }
  closegcinfodialog() {
    this.gcinfodialog.hide();
  }
  selectmonth(value) {
    this.rukuapply['month'] = this.datepipe.transform(value, 'y-MM-dd');
    console.log('asdas', this.datepipe.transform(value, 'y-MM'));
  }
  modifygcinfo() {
    const caigouid = this.actroute.params['value']['id'];
    this.caigouApi.modifyGcinfo({ gcmonth: this.rukuapply['month'] }, caigouid).then(data => {
      this.getrukuapply();
      this.closegcinfodialog();
    });
  }
  openarea() {
    this.classifyApi.listBypid({ pid: 3814 }).then((data) => {
      console.log(data);
      const arealist = [{ label: '???????????????????????????', value: '' }];
      data.forEach(element => {
        arealist.push({
          label: element['name'],
          value: element['id']
        });
      });
      this.areas = arealist;
    });
    this.areamodify.show();
  }
  closearea() {
    this.areamodify.hide();
  }
  submitarea() {
    console.log(this.cg);
    this.caigouApi.modifyjiaohuoaddr(this.cg).then(data => {
      this.toast.pop('success', '???????????????????????????');
      this.closearea();
      this.getrukuapply();
    });
  }
  // ??????????????????
  contractUploader() {
    this.hetongdialog.show();
  }
  //???????????????????????????
  uploadParam: any = { module: 'qihuo', count: 1, sizemax: 5, extensions: ['doc', 'pdf'] };
  // ?????????????????????
  accept = null;// ".xls, application/xls";
  // ?????????????????????????????????
  upcontract($event) {
    console.log($event);
    const model = { caigouid: this.actroute.params['value']['id'], url: $event.url };
    if ($event.length !== 0) {
      this.caigouApi.uploadcontract(model).then(data => {
        this.toast.pop('success', '???????????????');
      });
    }
    this.hideuploadDialog();
  }
  // ??????????????????
  hideuploadDialog() {
    this.hetongdialog.hide();
  }
  lookContract() {
    this.caigouApi.lookContract(this.actroute.params['value']['id']).then(data => {
      console.log(data);
      if (!data['flag']) {
        this.toast.pop('warning', data['msg']);
      } else {
        window.open(data['msg']);
      }
    });
  }
}
