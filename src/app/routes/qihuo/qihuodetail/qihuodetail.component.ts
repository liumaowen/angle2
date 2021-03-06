import { StorageService } from './../../../dnn/service/storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsService } from "../../../core/settings/settings.service";
import { GridOptions, ColDef } from "ag-grid";
import { ModalDirective, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { QihuoService } from "../qihuo.service";
import { ClassifyApiService } from "../../../dnn/service/classifyapi.service";
import { DatePipe } from "@angular/common";
import { ToasterService } from "angular2-toaster";
import { ActivatedRoute, Router } from "@angular/router";
import { MoneyService } from "../../../dnn/service/money.service";
import { UserapiService } from './../../../dnn/service/userapi.service';
import { KucundetimportComponent } from "../../../dnn/shared/kucundetimport/kucundetimport.component";
import { ContactprojectComponent } from '../contactproject/contactproject.component';
import { BusinessorderapiService } from 'app/routes/businessorder/businessorderapi.service';
import { AddressparseService } from 'app/dnn/service/address_parse';
import { NoticewuliuyuanComponent } from 'app/dnn/shared/noticewuliuyuan/noticewuliuyuan.component';
import { FeeapiService } from 'app/routes/fee/feeapi.service';
import { ImporttiaohuobidComponent } from '../importtiaohuobid/importtiaohuobid.component';
import { CaigouService } from 'app/routes/caigou/caigou.service';
import { CustomerapiService } from 'app/routes/customer/customerapi.service';
import { MatchcarService } from 'app/routes/matchcar/matchcar.service';
import { QualityobjectionimportComponent } from 'app/dnn/shared/qualityobjectionimport/qualityobjectionimport.component';
import { OrderapiService } from 'app/routes/order/orderapi.service';
import { MdmService } from 'app/routes/mdm/mdm.service';



@Component({
  selector: 'app-qihuodetail',
  templateUrl: './qihuodetail.component.html',
  styleUrls: ['./qihuodetail.component.scss']
})
export class QihuodetailComponent implements OnInit {
  oldyufurate: any = '';
  @ViewChild('chukufeetype') private ckfeetype: ModalDirective;
  //??????
  @ViewChild('allocationModel') private allocationModel: ModalDirective;
  //????????????
  @ViewChild('shifangallocationModel') private shifangallocationModel: ModalDirective;
  // ??????????????????
  @ViewChild('uploaderModel') private uploaderModel: ModalDirective;
  //??????????????????
  @ViewChild('zuofeiModel') private zuofeiModel: ModalDirective;
  // ???????????????
  @ViewChild('zhibaoshuModel') private zhibaoshuModel: ModalDirective;
  // ??????????????????????????????
  @ViewChild('qhchangetijiaoModel') private qhchangetijiaoModel: ModalDirective;
  // ??????????????????
  @ViewChild('interestfreeandunitModel') private interestfreeandunitModel: ModalDirective;
  // ??????????????????
  @ViewChild('createCaigouModal') private createCaigouModal: ModalDirective;
  @ViewChild('addqualityModal') private addqualityModal: ModalDirective;
  @ViewChild('createmdmqihuodialog') private createmdmqihuodialog: ModalDirective;
  @ViewChild('mdmgndialog') private mdmgndialog: ModalDirective;
  // ????????????????????????????????????
  flag: { edit: boolean, editbaocun: boolean, disabled: boolean, verify: boolean, confirm: boolean, querendaohuo: boolean, shenhe: boolean, pdf: boolean, deldet: boolean } =
    { edit: false, editbaocun: false, disabled: false, verify: false, confirm: false, querendaohuo: false, shenhe: false, pdf: false, deldet: false };
  // ???????????????
  mdmgnsearch = { pagenum: 1, pagesize: 10, itemname: '', categoryname: '' };
  goodscode: any = {};
  gnData: any = [];
  editflag = { zhidan: false, iseditguige: false };
  editTempParam = { detdata: null }; // ????????????????????????
  chukufeetypes: { label: string; value: string; }[] = [];
  chukufeetypess = {};
  params = {};
  qhqualityModel = {};
  paytypes = [{ value: '0', label: '????????????' }, { value: '1', label: '????????????' }];
  //?????????????????????qihuoid??????
  qihuoid: number;
  tihuoid: number;
  wlweight;
  //??????????????????
  zlbsModalRef: BsModalRef;
  isimport = { flag: true };
  rstypes = [{ value: '1', label: '??????' }, { value: '2', label: '??????' }, { value: '3', label: '????????????' }];
  saletypes = [{ value: '1', label: '??????' }, { value: '2', label: '??????' }, { value: '3', label: '????????????' }];
  qihuomodel = { addrbak: {}, buyer: {}, seller: {}, org: {}, arrearspeople: {}, cuser: {}, vuser: {} ,cperson: {}};
  qihuodet = {};
  wlcustomer = {};
  transporttype;
  isbaojia = false;
  editqihuo: any = {}; // ?????????????????????
  addrs: any = []; // ????????????
  orderdetids: any[] = [];
  //?????????????????????
  feemodel: any = { feetype: null, price: null, beizhu: null };
  lines: any[] = [];//???????????????
  @ViewChild('feeadddialog') private feeadddialog: ModalDirective;
  feetypes = [{ value: '1', label: '?????????' },
  { value: '2', label: '?????????' },
  { value: '3', label: '?????????' },
  { value: '4', label: '?????????' },
  { value: '5', label: '?????????' },
  { value: '6', label: '?????????' },
  { value: '7', label: '???????????????' },
  { value: '8', label: '?????????' },
  { value: '9', label: '?????????' },
  { value: '10', label: '?????????' }];
  qihuoflag: any = {
    dingjin: true, isv: false, fisv: false, fp: false, issubmit:
      true, detail: true, isdingjinedit: false, noticecaigou: false,
    isfinish: false, isrecall: false, isorderchange: false, qihuochangestatus: 0, // ?????????????????????0:?????????;1:?????????;2:?????????
    isruku: false
  };
  one: Boolean = true;
  two: Boolean = false;
  hesuanDate: Boolean = false;
  // ??????????????????
  isshowInput = false;
  // ????????????
  feeHeji: number = 0;
  iscountshow: boolean; // ????????????????????????
  diyfeeHeji: number = 0;
  ordertitle: String;
  qihuodetname: String;
  orderdetname: String;
  zhidaoprices;
  isurgent;
  materialtypes;
  private gridApi;
  tabviewindex = 0; // ????????????????????????????????????
  wuluiorderlist: any = [];
  zijinmonthrates: any = [];
  storagefees: any = [];
  results: any;
  //aggird ?????????????????????
  gridOptions: GridOptions;//??????
  pgridOptions: GridOptions;//??????
  bmgridOptions: GridOptions;//??????
  ordergridOptions: GridOptions;//????????????
  dingjingridOptions: GridOptions;//??????
  allocationgridOptions: GridOptions;//??????
  wuliuOffergridOptions: GridOptions; // ??????????????????
  qihuochangegridOptions: GridOptions; // ??????????????????
  isshownoticecaigou: boolean; // ????????????????????????????????????
  songaddress: any = ''; // ????????????
  isSaleman = false; // ??????????????????
  msgs = [{ severity: 'info', detail: '?????????????????????????????????????????????????????????????????????????????????' }];
  isall = false; // ????????????
  singleData = [];
  validQihuochangedet = [];
  // ??????????????????
  bsModalRef: BsModalRef;
  importTBbsModalRef: BsModalRef;
  noticewuliuparams: any = {}; // ???????????????????????????????????????
  qihuodetlist: any = []; // ????????????
  qhchangetijiaobeizhu = ''; // ????????????????????????
  editqihuobuyerid = null;
  units: any = []; // ????????????
  isShowInterestfree = false; // ????????????????????????????????????????????????????????????
  interestfreeAndUnitObj = {
    qihuodetid: null, isinterestfree: false, interestfreedays: null, interestfreereason: '', unitname: null,
    unitweight: null, unitprice: null, interestfreeOrUnit: ''
  }; // ?????????????????????????????????
  // releasetypes = [{ value: '0', label: '?????????' }, { value: '1', label: '???????????????' }, { value: '2', label: '??????????????????' }];
  chandigongchas = [];
  packageyaoqius = [];
  constructor(public settings: SettingsService, private qihuoapi: QihuoService, private classifyapi: ClassifyApiService,
    private addressparseService: AddressparseService, private caigouApi: CaigouService, private datepipe: DatePipe,
    private toast: ToasterService, private route: ActivatedRoute, private router: Router, private moneyapi: MoneyService,
    private userapi: UserapiService, private modalService: BsModalService, private modalService1: BsModalService,
    private matchcarApi: MatchcarService, private storage: StorageService, private businessOrderApi: BusinessorderapiService,
    private feeApi: FeeapiService, private businessorderApi: BusinessorderapiService, private customerApi: CustomerapiService,
    public mdmService: MdmService, private orderApi: OrderapiService, private classifyApi: ClassifyApiService) {
    //aggird????????????
    this.gridOptions = {
      rowSelection: 'multiple',
      groupDefaultExpanded: -1,
      suppressAggFuncInHeader: true,
      enableRangeSelection: true,
      rowDeselection: true,
      overlayLoadingTemplate: this.settings.overlayLoadingTemplate,
      overlayNoRowsTemplate: this.settings.overlayNoRowsTemplate,
      enableColResize: true,
      enableSorting: true,
      excelStyles: this.settings.excelStyles,
      enableFilter: true,
      singleClickEdit: true, // ????????????
      stopEditingWhenGridLosesFocus: true, // ????????????????????????
      getContextMenuItems: (params) => {
        let result = [
          'copy',
          {
            name: '?????????',
            action: () => {
              // params.api.exportDataAsCsv(params);
              params.columnApi.autoSizeAllColumns();
            }
          }
        ];
        if (this.qihuomodel['ordertype'] === 1 || this.qihuomodel['ordertype'] === 10 || this.qihuomodel['ordertype'] === 14) {
          result.push({
            name: '????????????',
            action: () => {
              this.addproductdialog(params.node.data.neibujiesuanprice, params.node.data.id, params.node.data.goodscode);
            }
          });
        }
        if (!this.qihuomodel['vuserid']) {
          result.push({
            name: '?????????',
            action: () => {
              this.qihuoapi.copydet({ id: params.node.data.id }).then(() => {
                this.getqihuomodel();
                this.findqihuodet();
              })
            }
          });
        }
        return result;
      },
      onSelectionChanged: (event) => {
        const rowCount = event.api.getSelectedNodes();
        this.wlweight = 0;
        rowCount.forEach(ele => {
          if (!ele['data']['group']) {
            this.wlweight = this.wlweight + Number(ele['data']['weight']);
          }

        });
        this.wlweight = this.wlweight.toFixed(3);
      },
    }
    this.gridOptions.onGridReady = this.settings.onGridReady;
    this.gridOptions.groupSuppressAutoColumn = true;
    this.gridOptions.columnDefs = [
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'id', minWidth: 80, enableRowGroup: true,
        checkboxSelection: true
      },
      {
        cellStyle: { 'display': 'block' }, headerName: '??????', headerClass: 'wis-ag-center', enableRowGroup: true,
        children: [
          {
            cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'goodscode.id', minWidth: 100
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.gn', minWidth: 60
          },
          { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.chandi', minWidth: 60, enableRowGroup: true },
          { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.guige', minWidth: 120, enableRowGroup: true },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.houdu', minWidth: 60, enableRowGroup: true,
            valueFormatter: this.settings.valueFormatter3,
            onCellClicked: (data) => {
              // this.showgcmodify(data['data']['goodscode']['houdu'], data['data']['id']);
              this.showdetmodify(data['data']['goodscode']['houdu'], data['data']);
            }
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.width', minWidth: 60, enableRowGroup: true,
            onCellClicked: (data) => {
              this.showdetmodify(data['data']['goodscode']['width'], data['data']);
            }
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.duceng', minWidth: 60, enableRowGroup: true,
            onCellClicked: (data) => {
              this.showdetmodify(data['data']['goodscode']['duceng'], data['data']);
            }
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '??????|??????', field: 'goodscode.color', minWidth: 95, enableRowGroup: true,
            onCellClicked: (data) => {
              this.showdetmodify(data['data']['goodscode']['color'], data['data']);
            }
          },
          { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'sehao', minWidth: 80, enableRowGroup: true },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.caizhi', minWidth: 60, enableRowGroup: true,
            onCellClicked: (data) => {
              this.showdetmodify(data['data']['goodscode']['caizhi'], data['data']);
            }
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'goodscode.ppro', minWidth: 80, enableRowGroup: true,
            onCellClicked: (data) => {
              this.showdetmodify(data['data']['goodscode']['ppro'], data['data']);
            }
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'goodscode.painttype', minWidth: 90, enableRowGroup: true,
            onCellClicked: (data) => {
              this.showdetmodify(data['data']['goodscode']['painttype'], data['data']);
            }
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.beiqi', minWidth: 60, enableRowGroup: true,
            onCellClicked: (data) => {
              this.showdetmodify(data['data']['goodscode']['beiqi'], data['data']);
            }
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'goodscode.qimo', minWidth: 90, enableRowGroup: true,
            onCellClicked: (data) => {
              this.showdetmodify(data['data']['goodscode']['qimo'], data['data']);
            }
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.tuceng', minWidth: 90, enableRowGroup: true,
            onCellClicked: (data) => {
              this.showdetmodify(data['data']['goodscode']['tuceng'], data['data']);
            }
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'goodscode.neijing', minWidth: 80, enableRowGroup: true,
            onCellClicked: (data) => {
              this.showdetmodify(data['data']['goodscode']['neijing'], data['data']);
            }
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'goodscode.penma', minWidth: 90, enableRowGroup: true,
            onCellClicked: (data) => {
              this.showdetmodify(data['data']['goodscode']['penma'], data['data']);
            }
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'oneweight', minWidth: 80, enableRowGroup: true,
            onCellClicked: (params) => {
              this.showdetmodify(params['data']['oneweight'], params['data']);
            }
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'goodscode.xiubian', minWidth: 90, enableRowGroup: true,
            onCellClicked: (data) => {
              this.showdetmodify(data['data']['goodscode']['xiubian'], data['data']);
            }
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'goodscode.packagetype', minWidth: 90, enableRowGroup: true,
            onCellClicked: (data) => {
              this.showdetmodify(data['data']['goodscode']['packagetype'], data['data']);
            }
          }
        ]
      },
      {
        cellStyle: { 'display': 'block' }, headerName: '??????', headerClass: 'wis-ag-center', enableRowGroup: true,
        children: [
          {
            cellStyle: { 'text-align': 'right' }, headerName: '?????????', field: 'weight', minWidth: 80, enableRowGroup: true,
            editable: (params) => this.editable(params) || (this.qihuoflag['qihuochangestatus'] === 1 && !this.qihuoflag['isruku']),
            valueFormatter: this.settings.valueFormatter3,
            onCellValueChanged: (params) => { this.modifyattr(params, '?????????'); }
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'yicaigouweight', minWidth: 80, enableRowGroup: true,
            valueFormatter: this.settings.valueFormatter3
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'yirukuweight', minWidth: 80, enableRowGroup: true,
            valueFormatter: this.settings.valueFormatter3
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'yitihuoweight', minWidth: 80, enableRowGroup: true,
            valueFormatter: this.settings.valueFormatter3
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'yijiagongweight', minWidth: 80, enableRowGroup: true,
            valueFormatter: this.settings.valueFormatter3
          }
        ]
      },
      {
        cellStyle: { 'display': 'block' }, headerName: '??????', headerClass: 'wis-ag-center', enableRowGroup: true,
        children: [
          {
            cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'weightgongcha', minWidth: 60, enableRowGroup: true,
            // editable: this.editable,
            onCellClicked: (params) => {
              this.showdetmodify(params['data']['weightgongcha'], params['data']);
            }
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'houdugongcha', minWidth: 60, enableRowGroup: true,
            // editable: this.editable,
            onCellClicked: (params) => {
              this.showdetmodify(params['data']['houdugongcha'], params['data']);
            }
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'widthgongcha', minWidth: 60, enableRowGroup: true,
            // editable: this.editable,
            onCellClicked: (params) => {
              this.showdetmodify(params['data']['widthgongcha'], params['data']);
            }
          }
        ]
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'innerjiaohuoaddr', minWidth: 90, enableRowGroup: true,
        // editable: this.editable,
        onCellClicked: (params) => {
          this.showdetmodify(params['data']['innerjiaohuoaddr'], params['data']);
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????????????????', field: 'innerqixian', minWidth: 120, enableRowGroup: true,
        editable: (params) => this.editable(params) || (this.qihuoflag['qihuochangestatus'] === 1 && !this.qihuoflag['isruku']),
        valueFormatter: data => {
          if ((data.value + '').indexOf('->') !== -1) {
            return data.value;
          }
          else {
            return this.datepipe.transform(data.value, 'y-MM-dd');
          }
        },
        onCellValueChanged: (params) => { this.modifyattr(params, '????????????') }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'yongtu', minWidth: 60, enableRowGroup: true,
        // editable: this.editable,
        onCellClicked: (params) => {
          this.showdetmodify(params['data']['yongtu'], params['data']);
        }
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '????????????', field: 'saleprice', minWidth: 90, enableRowGroup: true,
        editable: this.editable,
        valueFormatter: this.settings.valueFormatter2,
        onCellClicked: (params) => {
          console.log(params);
          this.salepriceandfeemodifydialogshow(params.data.id, params.data.saleprice, params.data.neibujiesuanprice);
        }
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '????????????', field: 'neibujiesuanprice', minWidth: 90,
        enableRowGroup: true, editable: this.editable,
        valueFormatter: this.settings.valueFormatter2,
        onCellValueChanged: (params) => { this.modifyattr(params, "?????????") }
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '??????????????????', field: 'yugufeeprice', minWidth: 120, enableRowGroup: true,
        valueFormatter: this.settings.valueFormatter2
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '????????????', field: 'yugumaoliprice', minWidth: 90, enableRowGroup: true,
        valueFormatter: this.settings.valueFormatter2
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'yugufeemiaoshu', minWidth: 120, enableRowGroup: true },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'zhidaojiagedesc', minWidth: 80, enableRowGroup: true,
        editable: this.editable,
        cellRenderer: data => {
          if (data.data.zhidaojiagedesc === 0) {
            return '??????';
          } else if (data.data.zhidaojiagedesc === 1) {
            return '??????';
          } else if (data.data.zhidaojiagedesc === 2) {
            return '???????????????';
          }
        }, onCellValueChanged: (params) => { this.modifyattr(params, "????????????") }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'materialtype', minWidth: 80, enableRowGroup: true,
        editable: this.editable,
        cellRenderer: data => {
          if (data.data.materialtype === 1) {
            return '?????????';
          } else if (data.data.materialtype === 2) {
            return '?????????';
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'packageyaoqiu', minWidth: 90, enableRowGroup: true
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'length', minWidth: 90, enableRowGroup: true,
        editable: this.editable,
        onCellValueChanged: (params) => { this.modifyattr(params, '????????????'); }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'count', minWidth: 90, enableRowGroup: true,
        editable: this.editable,
        onCellValueChanged: (params) => { this.modifyattr(params, '????????????'); }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'unitname', minWidth: 90,
        onCellClicked: (params) => {
          if (null === this.qihuomodel['vuserid'] && this.qihuomodel['qihuostatus'] !== 8) {
            this.showinterestfreeandunitModel(params.data, 'unit');
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'unitweight', minWidth: 90,
        onCellClicked: (params) => {
          if (null === this.qihuomodel['vuserid'] && this.qihuomodel['qihuostatus'] !== 8) {
            this.toast.pop('info', '?????????????????????????????????');
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'unitprice', minWidth: 90,
        onCellClicked: (params) => {
          if (null === this.qihuomodel['vuserid'] && this.qihuomodel['qihuostatus'] !== 8) {
            this.toast.pop('info', '?????????????????????????????????');
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'isinterestfree', minWidth: 90,
        cellRenderer: data => {
          if (data.data.isinterestfree) {
            return '???';
          } else {
            return '???';
          }
        },
        onCellClicked: (params) => {
          if (null === this.qihuomodel['vuserid'] && this.isShowInterestfree && this.qihuomodel['qihuostatus'] !== 8) {
            this.showinterestfreeandunitModel(params.data, 'interestfree');
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'interestfreedays', minWidth: 90,
        onCellClicked: (params) => {
          if (null === this.qihuomodel['vuserid'] && this.isShowInterestfree && this.qihuomodel['qihuostatus'] !== 8) {
            this.toast.pop('info', '????????????????????????????????????');
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'interestfreereason', minWidth: 90,
        onCellClicked: (params) => {
          if (null === this.qihuomodel['vuserid'] && this.isShowInterestfree && this.qihuomodel['qihuostatus'] !== 8) {
            this.toast.pop('info', '????????????????????????????????????');
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'beizhu', minWidth: 60, enableRowGroup: true,
        editable: (params) => this.editable(params) || (this.qihuoflag['qihuochangestatus'] === 1 && !this.qihuoflag['isruku']),
        onCellValueChanged: (params) => { this.modifyattr(params, '??????') }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'isurgent', minWidth: 60, enableRowGroup: true,
        editable: this.editable,
        cellRenderer: data => {
          if (data.data.isurgent) {
            return '???';
          } else {
            return '???';
          }
        },
        onCellValueChanged: (params) => { this.modifyattr(params, '????????????') }
      },
      {
        cellStyle: { "display": "block" }, headerName: '??????', headerClass: 'wis-ag-center', enableRowGroup: true,
        children: [
          {
            cellStyle: { 'text-align': 'center' }, headerName: '??????', field: '', minWidth: 60, enableRowGroup: true, cellRenderer: data => {
              if (this.qihuoflag['issubmit']) {
                return '<a target="_blank">??????</a>';
              } else {
                return '';
              }
            }, onCellClicked: (data) => {
              if (this.qihuoflag['issubmit']) {
                if (confirm('????????????????????????')) {
                  this.qihuoapi.deldet(data.data.id).then(() => {
                    this.toast.pop('success', '???????????????');
                    this.getqihuomodel();
                    this.findqihuodet();
                  })
                }
              }
            }
          },
          {
            cellStyle: { 'text-align': 'center' }, headerName: '??????', field: '', minWidth: 60, enableRowGroup: true, cellRenderer: data => {
              if (this.qihuomodel['qihuostatus'] !== 8) {
                return '<a target="_blank">??????</a>';
              } else {
                return '';
              }
            }, onCellClicked: (data) => {
              if (this.qihuomodel['qihuostatus'] !== 8) {
                this.impkucundialog(data.data.id);
              }
            }
          }


        ]
      }

    ];
    //dingjingridOptions????????????
    this.dingjingridOptions = {
      groupDefaultExpanded: -1,
      suppressAggFuncInHeader: true,
      enableRangeSelection: true,
      rowDeselection: true,
      overlayLoadingTemplate: this.settings.overlayLoadingTemplate,
      overlayNoRowsTemplate: this.settings.overlayNoRowsTemplate,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      excelStyles: this.settings.excelStyles,
      getContextMenuItems: this.settings.getContextMenuItems
    };
    this.dingjingridOptions.onGridReady = this.settings.onGridReady;
    this.dingjingridOptions.groupSuppressAutoColumn = true;
    this.dingjingridOptions.columnDefs = [
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'buyer.name', minWidth: 60, enableRowGroup: true },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'shifudingjin', minWidth: 60, enableRowGroup: true,
        valueFormatter: this.settings.valueFormatter2
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'cuser.realname', minWidth: 60, enableRowGroup: true },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'cdate', minWidth: 60, enableRowGroup: true,
        valueFormatter: data => {
          return this.datepipe.transform(data.value, 'y-MM-dd HH:mm:s');
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'hesuanDate', minWidth: 60, enableRowGroup: true,
        valueFormatter: data => {
          return this.datepipe.transform(data.value, 'y-MM-dd HH:mm:s');
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'isv', minWidth: 60, enableRowGroup: true,
        cellRenderer: params => {
          if (params.data.isv) {
            return '?????????';
          }
          return '??????';
        }
      },
      // {
      //   cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'verify', minWidth: 60, enableRowGroup: true,
      //   cellRenderer: params => {
      //     if (this.storage.getObject('cuser').id === 3943 && !params.data.isv) {
      //       return '<a target="_blank">??????</a>';
      //     }
      //     return '';
      //   },
      //   onCellClicked: (data) => {
      //     if (this.storage.getObject('cuser').id === 3943 && !data.data.isv) {
      //       this.verifydingjin(data.data.id);
      //     }
      //   }
      // },


    ];
    this.allocationgridOptions = {
      groupDefaultExpanded: -1,
      suppressAggFuncInHeader: true,
      enableRangeSelection: true,
      rowDeselection: true,
      overlayLoadingTemplate: this.settings.overlayLoadingTemplate,
      overlayNoRowsTemplate: this.settings.overlayNoRowsTemplate,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      excelStyles: this.settings.excelStyles,
      getContextMenuItems: this.settings.getContextMenuItems
    };
    this.allocationgridOptions.onGridReady = this.settings.onGridReady;
    this.allocationgridOptions.groupSuppressAutoColumn = true;
    this.allocationgridOptions.columnDefs = [
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'buyer.name', minWidth: 60, enableRowGroup: true },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'jine', minWidth: 60, enableRowGroup: true,
        valueFormatter: this.settings.valueFormatter2
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'cuser.realname', minWidth: 60, enableRowGroup: true },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'cdate', minWidth: 60, enableRowGroup: true,
        valueFormatter: data => {
          return this.datepipe.transform(data.value, 'y-MM-dd HH:mm:s');
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'isv', minWidth: 60, enableRowGroup: true,
        cellRenderer: params => {
          if (params.data.isv) {
            return '?????????';
          }
          return '??????';
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'verify', minWidth: 60, enableRowGroup: true,
        cellRenderer: params => {
          if (this.storage.getObject('cuser').id === 3943 && !params.data.isv) {
            return '<a target="_blank">??????</a>';
          }
          return '';
        },
        onCellClicked: (data) => {
          if (this.storage.getObject('cuser').id === 3943 && !data.data.isv) {
            this.verifyAllocation(data.data.id);
          }
        }
      },
    ];
    //aggird????????????
    this.pgridOptions = {
      groupDefaultExpanded: -1,
      suppressAggFuncInHeader: true,
      enableRangeSelection: true,
      rowDeselection: true,
      overlayLoadingTemplate: this.settings.overlayLoadingTemplate,
      overlayNoRowsTemplate: this.settings.overlayNoRowsTemplate,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      excelStyles: this.settings.excelStyles,
      getContextMenuItems: this.settings.getContextMenuItems
    };
    this.pgridOptions.onGridReady = this.settings.onGridReady;
    this.pgridOptions.groupSuppressAutoColumn = true;
    this.pgridOptions.columnDefs = [
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.gn', minWidth: 60, enableRowGroup: true },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'guige', minWidth: 60, enableRowGroup: true },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '??????', field: 'weight', minWidth: 60, enableRowGroup: true,
        valueFormatter: this.settings.valueFormatter3
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '??????/???', field: 'price', minWidth: 60, enableRowGroup: true,
        valueFormatter: this.settings.valueFormatter2
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '?????????/???', field: 'pertprice', minWidth: 60, enableRowGroup: true,
        valueFormatter: this.settings.valueFormatter2
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'amount', minWidth: 60, cellRenderer: params => {
          return '<a target="_blank">??????</a>';
        }, onCellClicked: params => {
          if (confirm('??????????????????????')) {
            this.qihuoapi.delproduct(params.data.id).then(data => {
              this.toast.pop('success', '???????????????');
              this.queryproduct();
              this.getqihuomodel();
            })
          }
        }
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????id', field: 'id', minWidth: 60, enableRowGroup: true }
    ];
    //??????
    this.bmgridOptions = {
      groupDefaultExpanded: -1,
      suppressAggFuncInHeader: true,
      enableRangeSelection: true,
      rowDeselection: true,
      overlayLoadingTemplate: this.settings.overlayLoadingTemplate,
      overlayNoRowsTemplate: this.settings.overlayNoRowsTemplate,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      excelStyles: this.settings.excelStyles,
      getContextMenuItems: this.settings.getContextMenuItems
    };
    this.bmgridOptions.onGridReady = this.settings.onGridReady;
    this.bmgridOptions.groupSuppressAutoColumn = true;
    this.bmgridOptions.columnDefs = [
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'goodscode.gn', minWidth: 60, enableRowGroup: true },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'cangku.name', minWidth: 60, enableRowGroup: true },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'guige', minWidth: 300, enableRowGroup: true },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'price', minWidth: 60, enableRowGroup: true,
        valueFormatter: this.settings.valueFormatter2
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'weight', minWidth: 60, enableRowGroup: true,
        valueFormatter: this.settings.valueFormatter3
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'pertprice', minWidth: 60, enableRowGroup: true,
        valueFormatter: this.settings.valueFormatter2
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'jine', minWidth: 60, enableRowGroup: true,
        valueFormatter: this.settings.valueFormatter2
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'length', minWidth: 60, enableRowGroup: true },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'kunbaohao', minWidth: 60, enableRowGroup: true },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'grno', minWidth: 60, enableRowGroup: true },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: '', minWidth: 60, enableRowGroup: true,
        cellRenderer: (params) => {
          return '<a target="_blank">??????</a>';
        },
        onCellClicked: (params) => {
          if (confirm('????????????????????????')) {
            this.qihuoapi.deleteProorderdet(params.data.id).then(data => {
              this.toast.pop('success', '????????????');
              this.getbasematerial();
            })
          }
        }
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????Id', field: 'kucunid', minWidth: 60, enableRowGroup: true },
      { cellStyle: { 'text-align': 'center' }, headerName: 'gcId', field: 'gcid', minWidth: 60, enableRowGroup: true }
    ];
    // ordergridOptions????????????
    this.ordergridOptions = {
      rowSelection: 'multiple',
      groupDefaultExpanded: -1,
      suppressAggFuncInHeader: true,
      enableRangeSelection: true,
      rowDeselection: true,
      overlayLoadingTemplate: this.settings.overlayLoadingTemplate,
      overlayNoRowsTemplate: this.settings.overlayNoRowsTemplate,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      excelStyles: this.settings.excelStyles,
      getContextMenuItems: this.settings.getContextMenuItems, groupSelectsChildren: true, // ???????????????
      getNodeChildDetails: (rowItem) => {
        if (rowItem.group) {
          // console.log('group', rowItem);
          return {
            group: true,
            expanded: rowItem.group === '?????????' || rowItem.group === '??????' || rowItem.group === '?????????' || rowItem.group === '?????????'
              || rowItem.group === '?????????' || rowItem.group === '??????' || rowItem.group === '??????' || rowItem.group === '??????'
              || rowItem.group === '?????????',
            children: rowItem.participants,
            field: 'group',
            key: rowItem.group
          };
        } else {
          return null;
        }
      },

    };
    this.ordergridOptions.onGridReady = this.settings.onGridReady;
    this.ordergridOptions.groupSuppressAutoColumn = true;
    this.ordergridOptions.columnDefs = [
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'group', cellRenderer: 'group',
        width: 90, checkboxSelection: true, headerCheckboxSelection: true,
      },
      // { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'gn',  width: 90,  },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'cangkuname', width: 120 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'guige', width: 300 },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'chukufeetype', width: 110,
        cellRenderer: (params) => {
          if (params.data.chukufeetype == 0) {
            return '??????';
          } else if (params.data.chukufeetype == 1) {
            return '??????';
          } else if (params.data.chukufeetype == 2) {
            return '??????';
          } else {
            return '';
          }
        }
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '???????????????', field: 'chukuprice', width: 70,
        valueFormatter: this.settings.valueFormatter2
      },
      {
        // cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'shijiyunprice', width: 70,
        cellStyle: { 'text-align': 'right' }, headerName: '??????', field: 'yunprice', width: 70,
        valueFormatter: this.settings.valueFormatter2
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '?????????', field: 'price', width: 90,
        valueFormatter: this.settings.valueFormatter2
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '??????', field: 'weight', width: 90,
        valueFormatter: this.settings.valueFormatter3
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '?????????', field: 'pertprice', width: 90, editable: true,
        valueFormatter: this.settings.valueFormatter2
      },
      {
        cellStyle: { 'text-align': 'right' }, headerName: '??????', field: 'jine', width: 90,
        valueFormatter: this.settings.valueFormatter2
      },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'length', width: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'kunbaohao', width: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'grno', width: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????Id', field: 'tihuoid', width: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????Id', field: 'kucunid', width: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: 'gcId', field: 'gcid', width: 90 }

    ];
    this.wuliuOffergridOptions = {
      groupDefaultExpanded: -1,
      suppressAggFuncInHeader: true,
      enableRangeSelection: true,
      rowDeselection: true,
      overlayLoadingTemplate: this.settings.overlayLoadingTemplate,
      overlayNoRowsTemplate: this.settings.overlayNoRowsTemplate,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      excelStyles: this.settings.excelStyles,
      getContextMenuItems: this.settings.getContextMenuItems,
      singleClickEdit: true, // ????????????
      stopEditingWhenGridLosesFocus: true // ????????????????????????
    };
    this.wuliuOffergridOptions.onGridReady = this.settings.onGridReady;
    this.wuliuOffergridOptions.groupSuppressAutoColumn = true;
    this.wuliuOffergridOptions.columnDefs = [
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'transporttype', width: 90,
        valueGetter: (params) => {
          if (params.data.transporttype === 1) {
            return '??????';
          } else if (params.data.transporttype === 2) {
            return '??????';
          } else if (params.data.transporttype === 3) {
            return '??????';
          } else {
            return '';
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'guige', width: 100
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'weight', width: 100
      },
      {
        cellStyle: { 'text-align': 'center' }, colId: 'price', headerName: '????????????', field: 'price', width: 80
      },
      {
        cellStyle: { 'text-align': 'center' }, colId: 'innerprice', headerName: '????????????', field: 'innerprice',
        width: 90, menuTabs: ['filterMenuTab']
      },
      {
        cellStyle: { 'text-align': 'center' }, colId: 'jine', headerName: '????????????', field: 'jine', width: 80
      },
      {
        cellStyle: { 'text-align': 'center' }, colId: 'innerjine', headerName: '????????????', field: 'innerjine', width: 90
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'cangkuname', width: 90
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'startarea', width: 90
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'enddest', width: 90
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'xhlianxiren', width: 90, editable: this.editxhlianxirenable,
        onCellValueChanged: (params) => { this.modifyxhlianxiren(params); }, cellRenderer: (params) => {
          if ((!params.data.xhlianxiren || params.data.xhlianxiren === '') && params.data.isdel !== '???') {
            return '<a>??????</a>';
          } else {
            return params.data.xhlianxiren;
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'xhlianxirenphone', width: 90, editable: this.editxhlianxirenable,
        onCellValueChanged: (params) => { this.modifyxhlianxiren(params); }, cellRenderer: (params) => {
          if ((!params.data.xhlianxirenphone || params.data.xhlianxirenphone === '') && params.data.isdel !== '???') {
            return '<a>??????</a>';
          } else {
            return params.data.xhlianxirenphone;
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '?????????????????????', field: 'isshouhuosign', minWidth: 90,
        valueGetter: (params) => {
          if (params.data) {
            return params.data.isshouhuosign ? '???' : '???';
          } else {
            return null;
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'signuser', width: 70
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '???????????????', field: 'signphone', width: 80
      },
      {
        cellStyle: { 'text-align': 'center' }, colId: 'wlcustomername', headerName: '??????????????????',
        field: 'wlcustomername', width: 180, menuTabs: ['filterMenuTab']
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'feecustomername', width: 120, cellRenderer: () => {
          return '????????????';
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'cdate', width: 120,
        valueGetter: (params) => {
          if (params.data) {
            return this.datepipe.transform(params.data['cdate'], 'y-MM-dd HH:mm');
          }
        }
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????????????????', field: 'fahuodate', width: 100
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'ispieces', width: 70
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'cusername', width: 90
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'notifiername', width: 90
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'wuliuordertype', width: 90
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: '', width: 90, enableRowGroup: true, cellRenderer: data => {
          return '<a target="_blank">??????</a>';
        }, onCellClicked: (data) => {
          /*const obj = { purchaseRequestId: data.data.id };
          this.qihuoapi.sccinquirystatus(obj).then(data1 => {
            let inquiry: any = {};
            if (data1.length) {
              inquiry = data1[0];
            }
            // WAITING_FOR_INQUIRY ????????????????????????????????????????????????
            //  WAITING_FOR_START ??????????????????
            //  INQUIRING ????????????
            //  INQUIRY_FINISHED ???????????????
            if (inquiry.status === 'WAITING_FOR_START') {
              this.toast.pop('warning', '?????????????????????????????????');
              return;
            }
            if (inquiry.status === 'INQUIRING') {
              this.toast.pop('warning', '???????????????????????????');
              return;
            }
            if (inquiry.status === 'INQUIRY_FINISHED') {
              this.toast.pop('warning', '??????????????????????????????');
              return;
            }
          });*/
          const wuliuorderids = [data.data.id];
          if (confirm('????????????????????????')) {
            this.feeApi.zuofei(wuliuorderids).then(() => {
              this.toast.pop('success', '???????????????');
              this.getMyRole();
              this.getqihuomodel();
              this.findqihuodet();
            });
          }
        }
      }
    ];
    this.qihuochangegridOptions = {
      groupDefaultExpanded: -1,
      suppressAggFuncInHeader: true,
      enableRangeSelection: true,
      rowDeselection: true,
      overlayLoadingTemplate: this.settings.overlayLoadingTemplate,
      overlayNoRowsTemplate: this.settings.overlayNoRowsTemplate,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      excelStyles: this.settings.excelStyles,
      getContextMenuItems: this.settings.getContextMenuItems,
    };
    this.qihuochangegridOptions.onGridReady = this.settings.onGridReady;
    this.qihuochangegridOptions.groupSuppressAutoColumn = true;
    this.qihuochangegridOptions.columnDefs = [
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'qihuodetid', width: 90
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'type', width: 100
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'cdate', width: 100
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'describe', width: 120,
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'vusername', width: 110,
        cellRenderer: (params) => this.vuserRenderer(params.data.vusername, params.data.vuserindex)
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'statusname', width: 80
      },
      {
        cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'vdate', width: 90
      }
    ];
  }
  vuserRenderer(val: string, regStr: any): any {
    if (regStr === undefined || regStr === null) { return val; }
    if (!val) { return null; }
    let params: any = '';
    const arr = val.split(',');
    for (let i = 0; i < arr.length; i++) {
      if (regStr === i) {
        arr[i] = `<mark style="color: #1890ff;">` + arr[i] + `</mark>`;
      }
    }
    params = arr.join(',');
    return params;
  }
  ngOnInit() {
    //??????URL???????????????
    this.findzijinmonthrate();
    this.findstoragefee();
    this.tihuoid = this.route.queryParams['value']['tihuoid'];
    this.route.params.subscribe((data) => { this.qihuoid = data['id']; });
    this.getqihuomodel();
    //this.getbasematerial();
    this.findqihuodet();
    this.querydingjin();
    this.queryallocation();
    //this.queryproduct();
    this.getorderdet();
    this.getMyRole();
    setTimeout(() => {
      this.addressparseService.getData();
      this.getunits();
    }, 1000);
    this.getRoles();
  }
  // ???????????????????????????????????????????????????????????????????????????
  getMyRole() {
    const myrole = JSON.parse(localStorage.getItem('myrole'));
    const cuser = JSON.parse(localStorage.getItem('cuser'));
    if (myrole.some(item => item === 10)) {
      this.isSaleman = true;
      this.wuliuOffergridOptions.columnDefs.forEach((colde: ColDef) => {
        if (colde.colId === 'innerprice' || colde.colId === 'wlcustomername' || colde.colId === 'innerjine') {
          colde.hide = true;
          colde.suppressToolPanel = true;
        }
      });
    } else {
      this.isSaleman = false;
    }
    // ???????????????????????????
    this.qihuoapi.wuliuofferdetail(this.qihuoid).then(data => {
      this.wuliuOffergridOptions.api.setRowData(data);
      this.wuluiorderlist = data;
    });
  }
  //???????????????????????????
  findzijinmonthrate() {
    this.classifyapi.getChildrenTree({ pid: 11325 }).then((data) => {
      data.forEach(element => {
        this.zijinmonthrates.push({
          label: element.label,
          value: element.label
        });
      });
    });
  }
  //???????????????????????????
  findstoragefee() {
    this.classifyapi.getChildrenTree({ pid: 11326 }).then((data) => {
      data.forEach(element => {
        this.storagefees.push({
          label: element.label,
          value: element.label
        });
      });
    });
  }
  // ????????????????????????
  showinterestfreeandunitModel(qihuodet, modifyname) {
    setTimeout(() => {
      this.interestfreeAndUnitObj = {
        qihuodetid: qihuodet.id, isinterestfree: qihuodet.isinterestfree,
        interestfreedays: qihuodet.interestfreedays, interestfreereason: qihuodet.interestfreereason, unitname: qihuodet.unitname,
        unitweight: qihuodet.unitweight, unitprice: qihuodet.unitprice, interestfreeOrUnit: modifyname
      };
    }, 0);
    this.interestfreeandunitModel.show();
  }
  interestfreehideDialog() {
    this.interestfreeandunitModel.hide();
  }
  // ??????????????????
  modifyinterestfree() {
    if (this.interestfreeAndUnitObj.interestfreeOrUnit === 'interestfree') {
      if (this.interestfreeAndUnitObj['isinterestfree']) {
        if (this.interestfreeAndUnitObj['interestfreedays'] === undefined || this.interestfreeAndUnitObj['interestfreedays'] === null) {
          this.toast.pop('warning', '??????????????????????????????'); return;
        }
        if (!this.interestfreeAndUnitObj['interestfreereason']) {
          this.toast.pop('warning', '??????????????????????????????'); return;
        }
      }
    } else if (this.interestfreeAndUnitObj.interestfreeOrUnit === 'unit') {
      if (this.interestfreeAndUnitObj['unitname']) {
        if (this.interestfreeAndUnitObj['unitweight'] === undefined || this.interestfreeAndUnitObj['unitweight'] === null
          || this.interestfreeAndUnitObj['unitprice'] === undefined || this.interestfreeAndUnitObj['unitprice'] === null) {
          this.toast.pop('warning', '????????????????????????????????????'); return;
        }
      }
    }
    this.qihuoapi.modifyinterestfree(this.interestfreeAndUnitObj.qihuodetid, this.interestfreeAndUnitObj).then(data => {
      this.toast.pop('success', '????????????');
      this.getqihuomodel();
      this.findqihuodet();
      this.interestfreehideDialog();
    });
  }
  // ?????????????????????????????????
  modifyattr(params, type) {
    if (this.qihuomodel['qihuostatus'] !== 8 && null != params.data.order.vuserid) {
      this.toast.pop('warning', '????????????????????????????????????');
      return;
    }
    if (type === '?????????' && params.newValue === params.oldValue) {
      return;
    }
    if (type === '??????' && params.newValue === params.oldValue) {
      return;
    }
    if (type === '????????????' && params.newValue === params.oldValue) {
      return;
    }
    this.qihuoapi.modifyqihuodet(params.data.id, { type: type, value: params.newValue }).then(data => {
      this.toast.pop('success', '????????????');
      this.getqihuomodel();
      this.findqihuodet();
    }, err => {
      if (type === '?????????') {
        params.node.data.weight = params.oldValue;
        params.node.setData(params.node.data);
      }
      if (type === '??????') {
        params.node.data.beizhu = params.oldValue;
        params.node.setData(params.node.data);
      }
      if (type === '????????????') {
        params.node.data.innerqixian = params.oldValue;
        params.node.setData(params.node.data);
      }
    });
  }

  // ????????????????????????

  editable(params) {
    if (null != params.node.data.order.vuserid) {
      return false;
    } else {
      return true;
    }
  }
  /**??????????????????????????????????????? */
  editxhlianxirenable(params) {
    if (params.node.data.isdel === '???') {
      return false;
    } else {
      return true;
    }
  }
  // ??????????????????????????????????????????
  modifyxhlianxiren(params) {
    if (params.data.isdel === '???') {
      this.toast.pop('warning', '?????????????????????????????????');
      return;
    }
    const obj = {};
    obj['xhlianxirenphone'] = params.data.xhlianxirenphone;
    obj['xhlianxiren'] = params.data.xhlianxiren;
    obj['id'] = params.data.id;
    this.qihuoapi.editxhlianxiren(obj).then(data => {
      this.toast.pop('success', '????????????');
      this.getMyRole();
    });
  }
  //??????orderdet????????????
  getorderdet() {
    this.qihuoapi.findOrderdet(this.qihuoid).then(data => {
      if (data.length > 0) {
        this.qihuoflag['isfinish'] = true;
      }
      console.log('ordergridOptions___+++++___', data);
      // this.ordergridOptions.api.setRowData(data.list);
      this.ordergridOptions.api.setRowData(data);
    })
  }
  //?????????????????????
  getqihuomodel() {
    this.qihuoapi.findqihuo(this.qihuoid).then(data => {
      console.log(111111111111);
      console.log(data);
      console.log(this.suser);

      // console.log(data);
      this.qihuomodel = data.qihuo;
      this.qihuomodel['cpersonname'] = data.wuliuname;
      // this.qihuomodel['guigetype'] = this.qihuomodel['guigetype'] === 0 ? '??????' : '??????';
      // this.qihuomodel['kehutype'] = this.qihuomodel['kehutype'] === 0 ? '????????????' : '?????????';
      this.isbaojia = this.qihuomodel['isnoticecaigou'];
      if (this.qihuomodel['ordertype'] === 1) {
        this.ordertitle = '??????????????????';
        this.qihuodetname = '????????????';
        this.orderdetname = '???????????????';
      } else if (this.qihuomodel['ordertype'] === 9) {
        this.ordertitle = '????????????';
        this.qihuodetname = '????????????';
        this.orderdetname = '???????????????';
      } else if (this.qihuomodel['ordertype'] === 10) {
        this.ordertitle = '??????????????????';
        this.qihuodetname = '????????????';
        this.orderdetname = '???????????????';
      } else if (this.qihuomodel['ordertype'] === 13) {
        this.ordertitle = '????????????';
        this.qihuodetname = '????????????';
        this.orderdetname = '???????????????';
      } else if (this.qihuomodel['ordertype'] === 14) {
        this.ordertitle = '??????????????????';
        this.qihuodetname = '????????????';
        this.orderdetname = '???????????????';
      } else {
        this.ordertitle = '????????????';
        this.qihuodetname = '????????????';
        this.orderdetname = '???????????????';
      }
      if (this.qihuomodel['vuserid']) {
        this.qihuoflag['dingjin'] = false;
        this.qihuoflag['detail'] = false;
      } else {
        this.qihuoflag['dingjin'] = true;
        this.qihuoflag['detail'] = true;
      }
      if (this.qihuomodel['ordertype'] === 2) {
        this.qihuoflag['dingjin'] = false;
      }
      this.userapi.userInfo2().then(data => {
        if (data.id === this.qihuomodel['vuserid']) {
          if (!this.qihuomodel['isv']) {
            this.qihuoflag['isv'] = true;
          } else {
            this.qihuoflag['isv'] = false;
          }
          if (this.qihuomodel['isv']) {
            this.qihuoflag['fisv'] = true;
          } else {
            this.qihuoflag['fisv'] = false;
          }
        }
      })
      if (this.qihuomodel['ordertype'] === 1 || this.qihuomodel['ordertype'] === 10 || this.qihuomodel['ordertype'] === 14) {
        this.qihuoflag['fp'] = true;
      }
      if (this.qihuomodel['vuserid']) {
        this.qihuoflag['issubmit'] = false;
        this.qihuoflag['isdingjinedit'] = true;
      } else {
        this.qihuoflag['issubmit'] = true;
        this.qihuoflag['isdingjinedit'] = false;
      }
      if (this.qihuomodel['sellerid'] === 3786) { // ?????????????????????????????????
        this.isshownoticecaigou = false;
      } else {
        this.isshownoticecaigou = true;
      }
      if (this.qihuomodel['noticecaigouprocessedid'] || this.qihuomodel['noticecaigoudate']) {
        this.qihuoflag['noticecaigou'] = true;
      } else {
        this.qihuoflag['noticecaigou'] = false;
      }
      if (this.qihuomodel['isnoticecaigou']) {
        this.qihuoflag['isnoticerukuapply'] = true;
      }
      if (this.qihuomodel['qihuostatus'] === 3 || this.qihuomodel['qihuostatus'] === 4) {
        this.qihuoflag['isrecall'] = true;
      } else {
        this.qihuoflag['isrecall'] = false;
      }
      // if(this.qihuomodel['zhidaojiagedesc']===0){
      //   this.qihuomodel['zhidaojiagedesc'] = '??????';
      // }else{
      //   this.qihuomodel['zhidaojiagedesc'] = '??????';
      // }
      this.getbasematerial();
      this.queryproduct();
      this.oldyufurate = this.qihuomodel['yufurate'];
      if (this.qihuomodel['addrbakid']) {
        this.songaddress = this.qihuomodel['addrbak']['province'] + this.qihuomodel['addrbak']['city']
          + this.qihuomodel['addrbak']['county'] + this.qihuomodel['addrbak']['detail'];
      } else {
        this.songaddress = '';
      }
      if (this.qihuomodel['qihuostatus'] === 8) {
        this.qihuomodel['typename'] = this.formattype(this.qihuomodel['type']);
      } else {
        this.qihuoflag['qihuochangestatus'] = 0;
      }
      this.isShowInterestfree = this.qihuomodel['ordertype'] === 0 || this.qihuomodel['ordertype'] === 1;
    });
  }
  /**???????????? */
  formattype(type) {
    if (type === 0) {
      return '??????';
    } else if (type === 1) {
      return '??????';
    } else if (type === 2) {
      return '??????';
    }
  }
  modify(params) {
    this.qihuoapi.update(this.qihuomodel['id'], params).then(() => {
      if (this.qihuomodel['qihuostatus'] === 8) {
        this.getqihuomodel();
        setTimeout(() => {
          this.getqihuochangeloglist();
        }, 0);
      } else {
        this.getqihuomodel();
      }
    });
  }
  //??????????????????
  findqihuodet() {
    this.qihuoapi.findQihuodet(this.qihuoid).then(data => {
      // console.log('gridOptions___+++++___', data);
      this.gridOptions.api.setRowData(data);
      this.qihuodetlist = data;
      // ?????????????????????????????????
      setTimeout(() => {
        this.getqihuochangeloglist();
      }, 100);
    });
  }

  //????????????
  qihuodetmodel = {
    id: null,
    gnid: null,
    chandiid: null,
    dinghuoliang: null,
    oneweight: null,
    jiaohuodate: null,
    jiaohuoaddr: null,
    neibujiesuanprice: null,
    saleprice: null,
    houdugongcha: null,
    widthgongcha: null,
    weightgongcha: null,
    classifys: null,
    cangkuid: null,
    chukufeeprice: 0,
    yunfeeprice: 0,
    yunzafeeprice: 0,
    jiagongfeeprice: 0,
    unitname: null,
    isinterestfree: false
  };
  @ViewChild('createqihuodialog') private createqihuodialog: ModalDirective;
  //????????????
  gns: any[];
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
  islindiao: boolean;
  isqihuo: boolean;
  cangkus: Array<any>;
  addqihuodialog() {
    this.createselectNull();
    this.gns = [];
    this.getGnAndChandi();
    this.zhidaoprices = [{ label: '??????????????????', value: null },
    { value: '0', label: '??????' }, { value: '1', label: '??????' }, { value: '2', label: '???????????????' }];
    this.isurgent = [{ label: '??????????????????', value: null }, { label: '???', value: true }, { label: '???', value: false }];
    this.materialtypes = [{ label: '??????????????????', value: null },
    { value: '1', label: '?????????' }, { value: '2', label: '?????????' }];
    // console.log(this.qihuomodel['ordertype']);
    if (this.qihuomodel['ordertype'] === 2) {//????????????????????????????????????????????????
      this.getcangkus();
    }
    this.iscountshow = false;
    this.createqihuodialog.show();
  }
  getcangkus() {
    this.islindiao = true;
    this.cangkus = [];
    this.classifyapi.changkulist().then(data => {
      data.forEach(element => {
        this.cangkus.push({
          label: element.name,
          value: element.id
        });
      });
    });
  }
  chandis: any[];
  isChandi: boolean = false;
  selectedgn(value) {
    this.isChandi = true;
    this.attrs = [];
    this.showGuige = false;
    this.chandis = [];
    value.attrs.forEach(element => {
      this.chandis.push({
        value: element.id,
        label: element.name
      });
    });
  }
  attrs: any[];
  guigelength: number;//???????????????????????????
  showGuige: boolean = false;
  selectedchandi(value) {
    this.attrs = [];
    this.classifyapi.getAttrs(value).then(data => {
      this.guigelength = data['length'];
      this.attrs = data;
    });
    this.showGuige = true;
  }
  gcs: any[] = [];
  selectedguige(event, labelid) {
    for (let i = 0; i < this.gcs.length; i++) {
      if (this.gcs[i]['name'] == labelid) {
        this.gcs.splice(i, 1);
      }
    }
    // ???????????? ???????????????????????????????????????????????????????????????????????????
    if (this.qihuodetmodel['chandiid'] == 8) {
      if (labelid == "painttypeid") {
        if (this.chandis[2].value = 8) {
          this.classifyapi.getAttrs(event['value']).then(data => {
            if (data.length != 0) {
              this.attrs = this.attrs.filter(item => item.name !== 'colorid');
              // this.attrs.push(data[0]);
              this.attrs.splice(3, 0, data[0]);
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

    this.gcs.push({ name: labelid, value: event['value'] });
  }
  qihuodialogcoles() {
    this.createqihuodialog.hide();
    this.one = true;
    this.two = false;
  }
  houdugongchas: any[];
  widthgongchas: any[];
  yongtus: any[];
  oneweights: any[];
  jiaohuoaddrs: any[];
  nextdialog() {
    if (this.gcs.length !== this.guigelength) { this.toast.pop('warning', '??????????????????????????????'); return; }
    this.qihuodetmodel['gnid'] = this.qihuodetmodel['gnid']['id'];
    this.one = false;
    this.two = true;
    if (this.qihuomodel['ordertype'] !== 2) {
      this.isqihuo = true;
    }
    this.houdugongchas = [];
    this.widthgongchas = [];
    this.yongtus = [];
    this.oneweights = [];
    this.jiaohuoaddrs = [];
    this.lines = [];
    this.getunits();
    this.qihuoapi.getchandigongcha().then(data => {
      data.forEach(element => {
        if (element['chandiid'] === this.qihuodetmodel['chandiid']) {
          // console.log("???????????????", element);
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
          // ????????????
          element.attr.jiaohuoaddr.forEach(addr => {
            this.jiaohuoaddrs.push({
              value: addr.value,
              label: addr.value
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

  //??????
  createselectNull() {
    this.chandis = [];
    this.isChandi = false;
    this.attrs = [];
    this.showGuige = false;
    this.gcs = [];
    this.qihuodetmodel = {
      id: null,
      gnid: null,
      chandiid: null,
      dinghuoliang: null,
      oneweight: null,
      jiaohuodate: null,
      jiaohuoaddr: null,
      neibujiesuanprice: null,
      saleprice: null,
      houdugongcha: null,
      widthgongcha: null,
      weightgongcha: null,
      classifys: null,
      cangkuid: null,
      chukufeeprice: 0,
      yunfeeprice: 0,
      yunzafeeprice: 0,
      jiagongfeeprice: 0,
      unitname: null,
      isinterestfree: false
    };
    this.one = true;
    this.two = false;
  }
  create() {
    console.log(this.qihuodetmodel);
    if (!this.qihuodetmodel['beizhu']) { this.toast.pop('warning', '??????????????????????????????'); return; }
    if (!this.qihuodetmodel['houdugongcha']) { this.toast.pop('warning', '??????????????????????????????'); return; }
    if (!this.qihuodetmodel['widthgongcha']) { this.toast.pop('warning', '??????????????????????????????'); return; }
    if (!this.qihuodetmodel['dinghuoliang']) { this.toast.pop('warning', '???????????????????????????'); return; }
    if (!this.qihuodetmodel['oneweight']) { this.toast.pop('warning', '???????????????????????????'); return; }
    if (!this.qihuodetmodel['weightgongcha']) { this.toast.pop('warning', '??????????????????????????????'); return; }
    if (this.qihuomodel['ordertype'] !== 2) {
      if (!this.qihuodetmodel['neibujiesuanprice']) { this.toast.pop('warning', '????????????????????????????????????'); return; }
    }
    if (this.qihuodetmodel['materialtype'] === '1') {
      if (!this.qihuodetmodel['length'] || this.qihuodetmodel['length'] === '') {
        this.toast.pop('warning', '????????????????????????');
        return;
      }
      if (!this.qihuodetmodel['count'] || this.qihuodetmodel['count'] === '') {
        this.toast.pop('warning', '????????????????????????');
        return;
      }
    }
    if (this.qihuodetmodel['isinterestfree']) {
      if (this.qihuodetmodel['interestfreedays'] === undefined || this.qihuodetmodel['interestfreedays'] === null) {
        this.toast.pop('warning', '??????????????????????????????'); return;
      }
      this.qihuodetmodel['interestfreedays'] = Math.round(this.qihuodetmodel['interestfreedays']);
      if (this.qihuodetmodel['interestfreedays'] <= 15) {
        this.toast.pop('warning', '??????????????????????????????15????????????'); return;
      }
      if (!this.qihuodetmodel['interestfreereason']) {
        this.toast.pop('warning', '??????????????????????????????'); return;
      }
    }
    if (!this.qihuodetmodel['saleprice']) { this.toast.pop('warning', '??????????????????????????????'); return; }
    if (!this.qihuodetmodel['jiaohuodate']) { this.toast.pop('warning', '??????????????????????????????'); return; }
    if (!this.qihuodetmodel['jiaohuoaddr']) { this.toast.pop('warning', '??????????????????????????????'); return; }
    if (!this.qihuodetmodel['yongtu']) { this.toast.pop('warning', '????????????????????????'); return; }
    if (!this.qihuodetmodel['zhidaojiagedesc']) { this.toast.pop('warning', '??????????????????????????????'); return; }
    if (this.qihuodetmodel['isurgent'] === undefined) { this.toast.pop('warning', '??????????????????????????????'); return; }
    if (this.qihuodetmodel['unitname']) {
      if (this.qihuodetmodel['unitweight'] === undefined ||
        this.qihuodetmodel['unitweight'] === null ||
        this.qihuodetmodel['unitprice'] === undefined ||
        this.qihuodetmodel['unitprice'] === null) {
        this.toast.pop('warning', '????????????????????????????????????'); return;
      }
    }

    this.qihuodetmodel['jiaohuodate'] ?
      this.qihuodetmodel['jiaohuodate'] = this.datepipe.transform(this.qihuodetmodel['jiaohuodate'], 'y-MM-dd') : '';
    this.qihuodetmodel['classifys'] = this.gcs;
    this.qihuodetmodel['id'] = this.qihuoid;
    this.qihuodetmodel['fees'] = this.lines;
    // console.log('9999999999998888888888999999', this.qihuodetmodel);
    this.qihuoapi.createqihuodet(this.qihuodetmodel).then(() => {
      this.toast.pop('success', '????????????')
      this.qihuodialogcoles();
      /* ??????????????????*/
      this.findqihuodet();
      this.getqihuomodel();
      this.one = true;
      this.two = false;
    });
  }
  //??????????????????
  //????????????
  productmodel = {
    orderid: null,
    qihuodetid: null,
    gnid: null,
    chandiid: null,
    length: null,
    weight: null,
    price: null,
    saleprice: null,
    width: null,
    houduid: null,
    classifys: null
  };
  productselectNull() {
    this.chandis = [];
    this.isChandi = false;
    this.attrs = [];
    this.showGuige = false;
    this.gcs = [];
    this.productmodel = {
      orderid: null,
      qihuodetid: null,
      gnid: null,
      chandiid: null,
      length: null,
      weight: null,
      price: null,
      saleprice: null,
      width: null,
      houduid: null,
      classifys: null
    };
  }
  widths: any[] = [];
  @ViewChild('productdialog') private productdialog: ModalDirective;
  addproductdialog(price, detid, goodscode) {
    this.mdmService.getMdmAttributeDic({ itemcode: goodscode['gncode'] }).then(attrs => {
      for (let index = 0; index < attrs.length; index++) {
        const element = attrs[index];
        if (element['value'] === 'width') {
          this.widths = element['options'];
          break;
        }
      }
    });
    // this.classifyapi.getBrothernode({ classifyid: widthid }).then(data => {
    //   this.widths = [];
    //   data.forEach(element => {
    //     this.widths.push({
    //       value: element.id,
    //       label: element.name
    //     });
    //   })
    // })
    this.productselectNull();
    this.gns = [];
    // this.getGnAndChandi();
    this.productmodel['price'] = price;
    this.productmodel['qihuodetid'] = detid;
    this.productdialog.show();
  }
  closeproductdialog() {
    this.productdialog.hide();
  }
  createproduct() {
    if (!this.productmodel['width']) { this.toast.pop('warning', '????????????????????????'); return; }
    if (!this.productmodel['weight']) { this.toast.pop('warning', '????????????????????????'); return; }
    if (!this.productmodel['price']) { this.toast.pop('warning', '????????????????????????'); return; }
    if (!this.productmodel['saleprice']) { this.toast.pop('warning', '??????????????????????????????'); return; }
    this.productmodel['orderid'] = this.qihuomodel['id'];
    this.qihuoapi.createProduct(this.productmodel).then(() => {
      this.toast.pop('success', '????????????');
      this.closeproductdialog();
      /* ??????????????????*/
      this.queryproduct();
    });
  }
  queryproduct() {
    if (this.qihuoflag['fp']) {
      this.qihuoapi.findProduct(this.qihuoid).then(data => {
        this.pgridOptions.api.setRowData(data);
      })
    }
  }
  //????????????????????????????????????
  getbasematerial() {
    this.qihuoapi.findBasematerial(this.qihuoid).then(data => {
      this.bmgridOptions.api.setRowData(data);
    });
  }
  //??????????????????
  @ViewChild('dingjindialog') private dingjindialog: ModalDirective;
  curyue: any = '0';
  dingjin = { buyerid: null, dingjin: null };
  adddingjindialog() {
    let moneyquery = { buyerid: this.qihuomodel['buyer']['id'], wcustomerid: this.qihuomodel['seller']['id'] };
    this.moneyapi.getmoney(moneyquery).then(data => {
      // console.log('___++++____', data);
      if (!data['wyue']) {
        this.curyue = 0;
      } else {
        this.curyue = data['wyue'];
      }
    });
    this.dingjindialog.show();
  }
  closedingjindialog() {
    this.dingjindialog.hide();
  }
  adddingjin() {
    let model = {
      buyerid: this.qihuomodel['buyer']['id'], wcustomerid: this.qihuomodel['seller']['id'],
      qihuoid: this.qihuomodel['id'], dingjin: this.dingjin['dingjin']
    };
    this.qihuoapi.adddingjin(model).then(() => {
      this.closedingjindialog();
      this.querydingjin();
      this.getqihuomodel();
    })
  }
  //??????????????????????????????
  verifydingjin(dingjinid) {
    if (confirm("???????????????????????????????????????")) {
      console.log(dingjinid + '#' + this.qihuomodel['id']);
      this.qihuoapi.verifydingjin(this.qihuomodel['id'], dingjinid).then(() => {
        this.toast.pop('success', '????????????');
        this.querydingjin();
        this.getqihuomodel();
      })
    }
  }
  //????????????
  @ViewChild('shifangdingjin') private shifangdingjin: ModalDirective;
  shifangdingjindialog() {
    this.shifangdingjin.show();
  }
  closeshifangdialog() {
    this.shifangdingjin.hide();
  }
  shifang() {
    let model = {
      buyerid: this.qihuomodel['buyer']['id'], wcustomerid: this.qihuomodel['seller']['id'],
      qihuoid: this.qihuomodel['id'], dingjin: this.dingjin['dingjin'], releasereason: this.dingjin['releasereason'],
      tihuoid: this.tihuoid
    };
    this.qihuoapi.shifangdingjin(model).then(() => {
      this.closeshifangdialog();
      this.querydingjin();
      this.getqihuomodel();
    })
  }
  querydingjin() {
    this.qihuoapi.finddingjin(this.qihuoid).then(data => {
      data.forEach(element => {
        if (element.hesuanDate) {
          this.hesuanDate = true;
        }
      });
      this.dingjingridOptions.api.setRowData(data);
    })
  }
  //??????????????????????????????????????????????????????????????????
  @ViewChild('submitvuser') private submitvuser: ModalDirective;
  submitvuserdialog() {
    if(!this.qihuomodel['cpersonname'] ){
      this.toast.pop('error', '????????????????????????!');
      return;
   }
    if (this.qihuomodel['ischuliquality'] === null && (this.qihuomodel['ordertype'] == 0 || this.qihuomodel['ordertype'] == 1)) {
      this.toast.pop('warning', '?????????????????????????????????');
      return;
    }
    this.submitvuser.show();
  }
  closesubmitvuserdialog() {
    this.submitvuser.hide();
  }
  qihuopaytype;
  changepaytype(e) {
    console.log(e);
    this.qihuopaytype = e;
    console.log(this.qihuopaytype);
  }
  //???????????????
  submitverify() {
    if (!this.qihuopaytype) {
      this.toast.pop('warning', '?????????????????????');
      return;
    }
    this.closesubmitvuserdialog();
    this.qihuomodel['paytype'] = this.qihuopaytype;
    if (this.qihuomodel['moneytype'] === '??????') { // ?????????????????????????????????????????????0
      if (!this.qihuomodel['dingjin']) {
        this.toast.pop('warning', '?????????????????????');
        return;
      }
    } else {
      if (this.qihuomodel['dingjin'] === null || this.qihuomodel['dingjin'] === undefined) {
        this.toast.pop('warning', '?????????????????????');
        return;
      }
    }
    if (!this.qihuomodel['beizhu']) {
      this.toast.pop('warning', '???????????????????????????????????????????????????');
      return;
    }
    // // ???????????????????????????????????????????????????
    // if (this.qihuomodel['ordertype'] === 9) {
    //   for (let i = 0; i < this.qihuodetlist.length; i++) {
    //     const element = this.qihuodetlist[i];
    //     const count = i + 1;
    //     if (!element['saleprice']) {
    //       this.toast.pop('warning', '???' + count + '???????????????????????????????????????');
    //       return;
    //     }
    //   }
    // }
    let search = { dingjin: null, beizhu: null, qihuoid: null, paytype: null,wuliuid: null };
    search.qihuoid = this.qihuoid;
    search.beizhu = this.qihuomodel['beizhu'];
    search.dingjin = this.qihuomodel['dingjin'];
    search.paytype = this.qihuomodel['paytype'];
    search.wuliuid = this.qihuomodel['wuliuid'];
    console.log(search.wuliuid);
    if (confirm('???????????????????????????')) {
      this.qihuoapi.submitverify(this.qihuoid, search).then(data => {
        this.toast.pop('success', '??????????????????');
        this.qihuoflag['dingjin'] = false;
        this.qihuoflag['detail'] = false;
        this.getqihuomodel();
      });
    }
  }
  //??????
  verifyqihuo() {
    let search = { version: this.qihuomodel['version'] };
    if (confirm("?????????????????????")) {
      this.qihuoapi.verify(this.qihuoid, search).then(data => {
        this.toast.pop('success', '????????????');
        this.getqihuomodel();
      })
    }
  }
  //??????
  removeverify() {
    let search = { version: this.qihuomodel['version'] };
    if (confirm("?????????????????????")) {
      this.qihuoapi.qishen(this.qihuoid, search).then(data => {
        this.toast.pop('success', '????????????');
        this.getqihuomodel();
      })
    }
  }
  //????????????
  noticecaigou() {
    if (confirm('???????????????????????????')) {
      this.qihuoapi.noticeCaigou(this.qihuoid).then(data => {
        this.toast.pop('success', '???????????????');
        this.getqihuomodel();
      })
    }
  }
  //??????????????????
  noticerukuapply() {
    if (this.qihuomodel['qihuostatus'] !== 3) {
      this.toast.pop('warning', '????????????????????????????????????');
      return;
    }
    if (confirm('?????????????????????????????????')) {
      this.qihuoapi.noticerukuapply(this.qihuoid).then(data => {
        this.toast.pop('success', '???????????????');
        this.getqihuomodel();
      });
    }
  }
  //????????????
  kcbsModalRef: BsModalRef;
  qihuodetid: number;
  impkucundialog(qihuodetid) {
    //??????kucun????????????
    this.qihuodetid = qihuodetid;
    this.modalService.config.class = 'modal-all';
    this.kcbsModalRef = this.modalService.show(KucundetimportComponent);
    //this.kcbsModalRef.content.qihuodetid = qihuodetid;
    this.kcbsModalRef.content.componentparent = this;
    // console.log('??????????????????');
  }
  //??????
  imp(ids) {
    this.qihuoapi.impkucun(this.qihuodetid, { kucunids: ids }).then(data => {
      this.kcbsModalRef.hide();
      this.getorderdet();
    })
  }
  //????????????
  print() {
    this.qihuoapi.print(this.qihuoid).then(data => {
      if (!data['flag']) {
        this.toast.pop('warning', data['msg']);
      } else {
        window.open(data['msg']);
      }
    })
  }
  //??????pdf
  makepdf() {
    this.qihuoapi.makepdf(this.qihuoid).then(data => {
      this.toast.pop('success', data.msg);
    });
  }
  /**??????mdm???????????? */
  showdetmodify(oldvalueid, data) {
    if (!oldvalueid) { return; }
    if (this.qihuomodel['qihuostatus'] === 8 && (this.qihuoflag['qihuochangestatus'] === 2 || this.qihuoflag['isruku'])) { return; }
    if (this.qihuomodel['qihuostatus'] !== 8 && null != this.qihuomodel['vuserid']) {
      this.toast.pop('warning', '?????????????????????????????????');
      return;
    }
    this.zhidaoprices = [{ label: '??????????????????', value: null },
    { value: '0', label: '??????' }, { value: '1', label: '??????' }, { value: '2', label: '???????????????' }];
    this.isurgent = [{ label: '??????????????????', value: null }, { label: '???', value: true }, { label: '???', value: false }];
    this.materialtypes = [{ label: '??????????????????', value: null },
    { value: '1', label: '?????????' }, { value: '2', label: '?????????' }];
    if (this.qihuomodel['ordertype'] === 2) {// ????????????????????????????????????????????????
      this.getcangkus();
    }
    this.iscountshow = false;
    this.goodscode = { gn: data['goodscode']['gn'] };
    this.mdmService.getMdmAttributeDic({ itemcode: data['goodscode']['gncode'] }).then(data1 => {
      this.showGuige = true;
      this.attrs = data1;
      this.attrs.forEach(element => {
        if (element['iscas']) {
            const options = element['options'];
            for (let index = 0; index < options.length; index++) {
                const ele = options[index];
                if (data['goodscode'][element['value']] === ele['value']) {
                    this.mdmService.getmdmclassifychild(ele['id']).then(children => {
                        for (let i = 0; i < children.length; i++) {
                          const child = children[i];
                          for (let j = 0; j < this.attrs.length; j++) {
                            const attr = this.attrs[j];
                            if (child['mdmvalue'] === attr['mdmvalue']) {
                              attr['options'] = child['options'];
                              break;
                            }
                          }
                        }
                    });
                    break;
                }
            }
        }
      });
      this.goodscode = data['goodscode'];
      if (this.qihuomodel['qihuostatus'] === 8) {
        for (const key in this.goodscode) {
          if (Object.prototype.hasOwnProperty.call(this.goodscode, key)) {
            if (this.goodscode[key] !== undefined && this.goodscode[key] !== null) {
              this.goodscode[key] = (this.goodscode[key] + '').split('->')[0];
            }
          }
        }
      }
    });
    this.editflag.zhidan = true;
    if (this.qihuomodel['qihuostatus'] === 8 && this.qihuoflag['qihuochangestatus'] === 1 && !this.qihuoflag['isruku']) {
      this.editflag.iseditguige = true;
    } else {
      this.editflag.iseditguige = false;
    }
    this.editTempParam.detdata = data;
    this.one = true;
    this.two = false;
    this.createmdmqihuodialog.show();
  }
  //????????????????????????????????????
  values = [];
  newattrid: number;
  modifygcqihuodetid: number;
  attrname: any;
  @ViewChild('gcmodify') private gcmodify: ModalDirective;
  showgcmodify(oldvalueid, qihuodetid) {
    if (!oldvalueid) { return; }
    if (this.qihuomodel['qihuostatus'] === 8 && (this.qihuoflag['qihuochangestatus'] === 2 || this.qihuoflag['isruku'])) { return; }
    if (this.qihuomodel['qihuostatus'] !== 8 && null != this.qihuomodel['vuserid']) {
      this.toast.pop('warning', '?????????????????????????????????');
      return;
    }
    this.values = [];
    this.newattrid = null;
    this.modifygcqihuodetid = null;
    this.modifygcqihuodetid = qihuodetid;
    let model = { classifyid: oldvalueid };
    this.classifyapi.getParentNode(oldvalueid).then(data => {
      this.attrname = data['value'];
    })
    this.classifyapi.getBrothernode(model).then(data => {
      this.values = [];
      data.forEach(element => {
        this.values.push({
          value: element.id,
          label: element.name
        });
      });
    })
    this.gcmodify.show();
  }
  closegcmodify() {
    this.gcmodify.hide();
  }
  modifygc() {
    let model = { name: this.attrname, value: this.newattrid };
    this.qihuoapi.modifygc(this.modifygcqihuodetid, model).then(data => {
      this.closegcmodify();
      this.toast.pop('success', '????????????');
      this.findqihuodet();
    });
  }
  /**??????????????????,?????????????????? */
  getqihuochangeloglist() {
    this.qihuoapi.getqihuochangeloglist(this.qihuoid).then(res => {
      const data = res['list'];
      this.qihuoflag['isruku'] = res['isruku'];
      if (res['isqihuochange'] &&
        (this.qihuomodel['qihuostatus'] === 5 || this.qihuomodel['qihuostatus'] === 6 || this.qihuomodel['qihuostatus'] === 8)) {
        this.qihuoflag['isorderchange'] = true;
      } else {
        this.qihuoflag['isorderchange'] = false;
      }
      if (data.length && ((this.qihuoflag['qihuochangestatus'] === 0 || this.qihuoflag['qihuochangestatus'] === 1)
        && this.qihuomodel['qihuostatus'] === 8)) {
        const validData = data.filter(ele => ele['status'] !== 3 && ele['status'] !== 4);
        this.validQihuochangedet = validData;
        this.qihuodetchange(validData);
        if (validData.length) {
          // ??????????????????????????????????????? qihuoflag['qihuochangestatus']: 0 // ?????????????????????0:?????????;1:?????????;2:?????????
          if (validData.some(ele => ele['status'] === 1)) {
            this.qihuoflag['qihuochangestatus'] = 1;
          } else if (validData.some(ele => ele['status'] === 2)) {
            this.qihuoflag['qihuochangestatus'] = 2;
          }
          if (this.qihuoflag['qihuochangestatus'] === 2) {
            this.qihuoflag['isorderchange'] = false;
          }
        } else {
          if (this.qihuomodel['qihuostatus'] === 8) {
            this.qihuoflag['qihuochangestatus'] = 1;
          }
        }
      } else if (!data.length) {
        if (this.qihuomodel['qihuostatus'] === 8) {
          this.qihuoflag['qihuochangestatus'] = 1;
          this.validQihuochangedet = [];
        }
      }
      this.qihuochangegridOptions.api.setRowData(data);
    });
  }
  /**?????????????????? */
  qihuodetchange(changeloglist: any[]) {
    for (let i = 0; i < changeloglist.length; i++) {
      const ele = changeloglist[i];
      if (ele['qihuodetid']) { // ??????
        for (let j = 0; j < this.qihuodetlist.length; j++) {
          const qihuodet = this.qihuodetlist[j];
          if (qihuodet['id'] === ele['qihuodetid']) {
            if (ele['type'] === '????????????') {
              for (const key in ele['goodscode']) {
                if (Object.prototype.hasOwnProperty.call(ele['goodscode'], key)) {
                  const propervalue = ele['goodscode'][key];
                  qihuodet['goodscode'][key] = propervalue;
                }
              }
            }
            if (ele['type'] === '??????????????????') {
              qihuodet['saleprice'] = ele['saleprice'];
            }
            if (ele['type'] === '????????????????????????') {
              qihuodet['neibujiesuanprice'] = ele['neibujiesuanprice'];
            }
            if (ele['type'] === '???????????????') {
              qihuodet['weight'] = ele['weight'];
            }
            if (ele['type'] === '??????????????????') {
              qihuodet['beizhu'] = ele['xiadanbeizhu'];
            }
            if (ele['type'] === '??????????????????') {
              qihuodet['innerqixian'] = ele['innerqixian'];

            }
          }
        }
      } else { // ??????
        if (ele['type'] === '????????????') {
          this.qihuomodel['buyer']['name'] = ele['buyername'];
        }
        if (ele['type'] === '??????????????????') {
          this.qihuomodel['typename'] = ele['typename'];
        }
        if (ele['type'] === '??????????????????') {
          this.songaddress = ele['addrname'];
        }
      }
    }
    this.gridOptions.api.setRowData(this.qihuodetlist);
  }
  finishqihuo(qihuoid) {
    console.log(qihuoid);
    if (confirm('???????????????????????????????????????????????????????????????????????????????????????')) {
      this.qihuoapi.finishqihuo(qihuoid, null).then(data => {
        this.toast.pop('success', '?????????????????????????????????');
        this.getqihuomodel();
        this.findqihuodet();
      })
    }

  }
  //??????????????????
  @ViewChild('mainmodifydialog') private mainmodifydialog: ModalDirective;
  //????????????
  innercompany(event) {
    this.editqihuo['sellerid'] = event;
  }
  buyer: any = {};
  openmodifymain() {
    this.editqihuo = JSON.parse(JSON.stringify(this.qihuomodel));
    this.editqihuo['jiaohuoqixian'] = new Date(this.editqihuo['jiaohuoqixian']);
    this.editqihuo['shengxiaodate'] = new Date(this.editqihuo['shengxiaodate']);
    this.findAddr(this.editqihuo['buyerid'], true);
    this.buyer = {};
    this.editqihuobuyerid = this.editqihuo['buyerid'];
    this.mainmodifydialog.show();
  }
  closemaindialog() {
    this.mainmodifydialog.hide();
  }
  modifymain() {
    if ((this.buyer instanceof Object) && this.buyer['code']) {
      this.editqihuo['buyerid'] = this.buyer['code'];
    }
    if (this.editqihuo['type'] === 1 && !this.editqihuo['addrid']) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    this.editqihuo['addrbak']['addrid'] = this.editqihuo['addrid'];
    if (this.editqihuo['type'] !== 1) {
      this.editqihuo['addrbak']['addrid'] = null;
    }
    this.editqihuo['jiaohuoqixian'] = this.datepipe.transform(this.editqihuo['jiaohuoqixian'], 'y-MM-dd');
    this.editqihuo['shengxiaodate'] = this.datepipe.transform(this.editqihuo['shengxiaodate'], 'y-MM-dd');
    if (confirm('?????????????????????')) {
      this.modify(this.editqihuo);
      this.closemaindialog();
    }
  }
  //????????????
  feeadddialogshow() {
    this.feeHeji = 0;
    this.feemodel = { feetype: null, price: null, beizhu: null };
    this.feeadddialog.show();
  }
  feeadddialogclose() { this.feeadddialog.hide(); }
  insertline() {//??????
    if (!this.feemodel['feetype']) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    if (!this.feemodel['price'] && 'number' === typeof this.feemodel['price']) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    this.feeHeji = this.feeHeji['add'](this.feemodel['price']);
    this.lines.push(
      {
        id: new Date().getTime(),
        feetype: this.feemodel['feetype'],
        feeprice: this.feemodel['price'],
        beizhu: this.feemodel['beizhu']
      }
    )
    this.feemodel = { feetype: null, price: null, beizhu: null };
    this.isshowInput = !this.isshowInput;
  }
  delorderfee(index, feeprice) {
    this.lines.splice(index, 1);
    this.feeHeji = this.feeHeji['sub'](feeprice);
  }
  modifychukufee() {
    if (!isNaN(this.chukufeetypess['value'])) {
      this.chukufeetypess['type'] = this.chukufeetypess['value'];
      this.chukufeetypess['gn'] = this.params['data'].gn;
      this.chukufeetypess['cangkuid'] = this.params['data'].cangkuid;
      this.chukufeetypess['chandiid'] = this.params['data'].chandiid;
      this.chukufeetypess['gcid'] = this.params['data'].gcid;
      this.chukufeetypess['orderid'] = this.qihuoid;
      this.qihuoapi.getchukufeetype(this.chukufeetypess).then(() => {
        this.getorderdet();
        this.toast.pop('success', '????????????');
        this.ckfeetypehideDialog();
      });
    }
  }
  ckfeetypehideDialog() {
    this.ckfeetype.hide();
  }
  ckfeetypeshowDialog() {
    this.ckfeetype.show();
  }
  //??????????????????????????????????????????
  salepricemodel: any = { neibujiesuanprice: null, saleprice: null };
  @ViewChild('salepriceandfeemodifydialog') private salepriceandfeemodifydialog: ModalDirective;
  //?????? 
  salepriceandfeemodifydialogshow(qihuodetid, saleprice, neibujiesuanprice) {
    if (this.qihuoflag['qihuochangestatus'] === 2) { return; }
    this.qihuodetid = null;
    this.diyfeeHeji = 0;
    this.salepricemodel = { neibujiesuanprice: null, saleprice: null };
    if (this.qihuomodel['qihuostatus'] === 8) {
      if (saleprice !== undefined && saleprice !== null) {
        saleprice = (saleprice + '').split('->')[0];
      }
      if (neibujiesuanprice !== undefined && neibujiesuanprice !== null) {
        neibujiesuanprice = (neibujiesuanprice + '').split('->')[0];
      }
    }
    this.salepricemodel['saleprice'] = saleprice;
    this.salepricemodel['neibujiesuanprice'] = neibujiesuanprice;
    this.qihuodetid = qihuodetid;
    this.findyugufee(qihuodetid);//??????qihuodetid??????????????????
    this.salepriceandfeemodifydialog.show();
  }
  salepriceanfeemodifydialogclose() { this.salepriceandfeemodifydialog.hide(); }
  addyugufeetodb() {
    if (!this.feemodel['feetype']) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    if (!this.feemodel['price'] && 'number' === typeof this.feemodel['price']) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    this.feemodel['qihuodetid'] = this.qihuodetid;
    console.log(this.feemodel);
    if (confirm("??????????????????????????????")) {
      this.qihuoapi.addfeeinqihuo(this.feemodel).then(data => {
        this.toast.pop('success', '????????????!');
        this.findyugufee(this.qihuodetid);
        this.diyfeeHeji = this.diyfeeHeji['add'](this.feemodel['price']);
        this.findqihuodet();
        this.feemodel = {
          feetype: null, price: null, beizhu: null
        };
      })
    }

  }
  modifysaleprice() {
    if (!this.salepricemodel['saleprice']) {
      this.toast.pop('warning', '?????????????????????');
      return;
    }
    if (!this.salepricemodel['neibujiesuanprice']) {
      this.toast.pop('warning', '??????????????????????????????');
      return;
    }
    if (confirm("????????????????????????????????????????????????")) {
      this.qihuoapi.modifyprice(this.qihuodetid, this.salepricemodel).then(data => {
        this.findqihuodet();
        this.getqihuomodel();
        this.salepriceanfeemodifydialogclose();
      });
    }
  }
  delorderfeeindb(orderfeedetid, feeprice) {
    if (confirm('????????????????????????')) {
      this.qihuoapi.delorderfee(orderfeedetid, this.qihuodetid).then(data => {
        this.findyugufee(this.qihuodetid);
        this.diyfeeHeji = this.diyfeeHeji['sub'](feeprice);
        this.findqihuodet();
        this.getqihuomodel();
      })
    }
  }
  //??????qihuodetid??????????????????
  findyugufee(qihuodetid) {
    this.qihuoapi.findYugufees(qihuodetid).then(data => {
      this.diyfeeHeji = 0;
      this.lines = data;
      this.lines.forEach(e => {
        this.diyfeeHeji = this.diyfeeHeji['add'](e.feeprice);
      })
    })
  }
  //??????????????????
  suser;
  isuser;
  wuliuidselect(user) {
    this.isuser = user;
    this.showwuliuid();
  }
  @ViewChild('wuliuid') private wuliuid: ModalDirective;

  showwuliuid() {
    this.wuliuid.show();
  }
  hidewuliuid() {
    this.wuliuid.hide();
    this.suser = null;
  }
  hidewuliuidqd() {
    if (this.isuser === 'cperson') {

      if (this.suser) {
        if (typeof (this.suser) === 'object') {
          this.qihuomodel['cpersonname'] = this.suser['name'];
          this.qihuomodel['wuliuid'] = this.suser['code'];
        } else if (typeof (this.suser) === 'string') {
          this.qihuomodel['wuliuid'] = '';
          this.toast.pop('warning', '?????????????????????????????????????????????');
        }
      } else {
        this.qihuomodel['wuliuid'] = '';
      }
    }
    this.modify(this.qihuomodel);
    this.hidewuliuid();
  }


  // ?????????????????????
  showInput() {
    this.isshowInput = !this.isshowInput;
  }
  hesuandingjin() {
    if (confirm('?????????????????????????????????????????????')) {
      this.qihuoapi.hesuandingjin(this.qihuoid).then(data => {
        this.toast.pop('success', '???????????????');
        this.querydingjin();
      });
    }
  }
  // ??????????????????
  contractUploader() {
    this.uploaderModel.show();
  }
  //???????????????????????????
  uploadParam: any = { module: 'qihuo', count: 1, sizemax: 5, extensions: ['doc', 'pdf', 'jpeg', 'png', 'jpg'] };
  // ?????????????????????
  accept = null;// ".xls, application/xls";
  // ?????????????????????????????????
  upcontract($event) {
    console.log($event);
    const model = { qihuoid: this.qihuoid, url: $event.url };
    if ($event.length !== 0) {
      this.qihuoapi.uploadcontract(model).then(data => {
        this.toast.pop('success', '???????????????');
      });
    }
    this.hideDialog();
  }
  // ??????????????????
  hideDialog() {
    this.uploaderModel.hide();
  }
  lookContract() {
    this.qihuoapi.lookContract(this.qihuoid).then(data => {
      console.log(data);
      if (!data['flag']) {
        this.toast.pop('warning', data['msg']);
      } else {
        window.open(data['msg']);
      }
    });
  }
  cancelnoticecaigou() {
    if (confirm('????????????????????????????????????')) {
      this.qihuoapi.cancelnoticecaigou(this.qihuoid).then(data => {
        this.getqihuomodel();
        this.toast.pop('success', '???????????????');
      });
    }
  }
  showzuofei() {
    this.zuofeiModel.show();
  }
  zuofeiclose() {
    this.zuofeiModel.hide();
  }
  zuofeiorder() {
    console.log(this.qihuomodel['zuifeireason']);
    if (confirm('????????????????????????')) {
      this.qihuoapi.zuofeiOrder(this.qihuoid, this.qihuomodel['zuofeireason']).then(data => {
        this.getqihuomodel();
        this.toast.pop('success', '???????????????');
        this.zuofeiclose();
      });
    }
  }
  //????????????
  allocation = { buyerid: null, dingjin: null };
  addallocationdialog() {
    let moneyquery = { buyerid: this.qihuomodel['buyer']['id'], wcustomerid: this.qihuomodel['seller']['id'] };
    this.moneyapi.getmoney(moneyquery).then(data => {
      if (!data['wyue']) {
        this.curyue = 0;
      } else {
        this.curyue = data['wyue'];
      }
    });
    this.allocationModel.show();
  }
  closeallocationdialog() {
    this.allocationModel.hide();
  }
  addallocation() {
    let model = {
      buyerid: this.qihuomodel['buyer']['id'],
      wcustomerid: this.qihuomodel['seller']['id'],
      qihuoid: this.qihuomodel['id'],
      jine: this.allocation['jine']
    };
    this.qihuoapi.addAllocation(model).then(() => {
      this.toast.pop('success', '????????????');
      this.closeallocationdialog();
      this.queryallocation();
      this.getqihuomodel();
    });
  }

  //??????????????????????????????
  verifyAllocation(allocationid) {
    if (confirm('???????????????????????????????????????')) {
      this.qihuoapi.verifyAllocation(this.qihuomodel['id'], allocationid).then(() => {
        this.toast.pop('success', '????????????');
        this.queryallocation();
        this.getqihuomodel();
      })
    }
  }
  shifangallocationdialog() {
    this.shifangallocationModel.show();
  }
  closeshifangallocationdialog() {
    this.shifangallocationModel.hide();
  }
  shifangAllocation() {
    let model = {
      buyerid: this.qihuomodel['buyer']['id'], wcustomerid: this.qihuomodel['seller']['id'],
      qihuoid: this.qihuomodel['id'], jine: this.allocation['jine']
    };
    this.qihuoapi.shifangAllocation(model).then(() => {
      this.closeshifangallocationdialog();
      this.queryallocation();
      this.getqihuomodel();
    })
  }
  queryallocation() {
    this.qihuoapi.findAllocation(this.qihuoid).then(data => {
      this.allocationgridOptions.api.setRowData(data);
    })
  }
  // ???????????????
  selectedtype(typevalue) {
    if (typevalue === '1') {
      this.iscountshow = true;
    } else {
      this.iscountshow = false;
      delete this.qihuodetmodel['count'];
      delete this.qihuodetmodel['length'];
    }
  }
  /**
   * ????????????
   */
  getContactProject() {
    this.modalService.config.class = 'modal-all';
    this.kcbsModalRef = this.modalService.show(ContactprojectComponent);
    this.kcbsModalRef.content.componentparent = this;
  }
  // ??????????????????
  calcyufurate() {
    if (this.qihuomodel['dingjin'] !== null && this.qihuomodel['dingjin'] !== undefined) {
      let result = parseFloat(this.qihuomodel['dingjin']);
      result = Math.round(this.qihuomodel['dingjin'] * 100) / 100;
      this.qihuomodel['dingjin'] = result;
      this.qihuomodel['yufurate'] = this.GetPercent(this.qihuomodel['dingjin'], this.qihuomodel['tjine']);
      this.oldyufurate = this.qihuomodel['yufurate'];
      this.modify(this.qihuomodel);
    }
  }
  // ??????????????????
  calcdingjin() {
    if (this.oldyufurate !== null && this.oldyufurate !== undefined) {
      if (this.oldyufurate.indexOf('%') !== -1) {
        this.oldyufurate = this.oldyufurate.replace('%', '');
      }
      if (isNaN(this.oldyufurate)) {
        alert('??????????????????????????????????????????');
        this.oldyufurate = this.qihuomodel['yufurate'];
        return false;
      }
      this.qihuomodel['yufurate'] = this.NumberCheck(this.oldyufurate);
      this.qihuomodel['dingjin'] = (Number(this.qihuomodel['tjine']) * this.toPoint(this.qihuomodel['yufurate']));
      let result = parseFloat(this.qihuomodel['dingjin']);
      result = Math.round(this.qihuomodel['dingjin'] * 100) / 100;
      this.qihuomodel['dingjin'] = result;
      this.oldyufurate = this.qihuomodel['yufurate'];
      this.modify(this.qihuomodel);
    }
  }
  /**??????????????? */
  NumberCheck(num) {
    let str = num;
    const len1 = str.substr(0, 1);
    const len2 = str.substr(1, 1);
    // ??????????????????0???????????????????????????????????????????????????
    if (str.length > 1 && len1 === 0 && len2 !== '.') {
      str = str.substr(1, 1);
    }
    // ???????????????.???????????????0
    if (len1 === '.') {
      str = '0' + str;
    }
    console.log(str);
    // ?????????????????????????????????
    if (str.indexOf('.') !== -1) {
      const str_ = str.substr(str.indexOf('.') + 1);
      if (str_.indexOf('.') !== -1) {
        str = str.substr(0, str.indexOf('.') + str_.indexOf('.') + 1);
      }
    }
    // ?????????????????????????????????????????????????????????
    let result = parseFloat(str);
    result = Math.round(str * 100) / 100;
    return result + '%';
  }
  /**
   * ?????????
   * @param num ?????????
   * @param total ??????
   */
  GetPercent(num, total) {
    /// <summary>
    /// ????????????
    /// </summary>
    /// <param name="num">?????????</param>
    /// <param name="total">??????</param>
    num = parseFloat(num);
    total = parseFloat(total);
    if (isNaN(num) || isNaN(total)) {
      return '0';
    }
    return total <= 0 ? '0%' : ((num / total * 10000) / 100.00).toFixed(2) + '%';
  }
  /**?????????????????? */
  toPoint(percent) {
    let str = percent.replace('%', '');
    str = str / 100;
    return str;
  }
  // ?????????????????????
  showaddr(event) {
    console.log(event);
    if (!event['code']) {
      return;
    }
    this.editqihuobuyerid = event['code'];
    this.findAddr(event['code'], false);
  }
  // ?????????????????????????????????
  findAddr(customerid, flag) {
    this.addrs = [];
    if (customerid && this.editqihuo['type'] === 1) {// ??????????????????????????????????????????
      this.addrs = [{ value: '', label: '???????????????' }];
      this.userapi.findAddr(customerid).then((data) => {
        data.forEach((element) => {
          this.addrs.push({
            value: element['id'],
            label: element['province'] + element['city'] + element['county'] + element['detail']
          });
        });
        if (flag) {
          if (this.editqihuo['addrbakid']) {
            this.editqihuo['addrid'] = this.editqihuo['addrbak']['addrid'];
          }
        }
      });
    }
  }
  // ????????????
  // ??????????????????????????????
  @ViewChild('addrdialog') private addrdialog: ModalDirective;
  addr = {};
  provinces = [];
  citys = [];
  countys = [];
  // ?????????????????????
  addAddrDialog() {
    if (this.editqihuo['type'] === 0) {
      this.toast.pop('warning', '?????????????????????????????????^~^');
      return '';
    }
    if (!this.editqihuo['buyerid']) {
      this.toast.pop('warning', '?????????????????????');
      return;
    }
    this.addr = {};
    this.provinces = [];
    this.citys = [];
    this.countys = [];
    this.addr['detail'] = this.editqihuo['addrbak']['detail'];
    this.addr['lianxiren'] = this.editqihuo['addrbak']['lianxiren'];
    this.addr['phone'] = this.editqihuo['addrbak']['phone'];
    this.addrdialog.show();
    this.getProvince();
  }

  getProvince() {
    this.classifyapi.getChildrenTree({ pid: 263 }).then((data) => {
      data.forEach(element => {
        this.provinces.push({
          label: element.label,
          value: element.id
        });
      });
      this.citys = [];
      this.countys = [];
    });
  }

  getcity() {
    this.citys = [];
    this.classifyapi.getChildrenTree({ pid: this.addr['provinceid'] }).then((data) => {
      data.forEach(element => {
        this.citys.push({
          label: element.label,
          value: element.id
        });
      });
      this.countys = [];
    });
  }

  getcounty() {
    this.countys = [];
    this.classifyapi.getChildrenTree({ pid: this.addr['cityid'] }).then((data) => {
      data.forEach(element => {
        this.countys.push({
          label: element.label,
          value: element.id
        });
      });
    });
  }
  getAddr() {
    this.findAddr(this.editqihuobuyerid, false);
  }
  searchplace(e) {
    console.log(e.query);
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
  // ?????????????????????????????????
  addAddr() {
    // if (!this.addr['provinceid']) {
    //   this.toast.pop('warning', '?????????????????????');
    //   return '';
    // }
    // if (!this.addr['cityid']) {
    //   this.toast.pop('warning', '?????????????????????');
    //   return '';
    // }
    // if (!this.addr['countyid']) {
    //   this.toast.pop('warning', '???????????????????????????');
    //   return '';
    // }
    if (!this.addr['detail']) {
      this.toast.pop('warning', '??????????????????????????????');
      return '';
    }
    this.addr['customerid'] = this.editqihuo['buyerid'];
    this.businessOrderApi.createAddr(this.addr).then((data) => {
      this.addrdialogclose();
      this.findAddr(this.addr['customerid'], false);
    });
  }
  addrdialogclose() {
    this.addrdialog.hide();
  }

  // ??????????????????
  destList = [];
  /**
   * ????????????????????????????????????
   */
  selectedenddest(destination) {
    if (destination) {
      const addressObj = this.addressparseService.parsingAddress(destination);
      this.citys = []; this.countys = [];
      this.wuliunotice['provinceid'] = '';
      this.wuliunotice['cityid'] = '';
      this.wuliunotice['countyid'] = '';
      if (addressObj['provinceValue']) {
        if (this.provinces.length) {
          this.wuliunotice['provinceid'] = addressObj['provinceValue'];
          this.getpcc(this.wuliunotice['provinceid'], this.citys).then(cityData => {
            if (addressObj['cityValue']) {
              if (cityData.length) {
                this.wuliunotice['cityid'] = addressObj['cityValue'];
                this.getpcc(this.wuliunotice['cityid'], this.countys).then(countyData => {
                  if (addressObj['countyValue']) {
                    if (countyData.length) {
                      if (countyData.some(d => d['value'] === addressObj['countyValue'])) {
                        this.wuliunotice['countyid'] = addressObj['countyValue'];
                      }
                    }
                  }
                });
              }
            }
          });
        }
      }
    }
  }
  getpcc(pid, pccname: any[]) {
    return new Promise((resolve: (data) => void) => {
      this.classifyapi.getChildrenTree({ pid: pid }).then((data) => {
        data.forEach(element => {
          pccname.push({
            label: element.label,
            value: element.id + ''
          });
        });
        resolve(pccname);
      });
    });
  }
  getcity2() {
    this.citys = [];
    delete this.wuliunotice['cityid'];
    delete this.wuliunotice['countyid'];
    this.classifyapi.getChildrenTree({ pid: this.wuliunotice['provinceid'] }).then((data) => {
      data.forEach(element => {
        this.citys.push({
          label: element.label,
          value: element.id
        });
      });
      this.countys = [];
    });
  }

  getcounty2() {
    this.countys = [];
    delete this.wuliunotice['countyid'];
    this.classifyapi.getChildrenTree({ pid: this.wuliunotice['cityid'] }).then((data) => {
      data.forEach(element => {
        this.countys.push({
          label: element.label,
          value: element.id
        });
      });
    });
  }
  // ????????????????????????????????????
  cuser = {};
  wuliunotice: any = {
    enddest: '', id: null, wuliuuserid: null,
    transporttype: null
  };
  selectQihuodetWuliubaojia: any = [];
  /**????????????????????? */
  shownoticewuliuyuan() {
    if (!this.qihuomodel['isnoticecaigou'] && this.qihuomodel['ordertype'] !== 13 && this.qihuomodel['ordertype'] !== 14) {
      this.toast.pop('warning', '???????????????????????????');
      return;
    }
    if ((this.qihuomodel['ordertype'] !== 13 || this.qihuomodel['ordertype'] !== 14) && !this.qihuomodel['isv']) {
      this.toast.pop('warning', '???????????????????????????????????????????????????');
      return;
    }
    if (this.qihuomodel['type'] !== 1) {
      this.toast.pop('warning', '???????????????????????????????????????????????????????????????');
      return;
    }
    const qihuodetids = [];
    this.selectQihuodetWuliubaojia = [];
    const orderdetSelected = this.gridOptions.api.getModel()['rowsToDisplay']; // ??????????????????????????????
    for (let i = 0; i < orderdetSelected.length; i++) {
      if (orderdetSelected[i].data && orderdetSelected[i].selected) {
        qihuodetids.push(orderdetSelected[i].data.id);
        this.selectQihuodetWuliubaojia.push({
          id: orderdetSelected[i].data.id,
          guige: orderdetSelected[i].data['goodscode']['guige'],
          weight: orderdetSelected[i].data['weight'],
          baojialiang: orderdetSelected[i].data['weight'],
          sumyibaojia: orderdetSelected[i].data['ybaojiaweight'] || 0
        });
      }
    }
    if (qihuodetids.length < 1) {
      this.toast.pop('warning', '?????????????????????????????????????????????');
      return;
    }
    this.modalService1.config.class = 'modal-lg';
    // ?????????????????????????????????
    this.noticewuliuparams = { qihuodets: this.selectQihuodetWuliubaojia, id: this.qihuomodel['id'], detids: qihuodetids };
    this.bsModalRef = this.modalService1.show(NoticewuliuyuanComponent);
    this.bsModalRef.content.parentThis = this;
  }
  wuliunoticehide() {
    this.bsModalRef.hide();
    this.getqihuomodel();
    this.findqihuodet();
    this.getMyRole();
    this.tabviewindex = 5;
  }
  handleChange(event) {
    this.tabviewindex = event.index;
  }

  // ???????????????
  getZhibaoUrl() {
    this.qihuoapi.getZhibaoUrl(this.qihuoid).then(data => {
      this.singleData = data;
      if (!this.singleData || !this.singleData.length) {
        this.toast.pop('warning', '?????????????????????!');
        return;
      }
      this.zhibaoshuModel.show();
    })
  }

  closezhibaoshudialog() {
    this.zhibaoshuModel.hide();
  }
  /**??????????????? */
  checkboxchange(event) {
    const isnotall = this.singleData.some(item => !item.checked);
    if (isnotall) {
      this.isall = false;
    } else {
      this.isall = true;
    }
  }
  /**?????? */
  allcheck() {
    if (this.isall) {
      this.singleData.forEach(item => {
        item.checked = false;
      });
    } else {
      this.singleData.forEach(item => {
        item.checked = true;
      });
    }
    const isnotall = this.singleData.some(item => !item.checked);
    if (isnotall) {
      this.isall = false;
    } else {
      this.isall = true;
    }
  }

  /**????????????????????? */
  alldownload() {
    const files = [];
    this.singleData.forEach(item => {
      if (item.checked && item.url) {
        files.push(item.url);
      }
    });
    if (files.length) {
      this.qihuoapi.downlodezhibao({ pathList: files }).then(data => {
        if (data['zipurl']) {
          window.open(data['zipurl']);
        }
      });
    } else {
      this.toast.pop('warning', '?????????????????????????????????');
    }
  }

  showProduceWuliu() {
    if (this.qihuomodel['type'] !== 1) {
      this.toast.pop('warning', '???????????????????????????????????????????????????????????????');
      return;
    }
    if (!this.qihuomodel['isv']) {
      this.toast.pop('warning', '?????????????????????????????????????????????');
      return;
    }
    const orderdetids = [];
    this.selectQihuodetWuliubaojia = [];
    const orderdetSelected = this.ordergridOptions.api.getModel()['rowsToDisplay']; // ??????????????????????????????
    for (let i = 0; i < orderdetSelected.length; i++) {
      if (orderdetSelected[i].data.id && orderdetSelected[i].selected) {
        orderdetids.push(orderdetSelected[i].data.id);
      }
    }
    if (orderdetids.length < 1) {
      this.toast.pop('warning', '?????????????????????????????????????????????');
      return;
    }

    this.businessorderApi.orderdetgroup(orderdetids).then(data => {
      this.selectQihuodetWuliubaojia = data;
      this.modalService1.config.class = 'modal-lg';
      // ?????????????????????????????????
      this.noticewuliuparams = { qihuodets: this.selectQihuodetWuliubaojia, id: this.qihuomodel['id'], detids: orderdetids, datasource: 6 };
      this.bsModalRef = this.modalService1.show(NoticewuliuyuanComponent);
      this.bsModalRef.content.parentThis = this;
    })
  }
  /**?????????????????????????????? */
  showtiaohuobid() {
    this.modalService1.config.class = 'modal-all';
    this.importTBbsModalRef = this.modalService1.show(ImporttiaohuobidComponent);
    this.importTBbsModalRef.content.parentThis = this;
  }
  /**????????????????????????????????????????????????????????? */
  oneRecall() {
    this.qihuoapi.onerecall(this.qihuoid).then(data => {
      this.getqihuomodel();
      this.findqihuodet();
    });
  }
  /**???????????????????????? */
  orderchange() {
    if (this.qihuoflag['qihuochangestatus'] === 0) {
      if (confirm('??????????????????????????????????????????\n?????????????????????????????? ????????????????????????????????????????????????????????????\n?????????????????????????????? ???????????????????????????????????????\n??????????????????????????????????????????????????????????????????')) {
        if (this.qihuoflag['isorderchange']) {
          this.qihuoapi.orderchange(this.qihuoid).then(data => {
            this.getqihuomodel();
            this.findqihuodet();
          });
        }
        if (this.qihuoflag['isrecall']) {
          this.oneRecall();
        }
      }
    } else if (this.qihuoflag['qihuochangestatus'] === 1) {
      this.showqhchangetijiao();
    }
  }

  showqhchangetijiao() {
    this.qhchangetijiaoModel.show();
    this.qhchangetijiaobeizhu = '';
  }
  qhchangetijiaoclose() {
    this.qhchangetijiaoModel.hide();
  }
  qhchangetijiao() {
    if (!this.qhchangetijiaobeizhu) {
      this.toast.pop('warning', '??????????????????');
      return;
    }
    if (confirm('?????????????????????????????????')) {
      const json = { orderid: this.qihuoid, beizhu: this.qhchangetijiaobeizhu };
      this.qihuoapi.orderchangesubmitverify(json).then(data => {
        this.getqihuomodel();
        this.findqihuodet();
        this.qhchangetijiaoclose();
      });
    }
  }
  /**?????????????????? */
  getunits() {
    this.units = [{ label: '??????????????????', value: null }];
    this.classifyapi.getChildrenTree({ pid: 12717 }).then(data => {
      data.forEach(element => {
        this.units.push({
          label: element.label,
          value: element.label
        });
      });
    });
  }

  caigoudan() {
    const ids = new Array();
    const qihuodetlistlist = this.gridOptions.api.getModel()['rowsToDisplay'];
    let chandi = '';
    let gn = '';
    for (let i = 0; i < qihuodetlistlist.length; i++) {
      if (qihuodetlistlist[i].selected && qihuodetlistlist[i].data) {
        if (!chandi) {
          chandi = qihuodetlistlist[i].data.goodscode.chandi;
        }
        if (!gn) {
          gn = qihuodetlistlist[i].data.goodscode.gn;
        }
        if (gn !== qihuodetlistlist[i].data.goodscode.gn || chandi !== qihuodetlistlist[i].data.goodscode.chandi) {
          this.toast.pop('warning', '??????????????????????????????');
          return '';
        }
        ids.push(qihuodetlistlist[i].data.id);
      }
    }
    if (ids.length <= 0) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    this.caigou['orderdetids'] = ids;
    this.caigou['orderid'] = this.qihuoid;
    this.selectegangchang(gn, chandi);
    this.findWiskind();
    this.createCaigouModal.show();
  }
  closeCaigou() {
    this.createCaigouModal.hide();
  }
  caigou: object = {};
  selectmonth(value) {
    this.caigou['month'] = this.datepipe.transform(value, 'y-MM-dd');
  }
  createCaigou() {
    if (!this.caigou['month']) {
      this.toast.pop('error', '????????????????????????', '');
      return;
    }
    // if (!this.caigou['jiaohuoaddr']) {
    //   this.toast.pop('error', '????????????????????????', '');
    //   return;
    // }
    if (this.caigou['sellerid'] instanceof Object) {
      this.caigou['sellerid'] = this.caigou['sellerid'].code;
    } else {
      this.caigou['sellerid'] = null;
    }
    if (this.caigou['sellerid'] === null) {
      this.toast.pop('error', '?????????????????????', '');
      return;
    }
    this.caigouApi.createCaigou(this.caigou).then(data => {
      this.router.navigateByUrl('/caigou/' + data.id);
      this.closeCaigou();
    });
  }
  selectegangchang(gn, chandi) {
    this.caigou['chandi'] = gn;
    this.caigou['chandi'] = chandi;
    this.jiaohuoaddrs = [];
    const chandigongchaparam = { gn: gn, chandi };
    this.mdmService.getchandigongcha(chandigongchaparam).then(chandigongchas => {
      for (let index = 0; index < chandigongchas.length; index++) {
        const element = chandigongchas[index];
        if (element.value === 'jiaohuoaddr') {
          this.jiaohuoaddrs = element.options;
          break;
        }
      }
    });
    // this.qihuoapi.getchandigongcha().then(data => {
    //   data.forEach(element => {
    //     if (element['chandiid'] === this.caigou['chandiid']) {
    //       console.log('???????????????', element);
    //       // ????????????
    //       element.attr.jiaohuoaddr.forEach(addr => {
    //         this.jiaohuoaddrs.push({
    //           value: addr.value,
    //           label: addr.value
    //         });
    //       });
    //     }
    //   });
    // });
  }
  neiwuwaiwu = false;
  getRoles() {
    let myrole = JSON.parse(localStorage.getItem('myrole'));
    for (let i = 0; i < myrole.length; i++) {
      if (myrole[i] === 20 || myrole[i] === 21) {
        this.neiwuwaiwu = true;
      }
    }
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

  qualitShow() {
    this.addqualityModal.show();
  }
  hideaddModal() {
    this.addqualityModal.hide();
  }
  choice() {
    console.log(this.qhqualityModel['compensation']);
    if (!this.qhqualityModel['ischuliquality']) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    if (!this.qhqualityModel['saletype'] && !this.qhqualityModel['rstype']) {
      this.toast.pop('warning', '???????????????????????????????????????');
      return;
    }
    if (this.qhqualityModel['saletype'] && !this.qhqualityModel['salebeizhu']) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    if (this.qhqualityModel['saletype'] && this.qhqualityModel['salejine'] === null) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    if (this.qhqualityModel['rstype'] && !this.qhqualityModel['rsbeizhu']) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    if (this.qhqualityModel['rstype'] && this.qhqualityModel['rsjine'] === null) {
      this.toast.pop('warning', '????????????????????????');
      return;
    }
    this.qhqualityModel['id'] = this.qihuomodel['id'];
    this.hideaddModal();
    this.modalService.config.class = 'modal-all';
    this.zlbsModalRef = this.modalService.show(QualityobjectionimportComponent);
    this.zlbsModalRef.content.isimport = this.isimport;
    this.zlbsModalRef.content.qhqualityModel = this.qhqualityModel;
    this.zlbsModalRef.content.parent = this;
  }
  addupdate() {
    let params = { ischuliquality: this.qhqualityModel['ischuliquality'], id: this.qihuomodel['id'] };
    this.orderApi.qualityUpdate(params).then(data => {
      console.log(data);
      if (data) {
        this.getqihuomodel();
        this.hideaddModal();
      }
    });
  }
  // /**???????????????????????? */
  // showgetmdmgn() {
  //   this.mdmgndialog.show();
  //   this.mdmgnsearch = {pagenum: 1, pagesize: 10, itemname: '', itemcode: ''};
  //   this.getMdmgn();
  // }
  // querymdmgn() {
  //   this.mdmgnsearch.pagenum = 1;
  //   this.getMdmgn();
  // }
  // /**???????????? */
  // getMdmgn() {
  //   this.mdmService.gnMdmgn(this.mdmgnsearch).then(data => {
  //     this.mdmgnsearchtotal = data.headers.get('total');
  //     this.gnData = data.json();
  //     console.log(this.gnData);
  //   });
  // }
  // /**?????????????????? */
  // mdmgnsearchChanged(event) {
  //   this.mdmgnsearch['pagenum'] = event.page;
  //   this.mdmgnsearch['pagesize'] = event.itemsPerPage;
  //   this.getMdmgn();
  // }
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
  mdmreset() {
    this.editflag = { zhidan: false, iseditguige: false };
    this.editTempParam = { detdata: null };
    this.showGuige = false;
    this.gcs = [];
    this.qihuodetmodel = {
      id: null,
      gnid: null,
      chandiid: null,
      dinghuoliang: null,
      oneweight: null,
      jiaohuodate: null,
      jiaohuoaddr: null,
      neibujiesuanprice: null,
      saleprice: null,
      houdugongcha: null,
      widthgongcha: null,
      weightgongcha: null,
      classifys: null,
      cangkuid: null,
      chukufeeprice: 0,
      yunfeeprice: 0,
      yunzafeeprice: 0,
      jiagongfeeprice: 0,
      unitname: null,
      isinterestfree: false
    };
    this.one = true;
    this.two = false;
    this.goodscode = {};
  }
  addmdmgoodscode() {
    this.mdmreset();
    this.zhidaoprices = [{ label: '??????????????????', value: null },
    { value: '0', label: '??????' }, { value: '1', label: '??????' }, { value: '2', label: '???????????????' }];
    this.isurgent = [{ label: '??????????????????', value: null }, { label: '???', value: true }, { label: '???', value: false }];
    this.materialtypes = [{ label: '??????????????????', value: null },
    { value: '1', label: '?????????' }, { value: '2', label: '?????????' }];
    if (this.qihuomodel['isweishi']) {
      this.packageyaoqius = [{ label: '??????????????????', value: null }];
      this.classifyapi.getChildrenTree({ pid: 17746 }).then(data => {
        data.forEach(element => {
          this.packageyaoqius.push({ label: element.label, value: element.label });
        });
      });
    }
    if (this.qihuomodel['ordertype'] === 2) {// ????????????????????????????????????????????????
      this.getcangkus();
    }
    this.iscountshow = false;
    this.createmdmqihuodialog.show();
  }
  createmdmqihuodialogcoles() {
    this.createmdmqihuodialog.hide();
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
      this.one = false;
      this.two = true;
      if (this.qihuomodel['ordertype'] !== 2) {
        this.isqihuo = true;
      }
      this.chandigongchas = [];
      this.houdugongchas = [];
      this.widthgongchas = [];
      this.yongtus = [];
      this.oneweights = [];
      this.jiaohuoaddrs = [];
      this.lines = [];
      this.getunits();
      this.qihuodetmodel['gcid'] = good.id;
      const chandigongchaparam = { gn: good['gn'], chandi: good['chandi'] };
      this.mdmService.getchandigongcha(chandigongchaparam).then(chandigongchas => {
        this.chandigongchas = chandigongchas;
        if (this.editTempParam.detdata) {
          this.qihuodetmodel['houdugongcha'] = this.editTempParam.detdata['houdugongcha'];
          this.qihuodetmodel['widthgongcha'] = this.editTempParam.detdata['widthgongcha'];
          this.qihuodetmodel['weightgongcha'] = this.editTempParam.detdata['weightgongcha'];
          this.qihuodetmodel['yongtu'] = this.editTempParam.detdata['yongtu'];
          this.qihuodetmodel['jiaohuodate'] = new Date(this.editTempParam.detdata['innerqixian']);
          this.qihuodetmodel['oneweight'] = this.editTempParam.detdata['oneweight'];
          this.qihuodetmodel['jiaohuoaddr'] = this.editTempParam.detdata['innerjiaohuoaddr'];
          this.qihuodetmodel['detid'] = this.editTempParam.detdata['id'];
          this.qihuodetmodel['dinghuoliang'] = this.editTempParam.detdata['weight'];
          this.qihuodetmodel['beizhu'] = this.editTempParam.detdata['beizhu'];
          this.qihuodetmodel['zhidaojiagedesc'] = this.editTempParam.detdata['zhidaojiagedesc'] + '';
          this.qihuodetmodel['isurgent'] = this.editTempParam.detdata['isurgent'];
          this.qihuodetmodel['materialtype'] = this.editTempParam.detdata['materialtype'];
          this.qihuodetmodel['cangkuid'] = this.editTempParam.detdata['cangkuid'];
          this.qihuodetmodel['isinterestfree'] = this.editTempParam.detdata['isinterestfree'];
          this.qihuodetmodel['interestfreedays'] = this.editTempParam.detdata['interestfreedays'];
          this.qihuodetmodel['interestfreereason'] = this.editTempParam.detdata['interestfreereason'];
          this.qihuodetmodel['length'] = this.editTempParam.detdata['length'];
          this.qihuodetmodel['count'] = this.editTempParam.detdata['count'];
          this.qihuodetmodel['neibujiesuanprice'] = this.editTempParam.detdata['neibujiesuanprice'];
          this.qihuodetmodel['saleprice'] = this.editTempParam.detdata['saleprice'];
        }
      });
    });
  }

  mdmcreate() {
    if (!this.qihuodetmodel['beizhu']) { this.toast.pop('warning', '??????????????????????????????'); return; }
    if (!this.qihuodetmodel['houdugongcha']) { this.toast.pop('warning', '??????????????????????????????'); return; }
    if (!this.qihuodetmodel['widthgongcha']) { this.toast.pop('warning', '??????????????????????????????'); return; }
    if (!this.qihuodetmodel['dinghuoliang']) { this.toast.pop('warning', '???????????????????????????'); return; }
    if (!this.qihuodetmodel['oneweight']) { this.toast.pop('warning', '???????????????????????????'); return; }
    if (!this.qihuodetmodel['weightgongcha']) { this.toast.pop('warning', '??????????????????????????????'); return; }
    if (this.qihuomodel['ordertype'] !== 2) {
      if (!this.qihuodetmodel['neibujiesuanprice']) { this.toast.pop('warning', '????????????????????????????????????'); return; }
    }
    if (this.qihuodetmodel['materialtype'] === '1') {
      if (!this.qihuodetmodel['length'] || this.qihuodetmodel['length'] === '') {
        this.toast.pop('warning', '????????????????????????');
        return;
      }
      // if (!this.qihuodetmodel['count'] || this.qihuodetmodel['count'] === '') {
      //   this.toast.pop('warning', '????????????????????????');
      //   return;
      // }
    }
    if (this.qihuodetmodel['isinterestfree']) {
      if (this.qihuodetmodel['interestfreedays'] === undefined || this.qihuodetmodel['interestfreedays'] === null) {
        this.toast.pop('warning', '??????????????????????????????'); return;
      }
      this.qihuodetmodel['interestfreedays'] = Math.round(this.qihuodetmodel['interestfreedays']);
      if (this.qihuodetmodel['interestfreedays'] <= 15) {
        this.toast.pop('warning', '??????????????????????????????15????????????'); return;
      }
      if (!this.qihuodetmodel['interestfreereason']) {
        this.toast.pop('warning', '??????????????????????????????'); return;
      }
    }
    if (!this.qihuodetmodel['saleprice']) { this.toast.pop('warning', '??????????????????????????????'); return; }
    if (!this.qihuodetmodel['jiaohuodate']) { this.toast.pop('warning', '??????????????????????????????'); return; }
    if (!this.qihuodetmodel['jiaohuoaddr']) { this.toast.pop('warning', '??????????????????????????????'); return; }
    if (!this.qihuodetmodel['yongtu']) { this.toast.pop('warning', '????????????????????????'); return; }
    if (!this.qihuodetmodel['zhidaojiagedesc']) { this.toast.pop('warning', '??????????????????????????????'); return; }
    if (this.qihuodetmodel['isurgent'] === undefined) { this.toast.pop('warning', '??????????????????????????????'); return; }
    if (this.qihuodetmodel['unitname']) {
      if (this.qihuodetmodel['unitweight'] === undefined ||
        this.qihuodetmodel['unitweight'] === null ||
        this.qihuodetmodel['unitprice'] === undefined ||
        this.qihuodetmodel['unitprice'] === null) {
        this.toast.pop('warning', '????????????????????????????????????'); return;
      }
    }
    this.qihuodetmodel['jiaohuodate'] ?
      this.qihuodetmodel['jiaohuodate'] = this.datepipe.transform(this.qihuodetmodel['jiaohuodate'], 'y-MM-dd') : '';
    this.qihuodetmodel['id'] = this.qihuoid;
    this.qihuodetmodel['fees'] = this.lines;
    if (this.qihuomodel['ordertype'] === 15) {
      this.qihuodetmodel['packageyaoqiu'] = this.qihuodetmodel['dabaoyaoqiu'].join();
    }
    if (this.qihuodetmodel['detid']) { // ????????????
      this.qihuoapi.modifymdmqihuodet(this.qihuodetmodel).then(() => {
        this.createmdmqihuodialogcoles();
        /* ??????????????????*/
        this.findqihuodet();
        this.getqihuomodel();
        this.one = true;
        this.two = false;
      });
    } else { // ????????????
      this.qihuoapi.createqihuodet(this.qihuodetmodel).then(() => {
        this.createmdmqihuodialogcoles();
        /* ??????????????????*/
        this.findqihuodet();
        this.getqihuomodel();
        this.one = true;
        this.two = false;
      });
    }
  }

  querymat() {
    if (this.qihuodetmodel['matcode'] && this.qihuodetmodel['matcode'].trim()) {
      this.qihuoapi.getmat(this.qihuodetmodel['matcode']).then(mat => {
        this.goodscode = { gn: mat['gn'] };
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
}
