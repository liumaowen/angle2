import { ModalDirective } from 'ngx-bootstrap/modal';
import { WuliuscoreapiService } from '../wuliuscore/wuliuscoreapi.service';
import { ToasterService } from 'angular2-toaster';
import { SettingsService } from '../../../core/settings/settings.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressparseService } from 'app/dnn/service/address_parse';
import { ClassifyApiService } from 'app/dnn/service/classifyapi.service';
import { XiaoshouapiService } from 'app/routes/xiaoshou/xiaoshouapi.service';
import { DatePipe, HashLocationStrategy } from '@angular/common';
import { ColDef, GridOptions } from 'ag-grid/main';

@Component({
  selector: 'app-regprice',
  templateUrl: './regprice.component.html',
  styleUrls: ['./regprice.component.scss']
})
export class RegpriceComponent implements OnInit {
  msg = { msg: '' };
  search: any = {
    startprovinceid: '',
    startcityid: '',
    startcountyid: '',
    endprovinceid: '',
    endcityid: '',
    endcountyid:''
  }

  gridOptions: GridOptions;
  areamiddle={};
  provinces: any[] = [];
  citys: any[] = [];
  countys: any[] = [];
  provinces1 = [];
  provinces2: any[] = [];
  citys2: any[] = [];
  countys2: any[] = [];
  citys3: any[] = [];
  countys3: any[] = [];
  provinces3 = [];
  citys4: any[] = [];
  countys4: any[] = [];
  provinces4 = [];
  wuliucompany = {};
  price: any;
  twight:any;
  beizhu:any;
  routeinquiry = { accountdirection: 2 };
  modify: Object = { price: null, detid: '' };

  constructor(
    public settings: SettingsService, 
    private toast: ToasterService, 
    private addressparseService: AddressparseService,
    private classifyApi: ClassifyApiService,
    private wuliuscoreapiService: WuliuscoreapiService,
    private tihuoApi: XiaoshouapiService,
    private datePipe: DatePipe) {

    this.gridOptions = {
      rowData: null,
      enableFilter: true,
      rowDeselection: true,
      suppressRowClickSelection: false,
      enableColResize: true,
      enableSorting: true,
      overlayLoadingTemplate: this.settings.overlayLoadingTemplate,
      overlayNoRowsTemplate: this.settings.overlayNoRowsTemplate,
      getContextMenuItems: this.settings.getContextMenuItems,
      onCellClicked: (params) => {
        params.node.setSelected(true, true);
      },
    }


    this.gridOptions.columnDefs = [
      { cellStyle: { "text-align": "left" }, headerName: '??????', minWidth: 100, checkboxSelection: true, suppressMenu: true },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????',  field: 'udate', width: 90  },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'sprovincename', width: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'scityname', width: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????/???', field: 'scountyname', width: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'eprovincename', width: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'ecityname', width: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????/???', field: 'ecountyname', width: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'tweight', width: 90 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????/??????', field: 'price', width: 260 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'jine', width: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'wuliucompanyname', width: 200,colId: 'wuliucompanyname' },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'wuliuyuan', width: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '?????????', field: 'yijiaren', width: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '????????????', field: 'bargaining', width: 100 },
      { cellStyle: { 'text-align': 'center' }, headerName: '??????', field: 'beizhu', width: 100 }

    ];

    this.getMyRole();
  }
  ngOnInit() {
  }
  listDetail() {
  }
 
@ViewChild('classicModal') private classicModal: ModalDirective;
@ViewChild('queryModal') private queryModal: ModalDirective;
@ViewChild('priceModal') private priceModal: ModalDirective;
@ViewChild('yijiaModal') private yijiaModal: ModalDirective;

