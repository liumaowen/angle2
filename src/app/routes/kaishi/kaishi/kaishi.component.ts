import { ClassifyApiService } from './../../../dnn/service/classifyapi.service';
import { KaishiapiService } from './../kaishiapi.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap';
import { SettingsService } from 'app/core/settings/settings.service';
import { ToasterService } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
declare let $: any;


@Component({
  selector: 'app-kaishi',
  templateUrl: './kaishi.component.html',
  styleUrls: ['./kaishi.component.scss']
})
export class KaishiComponent implements OnInit, AfterViewInit, OnDestroy {


  addsstart;

  addsend;

  endmax = new Date();

  // 辅助数据：calendar：日历对象，start：页面开始日期， end：页面结束日期
  util: object = {};

  $calendar: any;

  // 事项集合
  events = [];

  // 开市发货数据模型：id：主键，sd：开始日期，ed：结束日期，sh：开始小时，sm：开始分钟，
  // eh：结束小时，em：结束分钟，cd：点击的日期，weekend：不排除周末，action：动作（run：执行函数，add：添加，adds：批量添加，dels：批量删除）
  model = {
    // action: () => { }
  };


  calendarOptions = {
    _this: (() => this)(),
    // 语言
    lang: 'zh-cn',
    // 时区
    timezone: 'local',
    // 事项颜色
    eventColor: '#23b7e5',
    // 事项日期格式
    timeFormat: 'HH:mm',
    // 标题日期格式
    titleFormat: 'YYYY-MM',
    // 显示事项结束日期
    displayEventEnd: true,
    // 高度
    height: this.settings.bodyHeight - 300,
    // 按钮文本
    buttonText: {
      // 今天
      today: '今天',
      // 上月
      prev: '上月',
      // 下月
      next: '下月'
    },
    // 头部
    header: {
      // 左侧（空）
      left: '',
      // 中部（标题）
      center: 'title',
      // 右侧（今天；上月，下月）
      right: 'today prev,next'
    },
    // 事项点击
    eventClick: (event) => {
      const start = event.start.format('HH:mm');
      const end = event.end.format('HH:mm');
      const time = start + ' - ' + end;
      if (!confirm('确定删除【 ' + time + ' 】吗？')) {
        return;
      }
      // 调用删除接口
      this.KaishiApi.remove(event.id).then(() => {
        for (let i = 0; i < this.events.length; i++) {
          if (this.events[i].id == event.id) {
            this.events.splice(i, 1);
            break;
          }
        }
        this.$calendar.fullCalendar('removeEvents', event.id);
        this.toast.pop('success', '操作成功！你已成功设置开市排单时间，如有特殊要求请单独添加！')
      });
    },
    // 日期点击
    dayClick: (date) => {
      // 忽略过期日期
      if (date.isBefore(new Date(), 'day')) {
        this.toast.pop('error', `【${date.format()}】已过期！`);
        return;
      }
      // 清除时间
      this.clearTime();
      // 点击的日期
      this.model['cd'] = date;
      // 打开添加对话框
      // this.openDialog('add');
      this.showaddModal();
    },
    // 事项渲染
    eventRender: (event, element) => {
      // 设置过期事项的样式
      if ((event.end || event.start).isBefore(new Date(), 'day')) {
        element.css({
          backgroundColor: '#dde6e9',
          borderColor: '#dde6e9'
        });
      }
    },
    // 窗口尺寸调整
    windowResize: (view) => {
      // console.log(view);
    },
    eventSources: [
      this.events,
      {
        events: (start, end, timezone, callback) => {
          // 日历对象
          if (!this.util['calendar']) {
            this.util['calendar'] = this.$calendar;
          }
          // 页面开始日期
          this.util['start'] = start.utcOffset(8).hour(0);
          // 页面结束日期
          this.util['end'] = end.utcOffset(8).hour(0);
          // 调用查询接口
          this.KaishiApi.query(
            { s: start.valueOf(), e: end.valueOf(), cangkuid: 3964 }
          ).then(data => {
            callback(data);
            [].push.apply(this.events, data);
          });
        }
      }
    ]
  };


  //  日历对象
  @ViewChild('fullcalendar') fullcalendar: ElementRef;

