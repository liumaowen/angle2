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
import { SelectComponent } from 'ng2-select';
import { CustomerapiService } from 'app/routes/customer/customerapi.service';
import { MdmService } from 'app/routes/mdm/mdm.service';

const sweetalert = require('sweetalert');
@Component({
  selector: 'app-caigoudet',
  templateUrl: './caigoudet.component.html',
  styleUrls: ['./caigoudet.component.scss']
})
export class CaigoudetComponent implements OnInit {

  form: FormGroup;
  @ViewChild('defaultGroup') public nselect: SelectComponent;
  @ViewChild('classicModal') classicModal: ModalDirective;
  @ViewChild('supplierModal') supplierModal: ModalDirective;
  @ViewChild('buyerModal') buyerModal: ModalDirective;
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
  @ViewChild('gaizhanglog') private gaizhanglog: ModalDirective;
  @ViewChild('hetongdialog') private hetongdialog: ModalDirective;
  @ViewChild('orgModal') private orgModal: ModalDirective;
  @ViewChild('mdmclassicModal') mdmclassicModal: ModalDirective;
  @ViewChild('mdmgndialog') mdmgndialog: ModalDirective;
  mdmgnsearch = {pagenum: 1, pagesize: 10, itemname: '', categoryname: ''};
  goodscode: any = {};
  chandigongchas = [];
  editTempParam = {detdata: null}; // ????????????????????????
  editflag = {zhidan: false};
  @ViewChild('addFeeModal') private addFeeModal: ModalDirective;
  gridOptions: GridOptions;
  // ??????????????????
  jiaohuodatemin: Date = new Date();
  // ????????????
  jiaohuodate: Date = new Date();
  det: object = {
    gn: '', chandi: '', guige: '', caigouid: '', caigouweight: '', price: '', beizhu: '',
    jiaohuodate: '', oneweight: '', yongtu: '', gongcha: '', houdugongcha: '', widthgongcha: '', jiesuanprice: '', zhuanhuo: '',
    orgid: ''
  };
  isshowInput = false;
  feemodel: any = { feetype: null, price: null, feecustomer: {}, chengyun: null, id: null };
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
  modifyprice: Object = { price: null, detid: '' };
  modifyorg: Object = { orgid: null, detid: '' };
  caigou: Object = { seller: '', buyer: '', vuser: '', org: '' };
  // ?????????
  grno: Object = { grno: null, detid: '' };
  updateDet = {};
  // ??????????????????
  cgbsModalRef: BsModalRef;
  cg: object = { jiaohuoaddr: '', id: '', beizhu: '', areaid: '' };
  flag: Object = { qihuo: false, tijiao: false, shenhe: false, qishen: false };
  supplier: Object = { supplierid: '', id: '' };
  buyer: Object = { buyerid: '', id: '' };
  houdugongchas: any[];
  widthgongchas: any[];
  yongtus: any[];
  oneweights: any[];
  copy: Object = { id: '' };
  // ????????????????????????????????????
  values = [];
  newattrid: number;
  modifygccaigoudetid: number;
  attrname: any;
  // ????????????
  jiaohuoaddrs: any[];
  guigelength: number; // ???????????????????????????
  // ????????????
  gongchas: any[];
  gongchaModel: Object = { detid: '', type: '', name: '', id: '' };
  // ??????
  zhuanhuos;
  nextflag = false;
  // ?????????
  gzuser;
  isgz: boolean;
  constructor(private caigouApi: CaigouService, private fb: FormBuilder, private actroute: ActivatedRoute, public settings: SettingsService,
    private classifyApi: ClassifyApiService, private toast: ToasterService, private bsModalService: BsModalService,
    private qihuoapi: QihuoService, private router: Router, private datepipe: DatePipe, private storage: StorageService,
    private customerApi: CustomerapiService,public mdmService: MdmService,) {
    // ????????????
    this.form = fb.group({
      'caigouweight': [null, Validators.compose([Validators.required,
      Validators.pattern('^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,3})?$')])],
      'price': [null, Validators.compose([Validators.required, Validators.pattern('^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$')])],
      'beizhu': [],
      'weight': [],
      'jiaohuodate': [],
      'yongtu': [],
      'gongcha': [],
      'houdugongcha': [],
      'widthgongcha': [],
      'jiesuanprice': [null, Validators.compose([Validators.required,
      Validators.pattern('^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$')])],
      'zhuanhuo': [],
      'orgid': [],
      gn: [],
      categorydesc: [],
    });

    console.log('abcd', this.actroute.params['value']['id']);
    this.det['caigouid'] = this.actroute.params['value']['id'];
    this.gridOptions = {
      rowSelection: 'multiple',
      groupDefaultExpanded: -1,
      suppressAggFuncInHeader: true,
      enableRangeSelection: true,
      rowDeselection: true,
      overlayLoadingTemplate: this.settings.overlayLoadingTemplate,
      overlayNoRowsTemplate: this.settings.overlayNoRowsTemplate,
      enableColResize: true,
      enableFilter: true,
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
        if (params.node.data.id !== null && params.node.data.orderdetid === null) {
          result.push({
            name: '????????????',
            action: () => {
              // console.log('/*/********************', params);
              this.copy['id'] = params.node.data.id;
              this.caigouApi.copydet(this.copy).then(data => {
                this.toast.pop('success', '?????????????????????');
                this.getcaigou();
              });
            }
          });
        }
        return result;
      },
      groupSelectsChildren: true // ???????????????
    };