getMyRole() {
  const myrole = JSON.parse(localStorage.getItem('myrole'));
  this.gridOptions.columnDefs.forEach((colde: ColDef) => {
  // ?????????????????????????????????????????????????????????
  if (!myrole.some(item => item === 9 || item === 1)) {
    if (colde.colId === 'wuliucompanyname' ) {
      colde.hide = true;
      colde.suppressToolPanel = true;
    }
  }
});
}


  // ????????????
   coles() {
    this.classicModal.hide();
  }
  // ????????????
  showDialog() { 
    this.selectNull();
    this.classicModal.show(); 
  }
  //??????
  createrouteprice(){
    if (!this. routeinquiry['tweight']) {
      this.toast.pop('warning', '??????????????????');
      return '';
    }
    if (!this. routeinquiry['price']) {
      this.toast.pop('warning', '??????????????????');
      return '';
    }
    // if (!this. routeinquiry['wuliucompanyname']) {
    //   this.toast.pop('warning', '????????????????????????');
    //   return '';
    // }
    if((!this. routeinquiry['sprovinceid'] || !this. routeinquiry['scityid'] || !this. routeinquiry['scountyid'] || 
          !this. routeinquiry['eprovinceid'] || !this. routeinquiry['ecityid'] || !this. routeinquiry['ecountyid'] )){
            this.toast.pop('warning', '???????????????!');
            return '';
    }
    this. routeinquiry['wuliucompanyid'] = this.wuliucompany['code'];
    this.wuliuscoreapiService.createRoute(this. routeinquiry).then(() => {
      this.coles();
      this.toast.pop('success', '??????????????????');
      this.listDetail();
    });
      this.showDialog();
  }

  addrouteprice(){
    this.getProvince();
    this.getProvince2();
    this.showDialog();
  }
  


  //????????????
  closeinquire(){
    this.queryModal.hide();
  }

  selectNull(){
      this.search = {
        startprovinceid: '',
        startcityid: '',
        startcountyid: '',
        endprovinceid: '',
        endcityid: '',
        endcountyid: '',
      };
      this.getProvince3();
      this.getProvince4();
    }

  querylist() {
    this.wuliuscoreapiService.getRoute(this.search).then(data => {
      this.gridOptions.api.setRowData(data);
    });
    this.queryModal.hide();
  }

  inquireprice(){
    this.getProvince3();
    this.getProvince4();
    this.queryModal.show();
  }
 



  getpcc(pid, pccname: any[]) {
    return new Promise((resolve: (data) => void) => {
      this.classifyApi.getChildrenTree({ pid: pid }).then((data) => {
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

  getcity() {
    this.citys = [];
    delete this. routeinquiry['scityid'];
    delete this. routeinquiry['scountyid'];
    this.classifyApi.getChildrenTree({ pid: this. routeinquiry['sprovinceid'] }).then((data) => {
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
    delete this. routeinquiry['scountyid'];
    this.classifyApi.getChildrenTree({ pid: this. routeinquiry['scityid'] }).then((data) => {
      data.forEach(element => {
        this.countys.push({
          label: element.label,
          value: element.id
        });
      });
    });
  }
  getProvince() {
    this.provinces = [];
    this.classifyApi.getChildrenTree({ pid: 263 }).then((data) => {
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
  getcity2() {
    this.citys2 = [];
    delete this. routeinquiry['ecityid'];
    delete this. routeinquiry['ecountyid'];
    this.classifyApi.getChildrenTree({ pid: this. routeinquiry['eprovinceid'] }).then((data) => {
      data.forEach(element => {
        this.citys2.push({
          label: element.label,
          value: element.id
        });
      });
      this.countys2 = [];
    });
  }
  getcounty2() {
    this.countys2 = [];
    delete this. routeinquiry['ecountyid'];
    this.classifyApi.getChildrenTree({ pid: this. routeinquiry['ecityid'] }).then((data) => {
      data.forEach(element => {
        this.countys2.push({
          label: element.label,
          value: element.id
        });
      });
    });
  }
  getProvince2() {
    this.provinces2 = [];
    this.classifyApi.getChildrenTree({ pid: 263 }).then((data) => {
      data.forEach(element => {
        this.provinces2.push({
          label: element.label,
          value: element.id
        });
      });
      this.citys2 = [];
      this.countys2 = [];
    });
  }
  getcity3(obj) {
    this.citys3 = [];
    delete obj['startcityid'];
    delete obj['startcountyid'];
    this.classifyApi.getChildrenTree({ pid: obj['startprovinceid'] }).then((data) => {
      data.forEach(element => {
        this.citys3.push({
          label: element.label,
          value: element.id
        });
      });
      this.countys3 = [];
    });
  }

  getcounty3(obj) {
    this.countys3 = [];
    delete obj['startcountyid'];
    this.classifyApi.getChildrenTree({ pid: obj['startcityid'] }).then((data) => {
      data.forEach(element => {
        this.countys3.push({
          label: element.label,
          value: element.id
        });
      });
    });
  }
  getcity4(obj) {
    this.citys4 = [];
    delete obj['endcityid'];
    delete obj['endcountyid'];
    this.classifyApi.getChildrenTree({ pid: obj['endprovinceid'] }).then((data) => {
      data.forEach(element => {
        this.citys4.push({
          label: element.label,
          value: element.id
        });
      });
      this.countys4 = [];
    });
  }

  getcounty4(obj) {
    this.countys4 = [];
    delete obj['endcountyid'];
    this.classifyApi.getChildrenTree({ pid: obj['endcityid'] }).then((data) => {
      data.forEach(element => {
        this.countys4.push({
          label: element.label,
          value: element.id
        });
      });
    });
  }
  getProvince3() {
    this.provinces3 = [];
    this.classifyApi.getChildrenTree({ pid: 263 }).then((data) => {
      data.forEach(element => {
        this.provinces3.push({
          label: element.label,
          value: element.id
        });
      });
      this.citys3 = [];
      this.countys3 = [];
    });
  }
  getProvince4() {
    this.provinces4 = [];
    this.classifyApi.getChildrenTree({ pid: 263 }).then((data) => {
      data.forEach(element => {
        this.provinces4.push({
          label: element.label,
          value: element.id
        });
      });
      this.citys4 = [];
      this.countys4 = [];
    });
  }

    //???????????????
    modifyprice() {
      let ids = new Array();
      let maycurloanlist = this.gridOptions.api.getModel()['rowsToDisplay'];
      for (let i = 0; i < maycurloanlist.length; i++) {
        if (maycurloanlist[i].selected && maycurloanlist[i].data) {
          ids.push(maycurloanlist[i].data.id);
        }
      }
      if (ids.length < 1) {
        this.toast.pop('warning', '?????????????????????????????????');
        return;
      }
      this.modify['ids'] = ids;
      this.priceModal.show();
    }
  //????????????
    priceclose() {   
      this.priceModal.hide();
    }

  submit() {
    this.wuliuscoreapiService.modfiyPrice(this.modify).then(data => {
      this.toast.pop('success', '???????????????');
      this.priceclose();
    });
  }


 //????????????
 yijiaclose(){
  this.yijiaModal.hide();
}
  
submitprice(){
  let ids = new Array();
      let maycurloanlist = this.gridOptions.api.getModel()['rowsToDisplay'];
      for (let i = 0; i < maycurloanlist.length; i++) {
        if (maycurloanlist[i].selected && maycurloanlist[i].data) {
          ids.push(maycurloanlist[i].data.id);
        }
      }
      if (ids.length < 1) {
        this.toast.pop('warning', '?????????????????????????????????');
        return;
      }
      this.modify['ids'] = ids;
      this.yijiaModal.show();
}

yijiasubmit() {
  this.wuliuscoreapiService.yijiaPrice(this.modify).then(data => {
    this.toast.pop('success', '???????????????');
    this.yijiaclose();
  });
}

}