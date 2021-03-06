import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CaigouService {

  constructor(private http: Http) { }
  query(search): Promise<any> {
    return this.http.get('store/api/caigou', { search: search }).toPromise().then(data => {
      return data.json() as any[];
    });
  }
  create(caigou): Promise<any> {
    return this.http.post('store/api/caigou', caigou).toPromise().then(data => {
      return data.json();
    });
  }
  rukucreate(rukuapply): Promise<any> {
    return this.http.post('store/api/rukuapply/create', rukuapply).toPromise().then(data => {
      return data.json();
    });
  }
  addrukuapplydet(det): Promise<any> {
    return this.http.post('store/api/rukuapply/adddet', det).toPromise().then(data => {
      return data.json() as any;
    });
  }
  getrukuapply(id): Promise<any> {
    return this.http.get('store/api/rukuapply/findbyid/' + id).toPromise().then(data => {
      return data.json() as any;
    });
  }
  copyrukudet(detid): Promise<any> {
    return this.http.get('store/api/rukuapply/copydet/' + detid).toPromise().then(data => {
      return data.json() as any;
    });
  }
  modifyrukuapplydet(modify): Promise<any> {
    return this.http.put('store/api/rukuapply/updatedet', modify).toPromise().then();
  }
  modifyrukuapplygc(model) {
    return this.http.put('store/api/rukuapply/midifygc', model).toPromise();
  }
  deleterukuapplydet(id): Promise<any> {
    return this.http.delete('store/api/rukuapply/deletedet/' + id).toPromise().then();
  }
  deleterukuapply(id): Promise<any> {
    return this.http.delete('store/api/rukuapply/delete/' + id).toPromise().then();
  }
  getrukuapplydet(search): Promise<any> {
    return this.http.get('store/api/rukuapply/find', { search: search }).toPromise().then(data => {
      return data.json() as any;
    });
  }
  modifyrukuapplybeizhu(modify): Promise<any> {
    return this.http.put('store/api/rukuapply/update', modify).toPromise().then();
  }
  adddet(det): Promise<any> {
    return this.http.put('store/api/caigou/det', det).toPromise().then(data => {
      return data.json() as any;
    });
  }
  modifymdmcaigoudet(det): Promise<any> {
    return this.http.put('store/api/caigou/modifymdmcaigoudet', det).toPromise().then(data => {
      return data.json() as any;
    });
  }
  copydet(copy): Promise<any> {
    return this.http.put('store/api/caigou/det/copy', copy).toPromise().then(data => {
      return data.json() as any;
    });
  }
  modifygc(detid, model) {
    return this.http.put('store/api/caigou/modifygc/' + detid, model).toPromise();
  }
  getCaigou(id): Promise<any> {
    return this.http.get('store/api/caigou/' + id).toPromise().then(data => {
      return data.json() as any;
    });
  }
  deletedet(id): Promise<any> {
    return this.http.delete('store/api/caigou/det/' + id).toPromise().then();
  }
  addgrno(grno): Promise<any> {
    return this.http.put('store/api/caigou/grno', grno).toPromise().then();
  }
  modifyweight(modify): Promise<any> {
    return this.http.put('store/api/caigou/weight', modify).toPromise().then();
  }
  modifyprice(modify): Promise<any> {
    return this.http.put('store/api/caigou/price', modify).toPromise().then();
  }
  modifyorg(modify): Promise<any> {
    return this.http.put('store/api/caigou/updateorg', modify).toPromise().then();
  }
  importdet(det): Promise<any> {
    return this.http.post('store/api/caigou/importdet', det).toPromise().then();
  }
  importfpdet(det): Promise<any> {
    return this.http.post('store/api/tasklist/importfpdet', det).toPromise().then();
  }
  importdetrukuapply(det): Promise<any> {
    return this.http.post('store/api/rukuapply/importqihuodet', det).toPromise().then();
  }
  getcaigoudet(search): Promise<any> {
    return this.http.get('store/api/caigou/caigoudet', { search: search }).toPromise().then(data => {
      return data.json() as any;
    });
  }
  caigoujiaofu(search): Promise<any> {
    return this.http.get('store/api/report/caigoujiaofu', { search: search }).toPromise().then(data => {
      return data.json() as any;
    });
  }
  getqihuodet(search): Promise<any> {
    return this.http.get('store/api/caigou/qihuodet', { search: search }).toPromise().then(data => {
      return data.json() as any;
    });
  }
  deletecaigou(id): Promise<any> {
    return this.http.delete('store/api/caigou/' + id).toPromise().then();
  }
  modifyjiaohuoaddr(modify): Promise<any> {
    return this.http.put('store/api/caigou/jiaohuoaddr', modify).toPromise().then();
  }
  modifybeizhu(modify): Promise<any> {
    return this.http.put('store/api/caigou/beizhu', modify).toPromise().then();
  }
  cgprint(id): Promise<any> {
    return this.http.get('store/api/caigou/print/' + id).toPromise().then(data => {
      return data.json();
    });
  }
  reloadcg(id): Promise<any> {
    return this.http.get('store/api/caigou/reload/' + id).toPromise().then(data => {
      return data.json();
    });
  }
  submitcg(id): Promise<any> {
    return this.http.get('store/api/caigou/submitverify/' + id).toPromise().then();
  }
  verifycg(id): Promise<any> {
    return this.http.get('store/api/caigou/verify/' + id).toPromise().then();
  }
  backcg(id): Promise<any> {
    return this.http.get('store/api/caigou/back/' + id).toPromise().then();
  }
  refusecg(id): Promise<any> {
    return this.http.get('store/api/caigou/refuse/' + id).toPromise().then();
  }
  getchandi(): Promise<any> {
    return this.http.get('store/api/caigou/getallchandi').toPromise().then(data => {
      return data.json() as any;
    });
  }
  pricechartlist(search): Promise<any> {
    return this.http.get('store/api/pricechart/pricechartlist', { search: search }).toPromise().then(data => {
      return data.json() as any[];
    });
  }
  deletepricechart(id): Promise<any> {
    return this.http.delete('store/api/pricechart/' + id).toPromise().then();
  }
  modifysupplier(modify): Promise<any> {
    return this.http.put('store/api/caigou/supplier', modify).toPromise().then();
  }
  modifygongcha(modify): Promise<any> {
    return this.http.put('store/api/caigou/gongcha', modify).toPromise().then();
  }
  // ?????????
  createfk(cgfukuan): Promise<any> {
    return this.http.post('store/api/cgfukuan/create', cgfukuan).toPromise().then(data => {
      return data.json();
    });
  }
  // ?????????????????????????????????
  impcreatefk(cgfukuan): Promise<any> {
    return this.http.post('store/api/cgfukuan/impcreate', cgfukuan).toPromise().then(data => {
      return data.json();
    });
  }
  deletecgfk(id): Promise<any> {
    return this.http.delete('store/api/cgfukuan/' + id).toPromise().then();
  }
  submitfk(id): Promise<any> {
    return this.http.get('store/api/cgfukuan/submitverify/' + id).toPromise().then(data => {
      return data.json();
    });
  }
  verifyfk(id): Promise<any> {
    return this.http.get('store/api/cgfukuan/verify/' + id).toPromise().then();
  }
  refusefukuan(id): Promise<any> {
    return this.http.get('store/api/cgfukuan/refuse/' + id).toPromise().then();
  }
  fukuan(json): Promise<any> {
    return this.http.put('store/api/cgfukuan/fukuan', json).toPromise().then();
  }
  fuhe(id): Promise<any> {
    return this.http.get('store/api/cgfukuan/fuhe/' + id).toPromise().then();
  }
  cgfukuanlist(search): Promise<any> {
    return this.http.get('store/api/cgfukuan', { search: search }).toPromise().then(data => {
      return data.json() as any;
    });
  }
  cgfukuan(id): Promise<any> {
    return this.http.get('store/api/cgfukuan/' + id).toPromise().then(data => {
      return data.json();
    });
  }
  fukuanprint(id): Promise<any> {
    return this.http.get('store/api/cgfukuan/print/' + id).toPromise().then(data => {
      return data.json();
    });
  }
  reloadprint(id): Promise<any> {
    return this.http.get('store/api/cgfukuan/reload/' + id).toPromise().then(data => {
      return data.json();
    });
  }
  backfukuan(id): Promise<any> {
    return this.http.get('store/api/cgfukuan/back/' + id).toPromise().then();
  }
  fkmodifybeizhu(modify): Promise<any> {
    return this.http.put('store/api/cgfukuan/beizhu', modify).toPromise().then();
  }
  // ???????????????????????????????????????
  findbycustomerid(id): Promise<any> {
    return this.http.get('store/api/baccount/listbycustomerid/' + id).toPromise().then(data => {
      return data.json() as any[];
    });
  }
  // ???????????????????????????????????????
  findaccount(id): Promise<any> {
    return this.http.get('store/api/baccount/fukuanaccount/' + id).toPromise().then(data => {
      return data.json() as any[];
    });
  }
  // ????????????
  createtuihuo(tuihuo): Promise<any> {
    return this.http.post('store/api/cgtuihuo', tuihuo).toPromise().then(data => {
      return data.json();
    });
  }
  querytuihuo(search): Promise<any> {
    return this.http.get('store/api/cgtuihuo', { search: search }).toPromise().then();
  }
  verifytuihuo(id): Promise<any> {
    return this.http.get('store/api/cgtuihuo/verify/' + id).toPromise().then();
  }
  cgtuihuo(id): Promise<any> {
    return this.http.get('store/api/cgtuihuo/' + id).toPromise().then(data => {
      return data.json();
    });
  }
  // ????????????
  getcginvoiceing(search): Promise<any> {
    return this.http.get('store/api/cginvoice/billlist', { search: search }).toPromise().then(data => {
      return data.json() as any[];
    });
  }
  createcginvoice(cginvoice): Promise<any> {
    return this.http.post('store/api/cginvoice', cginvoice).toPromise().then(data => {
      return data.json();
    });
  }
  cginvoice(id): Promise<any> {
    return this.http.get('store/api/cginvoice/' + id).toPromise().then(data => {
      return data.json();
    });
  }
  submitcginvoice(id): Promise<any> {
    return this.http.get('store/api/cginvoice/submitverify/' + id).toPromise().then(data => {
      return data.json();
    });
  }
  verifycginvoice(id): Promise<any> {
    return this.http.get('store/api/cginvoice/verify/' + id).toPromise().then();
  }
  getcginvoice(search): Promise<any> {
    return this.http.get('store/api/cginvoice/det', { search: search }).toPromise().then(data => {
      return data.json() as any;
    });
  }
  modifyfpweight(modify): Promise<any> {
    return this.http.put('store/api/cginvoice/weight', modify).toPromise().then();
  }
  modifyfpjine(modify): Promise<any> {
    return this.http.put('store/api/cginvoice/jine', modify).toPromise().then();
  }
  deleteinvoice(id): Promise<any> {
    return this.http.delete('store/api/cginvoice/' + id).toPromise().then();
  }
  // ??????????????????????????????
  updatedet(search): Promise<any> {
    return this.http.put('store/api/cginvoice/updatedet', search).toPromise().then();
  }
  backinvoice(id): Promise<any> {
    return this.http.get('store/api/cginvoice/back/' + id).toPromise().then();
  }
  qisheninvoice(id): Promise<any> {
    return this.http.get('store/api/cginvoice/refuse/' + id).toPromise().then();
  }
  importinvoice(det): Promise<any> {
    return this.http.post('store/api/cginvoice/importdet', det).toPromise().then();
  }
  delinvoicedet(id): Promise<any> {
    return this.http.delete('store/api/cginvoice/det/' + id).toPromise().then();
  }
  cginvoicecount(search): Promise<any> {
    return this.http.get('store/api/cginvoice/cginvoicecount', { search: search }).toPromise().then(data => {
      return data.json() as any[];
    });
  }
  cginvoiceingdet(search): Promise<any> {
    return this.http.get('store/api/cginvoice/invoiceingdet', { search: search }).toPromise().then(data => {
      return data.json() as any[];
    });
  }
  cginvoicetiaohuo(): Promise<any> {
    return this.http.get('store/api/cginvoice/cginvoicetiaohuo').toPromise().then(data => {
      return data.json() as any[];
    });
  }
  // ????????????
  getwanglai(search): Promise<any> {
    return this.http.get('store/api/report/cgwanglai', { search: search }).toPromise().then(data => {
      return data.json() as any[];
    });
  }
  getwanglai2(search): Promise<any> {
    return this.http.get('store/api/report/cgwanglai2', { search: search }).toPromise().then(data => {
      return data.json() as any[];
    });
  }
  getwanglaiyue(search): Promise<any> {
    return this.http.get('store/api/report/cgwanglaiyue', { search: search }).toPromise().then(data => {
      return data.json() as any[];
    });
  }
  getwanglaiyue2(search): Promise<any> {
    return this.http.get('store/api/report/cgwanglaiyue2', { search: search }).toPromise().then(data => {
      return data.json() as any[];
    });
  }
  // ????????????
  createjsbucha(bucha): Promise<any> {
    return this.http.post('store/api/jsbucha', bucha).toPromise().then(data => {
      return data.json();
    });
  }
  jsbuchaadddet(det): Promise<any> {
    return this.http.post('store/api/jsbucha/det', det).toPromise().then();
  }
  buchalist(search: object): Promise<any> {
    return this.http.get('store/api/jsbucha/buchalist', { search: search }).toPromise();
  }
  buchaimportdet(det): Promise<any> {
    return this.http.post('store/api/jsbucha/importdet', det).toPromise().then();
  }
  deletebucha(id): Promise<any> {
    return this.http.delete('store/api/jsbucha/' + id).toPromise().then();
  }
  jsbuchadeletedet(id): Promise<any> {
    return this.http.delete('store/api/jsbucha/det/' + id).toPromise().then();
  }
  getjsbuchadet(id): Promise<any> {
    return this.http.get('store/api/jsbucha/' + id).toPromise().then(data => {
      return data.json() as any;
    });
  }
  submitjs(id): Promise<any> {
    return this.http.get('store/api/jsbucha/submitverify/' + id).toPromise().then();
  }
  verifyjs(id): Promise<any> {
    return this.http.get('store/api/jsbucha/verify/' + id).toPromise().then();
  }
  backjs(id): Promise<any> {
    return this.http.get('store/api/jsbucha/back/' + id).toPromise().then();
  }
  refusejs(id): Promise<any> {
    return this.http.get('store/api/jsbucha/refuse/' + id).toPromise().then();
  }
  gettihuodet(search): Promise<any> {
    return this.http.get('store/api/jsbucha/tihuodet', { search: search }).toPromise().then(data => {
      return data.json() as any;
    });
  }
  // ????????????
  finish(id): Promise<any> {
    return this.http.get('store/api/caigou/finish/' + id).toPromise().then();
  }
  // ????????????
  finishDets(search): Promise<any> {
    return this.http.put('store/api/caigou/finishcaigoudet', { caigoudetids: search }).toPromise().then();
  }
  createcgfanli(caigou): Promise<any> {
    return this.http.post('store/api/cgfanli', caigou).toPromise().then();
  }
  getfanlidet(search): Promise<any> {
    return this.http.get('store/api/cgfanli/fanlidet', { search: search }).toPromise().then(data => {
      return data.json() as any;
    });
  }
  importfanli(search): Promise<any> {
    return this.http.get('store/api/cgfanli/importfanli', { search: search }).toPromise().then(data => {
      return data.json() as any;
    });
  }
  modifyfanli(id, modify): Promise<any> {
    return this.http.put('store/api/cgfanli/modify/' + id, modify).toPromise().then();
  }
  delfanli(id): Promise<any> {
    return this.http.delete('store/api/cgfanli/det/' + id).toPromise().then();
  }
  submitfanli(modify): Promise<any> {
    return this.http.put('store/api/cgfanli/submit', modify).toPromise().then();
  }
  // ????????????????????????
  modifyGcinfo(model, id) {
    return this.http.put('store/api/caigou/gcinfo/' + id, model).toPromise().then();
  }
  // ????????????
  submitgaizhang(userid, caigouid) {
    return this.http.get('store/api/caigou/submitGaizhang/' + caigouid + "?userid=" + userid).toPromise().then();
  }
  //????????????????????????
  modifygchtweight(model, detid) {
    return this.http.put('store/api/caigou/gchtweight/' + detid, model).toPromise().then();
  }
  //????????????????????????
  listjinhuoguozhi(model) {
    return this.http.get('store/api/report/jinhuoguanzhi', { search: model }).toPromise().then(data => {
      return data.json() as any;
    });
  }
  // ???????????????
  listurgentcontract(model) {
    return this.http.get('store/api/caigou/urgentcontract', { search: model }).toPromise().then(data => {
      return data.json() as any;
    });
  }
  matchgrno(moduleparam): Promise<any> {
    return this.http.post('store/api/caigou/matchgrno', moduleparam).toPromise().then(data => {
      return data.json();
    });
  }
  // ????????????
  uploadcontract(model) {
    return this.http.post('store/api/caigou/uploadcontract', model).toPromise();
  }
  //?????????????????????
  lookContract(id) {
    return this.http.get('store/api/caigou/lookcontract/' + id).toPromise().then(data => {
      return data.json() as any[];
    });
  }

  // ?????????????????????
  findjsbuchadetils(search) {
    return this.http.get('store/api/jsbucha/find?start=' + search.start + '&end=' +
      search.end + '&orgid=' + search.orgid + '&sorgid=' + search.sorgid + '&cuserid=' +
      search.cuserid + '&type=' + search.type).toPromise().then(data => {
        return data.json() as any[];
      });
  }
  /**??????????????????????????? */
  getfanlihuizongdet(search): Promise<any> {
    return this.http.get('store/api/fanlihuizong/list', { search: search }).toPromise().then(data => {
      return data.json() as any;
    });
  }
  tijiao(search): Promise<any> {
    return this.http.post('store/api/fanlihuizong/submit', search).toPromise().then(data => {
      return data.json() as any;
    });
  }
  addDetByTemplate(moduleparam): Promise<any> {
    return this.http.post('store/api/caigou/adddetbytemplate', moduleparam).toPromise().then(data => {
      return data.json();
    });
  }
  /**???????????????????????????????????? */
  batchAddInvoiceingdet(moduleparam): Promise<any> {
    return this.http.post('store/api/cginvoice/addinvoiceingdet', moduleparam).toPromise().then(data => {
      return data.json();
    });
  }
  /**???????????????????????????????????? */
  hexiaoinvoice(moduleparam): Promise<any> {
    return this.http.post('store/api/cginvoice/hexiaoinvoice', moduleparam).toPromise().then(data => {
      return data.json();
    });
  }
  // ??????????????????
  updateCaigouDet(search) {
    return this.http.put('store/api/caigou/updatedet', search).toPromise().then(data => {
      return data.json();
    });
  }
  // ????????????????????????
  batchUpdateCaigouDet(search) {
    return this.http.put('store/api/caigou/batchupdatedet', search).toPromise().then(data => {
      return data.json();
    });
  }
  /**??????????????????????????? */
  getweidaofanlihuizongdet(search): Promise<any> {
    return this.http.get('store/api/weidaofanlihuizong/list', { search: search }).toPromise().then(data => {
      return data.json() as any;
    });
  }
  modifyweidaofanli(id, search): Promise<any> {
    return this.http.put('store/api/weidaofanlihuizong/modify/' + id, search).toPromise().then(data => {
      return data.json() as any;
    });
  }
  uploadkucunfanli(search) {
    return this.http.post('store/api/weidaofanlihuizong/kucunfanlipipei', search).toPromise().then(data => {
      return data.json() as any[];
    });
  }
  submitWeidaofanli(): Promise<any> {
    return this.http.post('store/api/weidaofanlihuizong/submit', {}).toPromise().then(data => {
      return data.json() as any;
    });
  }
  /**???????????????????????????????????? */
  getlastyearwdfanlihuizongdet(search): Promise<any> {
    return this.http.get('store/api/lastyearwdfanlihuizong/list', { search: search }).toPromise().then(data => {
      return data.json() as any;
    });
  }
  uploadlastyearfanli(search) {
    return this.http.post('store/api/lastyearwdfanlihuizong/kucunfanlipipei', search).toPromise().then(data => {
      return data.json() as any[];
    });
  }
  submitlastyearwdfanli(): Promise<any> {
    return this.http.post('store/api/lastyearwdfanlihuizong/submit', {}).toPromise().then(data => {
      return data.json() as any;
    });
  }
  // ????????????
  getChandiList() {
    return this.http.get('store/api/classify/getchandilist').toPromise().then(data => {
      return data.json() as any;
    });
  }
  // ????????????????????????
  createCgfukuanPlan(search) {
    return this.http.post('store/api/cgfukuan/createcgfukuanplan', search).toPromise().then(data => {
      return data.json();
    });
  }

  // ????????????????????????
  findCgfukuanPlan(search) {
    return this.http.get('store/api/cgfukuan/findcgfukuanplan', { search: search }).toPromise().then(data => {
      return data.json() as any;
    });
  }
  // ??????????????????????????????
  getPlanTypeList(parentid) {
    return this.http.get('store/api/classify/getlistbyparentid/' + parentid).toPromise().then(data => {
      return data.json() as any;
    });
  }
  cgjiaofuhuizong(search): Promise<any> {
    return this.http.get('store/api/caigou/cgjiaofuhuizong', { search: search }).toPromise().then(data => {
      return data.json() as any;
    });
  }
  cgjiaofukaohe(search): Promise<any> {
    return this.http.get('store/api/caigou/jiaofukaohe', { search: search }).toPromise().then(data => {
      return data.json() as any;
    });
  }
  //????????????????????????
  removePayjihua(cgfukuanplanid) {
    return this.http.delete('store/api/cgfukuan/deletefukuanplan/' + cgfukuanplanid).toPromise().then();
  }
  getPayjihua(payjihuaid) {
    return this.http.get('store/api/cgfukuan/getone/' + payjihuaid).toPromise().then(data => {
      return data.json() as any[];
    });
  }
  updatePayjihua(model) {
    return this.http.put('store/api/cgfukuan/updatedet', model).toPromise();
  }
  createCaigou(caigou): Promise<any> {
    return this.http.post('store/api/qihuo/createcaigou', caigou).toPromise().then(data => {
      return data.json();
    });
  }
  deletecaigoudet(search) {
    return this.http.post('store/api/caigou/deletecaigoudet', search).toPromise().then(data => {
      return data.json() as any[];
    });
  }
  modifybuyer(modify): Promise<any> {
    return this.http.put('store/api/caigou/buyer', modify).toPromise().then();
  }
  deleteinvoicedet(search) {
    return this.http.post('store/api/cginvoice/deleteinvoicedet', search).toPromise().then(data => {
      return data.json() as any[];
    });
  }
  modifyInvoiceNo(modify): Promise<any> {
    return this.http.put('store/api/cginvoice/modifyinvoiceno', modify).toPromise().then();
  }
  modifyInvoiceBeizhu(modify): Promise<any> {
    return this.http.put('store/api/cginvoice/modifyinvoicebeizhu', modify).toPromise().then();
  }
  updateJsbucha(search): Promise<any> {
    return this.http.put('store/api/jsbucha/updatejsbucha', search).toPromise().then(data => {
      return data.json() as any[];
    });
  }
  modifyInvoicedate(modify): Promise<any> {
    return this.http.put('store/api/cginvoice/modifyinvoicedate', modify).toPromise().then();
  }
  addYuguFee(modify): Promise<any> {
    return this.http.put('store/api/caigou/addyugufee', modify).toPromise().then();
  }
  deleteyugufee(id): Promise<any> {
    return this.http.delete('store/api/caigou/deleteyugufee/' + id).toPromise().then();
  }
  getYugufeeList(cgdetid) {
    return this.http.get('store/api/caigou/getyugufeelist/' + cgdetid).toPromise().then(data => {
      return data.json() as any[];
    });
  }
}