    this.gridOptions.onGridReady = this.settings.onGridReady;
    // this.gridOptions.groupUseEntireRow = true;
    this.gridOptions.groupSuppressAutoColumn = true;
    // ??????aggird?????????
    this.gridOptions.columnDefs = [
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'group', cellRenderer: 'group', minWidth: 90,
        checkboxSelection: true, headerCheckboxSelection: true
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'goodscode.id', minWidth: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'guige', minWidth: 150 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'gn', minWidth: 80 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'chandi', minWidth: 100 },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'grno', minWidth: 100, editable: true,
        cellRenderer: (params) => {
          if (params.value === null || params.value === undefined) {
            return null;
          } else {
            return params.value;
          }
        },
        onCellValueChanged: (params) => {
          console.log('value', params.newValue);
          if (params.data.rukuweight !== '0') {
            this.getcaigou();
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
            this.getcaigou();
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
      {
        cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'contractno', minWidth: 100, editable: true,
        onCellValueChanged: (params) => {
          this.updateDet = {};
          this.updateDet['contractno'] = params.newValue;
          this.updateDet['id'] = params.data.id;
          this.caigouApi.updateCaigouDet(this.updateDet).then(data => {
            if (data) {
              this.toast.pop('success', '????????????????????????');
              this.getcaigou();
            }
          });
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: '', minWidth: 80,
        cellRenderer: (params) => {
          if (!params.data.finish && params.data.id) {
            return '<a target="_blank">??????</a>';
          } else {
            return '';
          }
        }, onCellClicked: (params) => {
          if (!params.data.finish && params.data.id) {
            sweetalert({
              title: '????????????????????????',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#23b7e5',
              confirmButtonText: '??????',
              cancelButtonText: '??????',
              closeOnConfirm: false
            }, () => {
              this.caigouApi.finish(params.data.id).then(data => {
                this.toast.pop('success', '??????????????????');
                this.getcaigou();
              });
              sweetalert.close();
            });
          }
        }
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????????????????', field: 'yuguprice', minWidth: 150,
      enableRowGroup: true, valueFormatter: this.settings.valueFormatter2 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'miaoshu', minWidth: 150 },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'innerjiaohuoaddr', minWidth: 80
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '?????????', field: 'caigouweight', minWidth: 80,
        onCellClicked: (params) => {
          // if (!params.data.print) {
          this.modifyweight['detid'] = params.data.id;
          this.modifyweight['caigouweight'] = params.data.caigouweight;
          console.log(params);
          this.weightModal.show();
          // } else {
          //   this.toast.pop('error', '???????????????????????????????????????????????????', '');
          //   return;
          // }

        }, valueFormatter: this.settings.valueFormatter3
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'gchtweight', minWidth: 100, editable: true,
        cellRenderer: (params) => {
          if (params.value === null || params.value === undefined) {
            return null;
          } else {
            return params.value;
          }
        },
        onCellValueChanged: (params) => {
          if (!params.data.id) {
            return;
          }
          if (params.data.finish) {
            this.toast.pop('warning', '???????????????????????????', '');
            return;
          }
          this.grno['detid'] = params.data.id;
          this.caigouApi.modifygchtweight({ gchtweight: params.newValue }, params.data.id).then(data => {
            this.toast.pop('success', '??????????????????????????????');
            this.getcaigou();
          });
        }
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '?????????', field: 'rukuweight', minWidth: 80,
        valueFormatter: this.settings.valueFormatter3
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '?????????', field: 'tuihuoweight', minWidth: 80,
        valueFormatter: this.settings.valueFormatter3
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '????????????', field: 'price', minWidth: 100,
        onCellClicked: (params) => {
          if (params.data.rukuweight === '0') {
            this.modifyprice['detid'] = params.data.id;
            console.log(params);
            this.priceModal.show();
          }
        }, valueFormatter: this.settings.valueFormatter2
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '????????????', field: 'jine', minWidth: 100,
        valueFormatter: this.settings.valueFormatter2
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'org', minWidth: 100,
        onCellClicked: (params) => {
          if (params.data.id) {
            this.modifyorg['detid'] = params.data.id;
            this.modifyorg['orgid'] = params.data.orgid;
            console.log(params);
            this.orgModal.show();
          }
        }
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '????????????', field: 'jiesuanprice', minWidth: 80,
        onCellClicked: (data) => {
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.openjiesuan(data['data']['id']);
          }
        }, valueFormatter: this.settings.valueFormatter2
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'houdu', minWidth: 80,
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.showgcmodify(data['data']['houduid'], data['data']['id']);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.showdetmodify(data['data']['houdu'], data['data']);
          }
        }, valueFormatter: this.settings.valueFormatter3
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'width', minWidth: 80,
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.showgcmodify(data['data']['widthid'], data['data']['id']);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.showdetmodify(data['data']['width'], data['data']);
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'beiqi', minWidth: 80,
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.showgcmodify(data['data']['beiqiid'], data['data']['id']);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.showdetmodify(data['data']['beiqi'], data['data']);
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '<span font="red">??????</span>', field: 'color', minWidth: 80,
        onCellClicked: (data) => {
          if (data.data.orderdetid !== null) {
            this.opencolormodifydialog(data.data.colorid, data.data.id);
          } else if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.showdetmodify(data['data']['color'], data['data']);
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'duceng', minWidth: 80,
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.showgcmodify(data['data']['ducengid'], data['data']['id']);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.showdetmodify(data['data']['duceng'], data['data']);
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'caizhi', minWidth: 80,
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.showgcmodify(data['data']['caizhiid'], data['data']['id']);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.showdetmodify(data['data']['caizhi'], data['data']);
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'ppro', minWidth: 80,
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.showgcmodify(data['data']['pproid'], data['data']['id']);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.showdetmodify(data['data']['ppro'], data['data']);
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'painttype', minWidth: 80,
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.showgcmodify(data['data']['painttypeid'], data['data']['id']);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.showdetmodify(data['data']['painttype'], data['data']);
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'qimo', minWidth: 80,
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.showgcmodify(data['data']['qimoid'], data['data']['id']);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.showdetmodify(data['data']['qimo'], data['data']);
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'tuceng', minWidth: 80,
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.showgcmodify(data['data']['tucengid'], data['data']['id']);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.showdetmodify(data['data']['tuceng'], data['data']);
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'neijing', minWidth: 80,
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.showgcmodify(data['data']['neijingid'], data['data']['id']);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.showdetmodify(data['data']['neijing'], data['data']);
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'penma', minWidth: 80,
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.showgcmodify(data['data']['penmaid'], data['data']['id']);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.showdetmodify(data['data']['penma'], data['data']);
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'packagetype', minWidth: 80,
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.showgcmodify(data['data']['packagetypeid'], data['data']['id']);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.showdetmodify(data['data']['packagetype'], data['data']);
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'xiubian', minWidth: 80,
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.showgcmodify(data['data']['xiubianid'], data['data']['id']);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.showdetmodify(data['data']['xiubian'], data['data']);
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'weight', minWidth: 80,
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.opengongcha('weight', data['data']['id']);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.showdetmodify(data['data']['weight'], data['data']);
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'yongtu', minWidth: 80,
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.opengongcha('yongtu', data['data']['id']);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.showdetmodify(data['data']['yongtu'], data['data']);
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'gongcha', minWidth: 80,
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.opencount(data['data']['id']);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.opencount(data['data']['id']);
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'houdugongcha', minWidth: 80,
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.opengongcha('houdu', data['data']['id']);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.showdetmodify(data['data']['houdugongcha'], data['data']);
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'widthgongcha', minWidth: 80,
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.opengongcha('width', data['data']['id']);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.showdetmodify(data['data']['widthgongcha'], data['data']);
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'jiaohuodate', minWidth: 100,
        enableRowGroup: true, valueFormatter: data => {
          return this.datepipe.transform(data.value, 'y-MM-dd');
        },
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.opendate(data['data']['id'], data.value);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.opendate(data['data']['id'], data.value);
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????ID', field: 'orderid', minWidth: 100,
        cellRenderer: (params) => {
          if (params && params.data && null != params.data.orderid) {
            return '<a target="_blank" href="#/qihuo/' + params.data.orderid + '">' + params.data.orderid + '</a>';
          } else {
            return '';
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: '', minWidth: 80,
        cellRenderer: (params) => {
          if (params.data.id && params.data.rukuweight === '0') {
            return '<a target="_blank">??????</a>';
          } else {
            return '';
          }
        }, onCellClicked: (params) => {
          if (params.data.id && params.data.rukuweight === '0') {
            sweetalert({
              title: '????????????????????????',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#23b7e5',
              confirmButtonText: '??????',
              cancelButtonText: '??????',
              closeOnConfirm: false
            }, () => {
              this.caigouApi.deletedet(params.data.id).then(data => {
                this.toast.pop('success', '???????????????');
                this.getcaigou();
              });
              sweetalert.close();
            });
          }
        }
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'yugumaoliprice', minWidth: 150 },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'beizhu', minWidth: 150,
        onCellClicked: (data) => {
          // if (!this.caigou['isv'] && data['data']['orderdetid'] === null && this.caigou['status'] === 0) {
          //   this.openbeizhu(data['data']['id']);
          // }
          if (data['data']['orderdetid'] === null && data['data'].rukuweight === '0') {
            this.openbeizhu(data['data']['id']);
          }
        }
      },
    ];
  }

  ngOnInit() {
    this.getcaigou();
  }
  orgclose() {
    this.orgModal.hide();
  }
  getcaigou() {
    this.jiaohuoaddrs = [];
    this.caigouApi.getCaigou(this.actroute.params['value']['id']).then(data => {
      // ??????????????????BPM???????????????????????????
      if (data.caigou.isv === true && data.caigou.tiaohuocgprocessid != null) {
        this.isgz = true;
      } else {
        this.isgz = false;
      }
      this.caigou = data.caigou;
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
      this.cg['jiaohuoaddr'] = data.caigou.jiaohuoaddr;
      this.cg['beizhu'] = data.caigou.beizhu;
      this.cg['id'] = data.caigou.id;
      this.gridOptions.api.setRowData(data.caigoudet);
    });
  }
  adddet() {
    this.nextflag = false;
    this.zhuanhuos = [{ value: '', label: '??????' }, { value: true, label: '??????' }, { value: false, label: '?????????' }];
    this.selectNull();
    this.jiaohuodate = undefined;
    this.gns = [];
    this.classifyApi.getGnAndChandi().then(data => {
      data.forEach(element => {
        this.gns.push({
          label: element.name,
          value: element
        });
      });
      console.log('gns11', this.gns);
      // data.join();
    });
    this.classicModal.show();
    // this.nselect.active = [];
  }
  addmdmdet() {
    if(this.caigou['tiaohuocgprocessid']!==null){
      this.toast.pop('error', '?????????????????????????????????????????????');
      return;
    }
    this.nextflag = false;
    this.selectNull();
    this.zhuanhuos = [{ value: '', label: '??????' }, { value: true, label: '??????' }, { value: false, label: '?????????' }];
    this.jiaohuodate = undefined;
    this.mdmclassicModal.show();
  }
  addmdm() {
    if (!this.det['price']) { this.toast.pop('error', '???????????????????????????', ''); return; }
    if (!this.det['caigouweight'] || this.det['caigouweight'] === '0') { this.toast.pop('error', '????????????????????????????????????', ''); return; }
    if (this.jiaohuodate) {
      this.det['jiaohuodate'] = this.datepipe.transform(this.jiaohuodate, 'y-MM-dd');
    }
    if (!this.det['jiaohuodate'] || this.det['jiaohuodate'] === null) { this.toast.pop('error', '?????????????????????', ''); return; }
    if (!this.det['oneweight'] || this.det['oneweight'] === null || this.det['oneweight'] === '0') {
      this.toast.pop('error', '????????????????????????????????????', '');
      return;
    }
    if (this.det['zhuanhuo'] === '') { this.toast.pop('error', '???????????????????????????', ''); return; }
    if (this.det['zhuanhuo'] === true) {
      if (this.det['orgid'] === '') { this.toast.pop('error', '??????????????????????????????', ''); return; }
      if (this.det['orgid'] === '670') { this.toast.pop('error', '?????????????????????????????????????????????????????????', ''); return; }
    }
    if (this.det['detid']) {
      this.caigouApi.modifymdmcaigoudet(this.det).then(data => {
        this.getcaigou();
        this.mdmclassicModal.hide();
      }); 
    } else {
      this.caigouApi.adddet(this.det).then(data => {
        this.getcaigou();
        this.mdmclassicModal.hide();
      }); 
    }
  }
  selectgn(params) {
    this.mdmgndialog.hide();
    const item = params['item'];
    const attrs = params['attrs'];
    this.goodscode = {};
    this.goodscode['gn'] = item.itemname;
    this.goodscode['gncode'] = item.itemcode;
    this.goodscode['categorydesc'] = item.categorydesc;
    this.showGuige = true;
    this.attrs = attrs;
    for (let i = 0; i < this.attrs.length; i++) {
      const element = this.attrs[i];
      if (element['defaultval'] && element['options'].length) {
        this.goodscode[element['value']] = element['defaultval'];
      }
    }
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
    this.attrs = [];
    this.classifyApi.getAttrs(value).then(data => {
      this.guigelength = data['length'];
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
        if (element['chandiid'] === this.caigou['chandiid']) {
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
  selectedguige(value, id) {
    if (this.det['guige'].length > 0) {
      for (let i = 0; i < this.det['guige'].length; i++) {
        if (this.det['guige'][i].name === id) {
          this.det['guige'].splice(i, 1);
        }
      }
    }
    // ???????????? ???????????????????????????????????????????????????????????????????????????
    if (this.caigou['chandiid'] == 8) {
      if (id == "painttypeid") {
        if (this.chandis[2].value = 8) {
          this.classifyApi.getAttrs(value).then(data => {
            if (data.length != 0) {
              this.attrs = this.attrs.filter(item => item.name != 'colorid');
              //this.attrs.push(data[0]);
              this.attrs.splice(8, 0, data[0]);
              this.guigelength = this.attrs.length;
            } else {
              this.attrs = this.attrs.filter(item => item.name != 'colorid');
              this.guigelength = this.attrs.length;

            }

          });
          this.showGuige = true;
        }
      }

    }
    this.det['guige'].push({ name: id, value: value });
    console.log('op', this.det);
  }
  close() {
    this.classicModal.hide();
  }
  mdmclose() {
    this.mdmclassicModal.hide();
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
    this.goodscode = {};
    this.chandis = [];
    this.det = {
      gn: null,
      chandi: null,
      guige: [],
      caigouid: this.actroute.params['value']['id'],
      caigouweight: null,
      price: '0.00',
      beizhu: '',
      jiaohuodate: null,
      weight: '',
      yongtu: '',
      gongcha: '',
      houdugongcha: '',
      widthgongcha: '',
      jiesuanprice: '0.00',
      zhuanhuo: '',
      orgid: ''
    };
    this.isChandi = false;
    this.showGuige = false;
  }
  add() {
    console.log('op', this.det);
    console.log('opsss', this.attrs);
    if (!this.det['price']) { this.toast.pop('error', '???????????????????????????', ''); return; }
    if (!this.det['caigouweight'] || this.det['caigouweight'] === '0') { this.toast.pop('error', '????????????????????????????????????', ''); return; }
    if (this.jiaohuodate) {
      this.det['jiaohuodate'] = this.datepipe.transform(this.jiaohuodate, 'y-MM-dd');
    }
    if (!this.det['jiaohuodate'] || this.det['jiaohuodate'] === null) { this.toast.pop('error', '?????????????????????', ''); return; }
    if (!this.det['oneweight'] || this.det['oneweight'] === null || this.det['oneweight'] === '0') {
      this.toast.pop('error', '????????????????????????????????????', '');
      return;
    }
    if (this.det['zhuanhuo'] === '') { this.toast.pop('error', '???????????????????????????', ''); return; }
    if (this.det['zhuanhuo'] === 'true') {
      if (this.det['orgid'] === '') { this.toast.pop('error', '??????????????????????????????', ''); return; }
      if (this.det['orgid'] === '670') { this.toast.pop('error', '?????????????????????????????????????????????????????????', ''); return; }
    }
    this.caigouApi.adddet(this.det).then(data => {
      // this.gridOptions.api.setRowData(data);
      this.getcaigou();
      this.classicModal.hide();
    });
  }
  selectstart() { }
  // ??????????????????
  importdet() {
    if(this.caigou['tiaohuocgprocessid']!==null){
      this.toast.pop('error', '?????????????????????????????????????????????');
      return;
    }
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
      this.getcaigou();
      this.weightclose();
    });
  }
  // ??????????????????
  confirmprice() {
    if(this.caigou['tiaohuocgprocessid']!==null){
      this.toast.pop('error', '?????????????????????????????????????????????');
      return;
    }
   
    if (!this.modifyprice['price'] || this.modifyprice['price'] === '0' || this.modifyprice['price'] < 0) {
      this.toast.pop('error', '?????????????????????????????????????????????????????????');
      return;
    }
    this.caigouApi.modifyprice(this.modifyprice).then(data => {
      this.toast.pop('success', '???????????????????????????');
      this.getcaigou();
      this.priceclose();
    });
  }
  //??????????????????
  confirmorg() {
    this.caigouApi.modifyorg(this.modifyorg).then(data => {
      this.toast.pop('success', '?????????????????????');
      this.getcaigou();
      this.orgclose();
    });
  }
  deletecaigou() {
    if(this.caigou['tiaohuocgprocessid']!==null){
      this.toast.pop('error', '???????????????????????????????????????');
      return;
    }
    this.caigouApi.deletecaigou(this.actroute.params['value']['id']).then(data => {
      this.toast.pop('success', '????????????????????????');
      this.router.navigate(['caigou']);
    });
  }
  jiaohuoaddr() {
    if (this.cg['jiaohuoaddr'] !== this.caigou['jiaohuoaddr']) {
      this.caigouApi.modifyjiaohuoaddr(this.cg).then(data => {
        this.toast.pop('success', '???????????????????????????');
        this.closeaddr();
        this.getcaigou();
      });
    }
  }
  modbeizhu() {
    if (this.cg['beizhu'] !== this.caigou['beizhu']) {
      this.caigouApi.modifybeizhu(this.cg).then(data => {
        this.toast.pop('success', '?????????????????????');
        this.getcaigou();
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
      this.getcaigou();
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
    if(this.caigou['tiaohuocgprocessid']!==null){
      this.toast.pop('error', '?????????????????????????????????????????????');
      return;
    }
    if (confirm('???????????????????????????')) {
      this.caigouApi.submitcg(this.actroute.params['value']['id']).then(data => {
        this.toast.pop('success', '????????????');
        this.getcaigou();
      });
    }
  }
  verifycg() {
    if (confirm('?????????????????????')) {
      this.caigouApi.verifycg(this.actroute.params['value']['id']).then(data => {
        this.toast.pop('success', '????????????');
        this.getcaigou();
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
      this.getcaigou();
    });
    this.supplierclose();
  }
  back() {
    if (confirm('?????????????????????')) {
      this.caigouApi.backcg(this.actroute.params['value']['id']).then(data => {
        this.toast.pop('success', '????????????');
        this.getcaigou();
      });
    }
  }
  refuse() {
    if (confirm('?????????????????????')) {
      this.caigouApi.refusecg(this.actroute.params['value']['id']).then(data => {
        this.toast.pop('success', '????????????');
        this.getcaigou();
      });
    }
  }
  // ????????????
  showgcmodify(oldvalueid, caigoudetid) {
    if (!oldvalueid) {
      return;
    }
    // if (!this.caigou['isv']) {
    this.values = [];
    this.newattrid = null;
    this.modifygccaigoudetid = null;
    this.modifygccaigoudetid = caigoudetid;
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
    // }
  }
  modifygc() {
    const model = { name: this.attrname, value: this.newattrid };
    this.caigouApi.modifygc(this.modifygccaigoudetid, model).then(data => {
      this.closegcmodify();
      this.toast.pop('success', '????????????');
      this.getcaigou();
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
    const chandigongchaparam = {gn: this.caigou['gn'], chandi: this.caigou['chandi']};
    this.mdmService.getchandigongcha(chandigongchaparam).then(chandigongchas => {
      for (let index = 0; index < chandigongchas.length; index++) {
        const element = chandigongchas[index];
        if (element.value === 'jiaohuoaddr') {
          this.jiaohuoaddrs = element.options;
          break;
        }
      }
    });
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
        if (element['chandiid'] === this.caigou['chandiid']) {
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
      this.getcaigou();
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
    this.nselect.active = [];
  }
  nextdialog1() {
    for (let index = 0; index < this.attrs.length; index++) {
      const attrjson = this.attrs[index];
      if (attrjson.isrequired) {
        if (!this.goodscode[attrjson.value]) {
          this.toast.pop('warning', '?????????' + attrjson.name + '???');
          return;
        }
      }
    }
    this.mdmService.createMaterial(this.goodscode).then(good => {
      console.log(good);
      this.nextflag = true;
      this.det['gcid'] = good.id;
      const chandigongchaparam = {gn: good['gn'], chandi: good['chandi']};
      this.mdmService.getchandigongcha(chandigongchaparam).then(chandigongchas => {
        this.chandigongchas = [];
        for (let index = 0; index < chandigongchas.length; index++) {
          const element = chandigongchas[index];
          if (element.value!=='jiaohuoaddr') {
            this.chandigongchas.push(element);
          }
        }
        if (this.editTempParam.detdata) {
          this.det['houdugongcha'] = this.editTempParam.detdata['houdugongcha'];
          this.det['widthgongcha'] = this.editTempParam.detdata['widthgongcha'];
          this.det['gongcha'] = this.editTempParam.detdata['gongcha'];
          this.det['yongtu'] = this.editTempParam.detdata['yongtu'];
          this.jiaohuodate = new Date(this.editTempParam.detdata['jiaohuodate']);
          this.det['oneweight'] = this.editTempParam.detdata['weight'];
          this.det['detid'] = this.editTempParam.detdata['id'];
          this.det['caigouweight'] = this.editTempParam.detdata['caigouweight'];
          this.det['price'] = this.editTempParam.detdata['price'];
          if (this.editTempParam.detdata['zhuanhuo']==='??????') {
            this.det['zhuanhuo'] = true;
          } else {
            this.det['zhuanhuo'] = false;
          }
          this.det['orgid'] = this.editTempParam.detdata['orgid'];
          this.det['jiesuanprice'] = this.editTempParam.detdata['jiesuanprice'];
          this.det['beizhu'] = this.editTempParam.detdata['beizhu'];
        }
      });
    });
  }
  /**????????????mdm?????? */
  showdetmodify(oldvalueid, caigoudet) {
    if (!oldvalueid) { return; }
    this.nextflag = false;
    this.selectNull();
    this.zhuanhuos = [{ value: '', label: '??????' }, { value: true, label: '??????' }, { value: false, label: '?????????' }];
    this.jiaohuodate = undefined;
    this.goodscode = {gn: caigoudet['goodscode']['gn']};
    this.mdmService.getMdmAttributeDic({ itemcode: caigoudet['goodscode']['gncode'] }).then(data1 => {
      this.showGuige = true;
      this.attrs = data1;
      this.goodscode = caigoudet['goodscode'];
    });
    this.editflag.zhidan = true;
    this.editTempParam.detdata = caigoudet;
    this.mdmclassicModal.show();
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
  // ??????????????????
  showgaizhanglog() {
    this.gaizhanglog.show();
  }
  closegaizhanglog() {
    this.gaizhanglog.hide();
  }
  selectmonth(value) {
    this.caigou['month'] = this.datepipe.transform(value, 'y-MM-dd');
    console.log('asdas', this.datepipe.transform(value, 'y-MM'));
  }
  modifygcinfo() {
    const caigouid = this.actroute.params['value']['id'];
    this.caigouApi.modifyGcinfo({ gcmonth: this.caigou['month'] }, caigouid).then(data => {
      this.getcaigou();
      this.closegcinfodialog();
    });
  }
  // ????????????
  submitgaizhang() {
    const caigouid = this.actroute.params['value']['id'];
    this.caigouApi.submitgaizhang(this.gzuser.code, caigouid).then(data => {
      this.getcaigou();
      this.closegaizhanglog();
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
      this.getcaigou();
    });
  }
  // ??????????????????
  contractUploader() {
    if(this.caigou['tiaohuocgprocessid']!==null){
      this.toast.pop('error', '?????????????????????????????????????????????');
      return;
    }
    this.hetongdialog.show();
  }
  //???????????????????????????
  uploadParam: any = { module: 'qihuo', count: 1, sizemax: 5, extensions: ['doc', 'pdf', 'png', 'jpg'] };
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
  caigoudetids: any = [];
  //??????????????????
  deletecaigoudet() {
    if(this.caigou['tiaohuocgprocessid']!==null){
      this.toast.pop('error', '???????????????????????????????????????');
      return;
    }
    this.caigoudetids = new Array();
    const caigoudetlist = this.gridOptions.api.getModel()['rowsToDisplay'];
    for (let i = 0; i < caigoudetlist.length; i++) {
      if (caigoudetlist[i].selected && caigoudetlist[i].data && caigoudetlist[i].data['gn'] !== '??????') {
        this.caigoudetids.push(caigoudetlist[i].data.id);
      }
    }
    if (!this.caigoudetids.length) {
      this.toast.pop('warning', '?????????????????????????????????');
      return;
    }
    if (confirm('????????????????????????')) {
      this.caigouApi.deletecaigoudet(this.caigoudetids).then(data => {
        this.toast.pop('success', '???????????????');
        this.getcaigou();
      });
    }
  }
  openbuyer() {
    this.buyer = { buyerid: '', id: '' };
    this.buyer['id'] = this.actroute.params['value']['id'];
    this.buyerModal.show();
    this.findWiskind();
  }
  //??????????????????
  companyIsWiskind = []
  findWiskind() {
    if (this.companyIsWiskind.length < 1) {
      this.companyIsWiskind.push({ label: '?????????????????????', value: '' });
      this.customerApi.findwiskind().then((response) => {
        for (let i = 1; i < response.length; i++) {
          if (response[i].id === 3453) {
            response.splice(i, 1);
          }
        }
        response.forEach(element => {
          if (element.id === 3786 ||
            element.id === 3864 ||
            element.id === 21619
          ) {
            this.companyIsWiskind.push({
              label: element.name,
              value: element.id
            });
          }
        });
        console.log(this.companyIsWiskind);
      })
    }
  }
  confirmbuyer() {
    if (this.buyer['buyerid'] === null) {
      this.toast.pop('error', '????????????????????????', '');
      return;
    }
    this.caigouApi.modifybuyer(this.buyer).then(data => {
      this.toast.pop('success', '????????????????????????');
      this.getcaigou();
    });
    this.buyerclose();
  }
  buyerclose() {
    this.buyerModal.hide();
  }
  querymat() {
    if (this.det['matcode'] && this.det['matcode'].trim()) {
      this.qihuoapi.getmat(this.det['matcode']).then(mat => {
        this.goodscode = {gn: mat['gn']};
        if (!mat['gncode']) {
          this.toast.pop('warning', '?????????????????????');
          return;
        }
        this.mdmService.getMdmAttributeDic({ itemcode: mat['gncode'] }).then(data1 => {
          this.showGuige = true;
          this.attrs = data1;
          for (const key in mat) {
            if (Object.prototype.hasOwnProperty.call(mat, key)) {
              const element = mat[key];
              this.goodscode[key] = element;
            }
          }
        });
      });
    }
  }
  /**???????????? */
  selectattr(item, value) {
    if (item['iscas']) {
      const options = item['options'];
      for (let index = 0; index < options.length; index++) {
        const element = options[index];
        if (value === element['value']) {
          this.mdmService.getmdmclassifychild(element['id']).then(children => {
            for (let i = 0; i < children.length; i++) {
              const child = children[i];
              for (let j = 0; j < this.attrs.length; j++) {
                const attr = this.attrs[j];
                if (child['mdmvalue'] === attr['mdmvalue']) {
                  attr['options'] = child['options'];
                  this.goodscode[attr.value] = null;
                  break;
                }
              }
            }
          });
          break;
        }
      }
    }
  }

  showAddFee(){
    this.lines = [];
    const ids = new Array();
    const dets = this.gridOptions.api.getModel()['rowsToDisplay'];
    let count = 0;
    for (let i = 0; i < dets.length; i++) {
      if (dets[i].selected && dets[i].data) {
        count++;
        ids.push(dets[i].data.id);
      }
    }
    if (ids.length <= 0) {
      this.toast.pop('warning', '???????????????');
      return '';
    }
    this.feemodel['ids'] = ids;
    this.addFeeModal.show();
    this.getCategory();
    console.log(1111111);
    console.log(ids);
    console.log(ids[0]);
    if(ids.length === 1){
      this.caigouApi.getYugufeeList(ids[0]).then(data => {
        this.lines = data;
        for(let i = 0;i<this.lines.length;i++){
          this.lines[i]['feecustomer'] = data[i]['feecustomer']['name'];
          this.feemodel['id'] = data[i]['id'];
        }
        console.log(this.lines);
        this.getcaigou();
      });
    }
  }
  // ?????????????????????
  showInput() {
    this.isshowInput = !this.isshowInput;
  }
  feetypes = [{ value: '1', label: '?????????' },
  { value: '2', label: '?????????' },
  { value: '3', label: '?????????' },
  { value: '4', label: '?????????' },
  { value: '5', label: '?????????' },
  { value: '6', label: '?????????' },
  { value: '7', label: '???????????????' },
  { value: '8', label: '?????????' },
  { value: '9', label: '?????????' },
  { value: '10', label: '?????????' },
  { value: '13', label: '?????????' }];

  categorys = [
    { value: 0, label: '????????????' },
    { value: 1, label: '????????????' },
    { value: 2, label: '???' },
  ];
  category = '';
  getCategory() {
    console.log(this.feemodel['chengyun']);
    let category = this.feemodel['chengyun'];
    if (category === null || category === undefined) {
      this.category = '';
    } else if (category === 1) {
      this.category = '????????????';
    } else if (category === 0) {
      this.category = '????????????';
    } else{
      this.category = '';
    }
  }
  // ????????????
  feeHeji: number = 0;
  lines: any[] = [];//???????????????
  insertline() {//??????
    this.getCategory();
    if (!this.feemodel['feetype']) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    if (!this.feemodel['price']) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    if (!this.feemodel['feecustomer']['code']) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    if ((this.feemodel['feetype'] === '1' || this.feemodel['feetype'] === '2' || this.feemodel['feetype'] === '3') 
        && (this.feemodel['chengyun'] === undefined || this.feemodel['chengyun'] === null)) {
      this.toast.pop('warning', '?????????????????????!');
      return;
    }
    this.caigouApi.addYuguFee(this.feemodel).then(data => {
      this.getcaigou();
    });
    this.feeHeji = this.feeHeji['add'](this.feemodel['price']);
    this.lines.push(
      {
        id: new Date().getTime(),
        type: this.feemodel['feetype'],
        yuguprice: this.feemodel['price'],
        feecustomer: this.feemodel['feecustomer']['name'],
        chengyun: this.feemodel['chengyun']
      }
    )
    this.isshowInput = !this.isshowInput;
    this.feemodel['fees'] = this.lines;
  }

  delorderfee(index, yuguprice) {
    this.lines.splice(index, 1);
    this.feeHeji = this.feeHeji['sub'](yuguprice);
    this.caigouApi.deleteyugufee(this.feemodel['id']).then(data => {
      this.getcaigou();
    });
  }
  feeadddialogclose() { this.addFeeModal.hide(); }
  addYuguFee(){
    this.addFeeModal.hide();
  }

}