  @ViewChild('classifyModal') private classifyModal: ModalDirective;
  @ViewChild('deleteModal') private deleteModal: ModalDirective;
  @ViewChild('addModal') private addModal: ModalDirective;

  constructor(public settings: SettingsService,
    private KaishiApi: KaishiapiService,
    private toast: ToasterService,
    private classifyApi: ClassifyApiService,
    private datePipe: DatePipe, ) { }


  ngOnInit() {

    this.$calendar = $(this.fullcalendar.nativeElement);
  }



  ngAfterViewInit() {
    // init calendar plugin
    this.$calendar.fullCalendar(this.calendarOptions);
  }

  ngOnDestroy() {
    this.$calendar.fullCalendar('destroy');
  }

  // 打开批量添加对话框
  openAddsDialog() {
    // 清除时间
    this.clearTime();
    // 打开批量添加对话框
    this.showclassifyModal();
  }

  // 打开批量删除对话框
  openDelsDialog() {
    // 清空开市数据模型
    this.clearTime();
    // 打开批量删除对话框
    // openDialog('dels');
    this.showdeleteModal();
  }

  // 添加
  add() {
    if (!/^([0-1]?\d|2[0-3])$/.test(this.model['sh']) || !/^([0-1]?\d|2[0-3])$/.test(this.model['eh'])
      || !/^[0-5]?\d$/.test(this.model['sm']) || !/^[0-5]?\d$/.test(this.model['em'])) {
      this.toast.pop('warning', '时间格式填写不正确，请检查时间格式');
      return;
    }
    // 点击的日期
    const day = this.model['cd'];
    console.log(day);
    // 调整为东八区
    day.utcOffset(8);
    // 开始日期
    let start = day.clone();
    start.hour(this.model['sh']);
    start.minute(this.model['sm']);
    // 结束日期
    let end = day.clone();
    end.hour(this.model['eh']);
    end.minute(this.model['em']);
    // 时间错误
    if (!end.isAfter(start)) {
      this.toast.pop('error', '结束时间应该晚于开始时间！');
      return;
    }
    // 调用添加接口
    this.KaishiApi.save({
      start: start.valueOf(),
      end: end.valueOf()
    }).then(data => {
      this.events.push(data.json());
      this.$calendar.fullCalendar('renderEvent', data.json(), true);
      this.hideaddModal();
      this.toast.pop('success', '操作成功！如果您变更了今天的开市时间段，需要点击【刷新配置】按钮！');
    });
  }

  // 批量添加
  adds() {
    if (!/^([0-1]?\d|2[0-3])$/.test(this.model['sh']) || !/^([0-1]?\d|2[0-3])$/.test(this.model['eh'])
      || !/^[0-5]?\d$/.test(this.model['sm']) || !/^[0-5]?\d$/.test(this.model['em'])) {
      this.toast.pop('warning', '时间格式填写不正确，请检查时间格式');
      return;
    }
    if (!this.addsstart || !this.addsend) {
      this.toast.pop('warning', '请选择日期');
      return;
    }
    this.model['sd'] = this.datePipe.transform(this.addsstart, 'y-MM-dd');
    this.model['ed'] = this.datePipe.transform(this.addsend, 'y-MM-dd');
    // 开始日期
    const sd = moment(this.model['sd']).valueOf();
    // 开始日期
    const ed = moment(this.model['ed']).valueOf();
    // 日期错误
    if (sd >= ed) {
      this.toast.pop('error', '结束日期应该晚于开始日期！');
      return;
    }
    // 开始时间
    const st = (this.model['sh'] * 60 + this.model['sm']) * 60000;
    // 结束时间
    const et = (this.model['eh'] * 60 + this.model['em']) * 60000;
    // 时间错误
    if (st >= et) {
      this.toast.pop('error', '结束时间应该晚于开始时间！');
      return;
    }
    // 组织接口参数
    const data = {
      sd: sd.valueOf(),
      ed: ed.valueOf(),
      st: st.valueOf(),
      et: et.valueOf()
    };
    if (this.model['weekend']) {
      data['weekend'] = 1;
    }
    this.KaishiApi.save(data, '12312').then(response => {
      if (!this.util['start'].isAfter(ed)
        && this.util['end'].isAfter(sd)) {
        this.$calendar.fullCalendar('refetchEvents');
      }
      this.hideclassifyModal();
      this.toast.pop('success', '操作成功！如果您变更了今天的开市时间段，需要点击【刷新配置】按钮！')
    });
  }

  // 批量删除
  dels() {
    if (!this.addsstart || !this.addsend) {
      this.toast.pop('warning', '请选择日期');
      return;
    }
    const sd = this.addsstart.getTime();
    const ed = this.addsend.getTime();

    if (sd >= ed) {
      this.toast.pop('error', '结束日期应该晚于开始日期！');
      return;
    }
    // 调用批量删除接口
    this.KaishiApi.removes({
      s: sd.valueOf(),
      e: ed.valueOf()
    }).then(data => {
      if (!this.util['start'].isAfter(ed)
        && this.util['end'].isAfter(sd)) {
        this.$calendar.fullCalendar('refetchEvents');
      }
      this.hidedeleteModal();
      this.toast.pop('success', '操作成功！如果您变更了今天的开市时间段，需要点击【刷新配置】按钮！')
    });
  }

  // 查看状态
  getState() {
    // 调用查看状态接口
    this.KaishiApi.get({
      // 查看状态参数
      today: ''
    }).then(data => {
      let state;
      if (data.json().s == 1) {
        state = '开市';
      } else if (data.json().s == 0) {
        state = '闭市';
      } else {
        state = '未知';
      }
      let tip = '当前状态：【' + state + '】';
      if (data.json().t && data.json().t.length) {
        tip += '今天的开市时间段（不含过期）：';
        for (let i = 0; i < data.json().t.length; i++) {
          const item = data.json().t[i];
          const s = moment(item[0]).format('HH:mm');
          const e = moment(item[1]).format('HH:mm');
          tip += '【' + s + '】-【' + e + '】';
        }
      }
      this.toast.pop('success', tip)
      // success(tip);
    });
  }

  // 刷新配置
  reseting() {
    if (!confirm('确定要刷新配置吗？')) {
      return;
    }
    // 调用刷新配置接口
    this.KaishiApi.reseting({
      // 刷新配置参数
      reseting: ''
    }).then(data => {
      this.toast.pop('success', '操作成功！');
    });
  }

  // 清除历史
  clearHistory() {
    if (!confirm('确定要清除历史吗？')) {
      return;
    }
    // 调用清除历史接口
    this.KaishiApi.reseting({
      // 清除历史参数
      history: ''
    }).then(data => {
      this.$calendar.fullCalendar('refetchEvents');
      this.toast.pop('success', '操作成功！');
    });
  }

  // 查询APP接口是否处于维护中状态
  repairState = ['正常使用', '维护中'];
  repairAction = ['开启', '关闭'];

  isAppIFRepairing() {
    // 调用接口
    this.KaishiApi.get({
      repair: ''
    }).then(data => {
      const state = this.repairState[data.json()['s']] || '状态未知';
      this.toast.pop('success', '懒猫电商接口【' + state + '】');
    });
  }

  // 设置APP接口维护中状态
  setAppIFRepairing(isRepairing) {
    const state = isRepairing ? 1 : 0;
    const action = this.repairAction[state];
    if (!confirm('确定要【{?}】懒猫电商接口吗？'.replace('{?}', action))) {
      return;
    }
    // 调用接口
    this.KaishiApi.save({ s: state }, 1).then(data => {
      this.toast.pop('success', '操作成功！');
    });
  }



  clearTime() {
    this.addsstart = undefined;
    this.addsend = undefined;
    this.model = {};
  }


  // 获取数据
  // this.calendarOptions.events = this.calendarEvents;
  showclassifyModal() {
    this.classifyModal.show();
  }

  hideclassifyModal() {
    this.classifyModal.hide();
  }

  showdeleteModal() {
    this.deleteModal.show();
  }

  hidedeleteModal() {
    this.deleteModal.hide();
  }

  showaddModal() {
    this.addModal.show();
  }

  hideaddModal() {
    this.addModal.hide();
  }

}
