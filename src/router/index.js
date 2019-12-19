import Vue from 'vue'
import Router from 'vue-router'
import loginByToken from '../components/loginByToken'
import test from '../components/page/Test'
import amfHomeHtml from '@/components/common/page/AmfHomeHtml'
// import homeHtml from '../components/page/homePage/HomeHtml'
import tEnvHourdataArea from '../components/page/homePage/assessmentrankings/TEnvHourdataArea'
import MonitorAlarm from  '../components/page/monitorAlarm/MonitorAlarm'
import MonitorDetail from '../components/page/monitorAlarm/MonitorDetail'


import PollutionControlHomePage from "../components/page/PollutionControl/PollutionControlHomePage";
import report from '../components/page/homePage/assessmentrankings/Report'
import airQuality from '../components/page/homePage/assessmentrankings/AirQualityYear'
import TaskSell from '../components/page/measure/TaskSell'
import MeasureStore from '../components/page/measure/MeasureStore'
import ScheduleFollowing from '../components/page/measure/ScheduleFollowing'
import EnterpriseArchives from "../components/page/PollutionControl/EnterpriseArchives";
import unitRanking from '../components/page/homePage/assessmentrankings/UnitRanking'
import regionBy from '../components/page/homePage/assessmentrankings/RegionBy'
import cityHistoryAnalyze from '../components/page/homePage/assessmentrankings/CityHistoryAnalyze'
import EntOutStatistical from "../components/page/PollutionControl/EntOutStatistical";

import PatrolPlanMake from '../components/page/gridManage/PatrolPlanMake'
import PatrolLog from '../components/page/gridManage/PatrolLog'
import PollutionScreening from  '../components/page/gridManage/PollutionScreening'
import EventReport from '../components/page/gridManage/EventReport'
import entArchivesDetil from "../components/page/PollutionControl/entArchivesDetil";
import gasPredictEchar from "../components/page/gasControlled/gasPredictEchar";
import cityPmiData from '../components/page/homePage/assessmentrankings/CityPmiData'
import alarmData from '../components/page/homePage/assessmentrankings/AlarmData'
import analysis from '../components/page/homePage/assessmentrankings/Analysis'
import analysisMonth from '../components/page/homePage/assessmentrankings/AnalisisMonth'
import analisisYear from '../components/page/homePage/assessmentrankings/AnalisisYear'
import gasAnalysis from "../components/page/gasControlled/gasAnalysis"
import emergencyPlan from "../components/page/gasControlled/emergencyPlanAndRelease/emergencyPlan";
import emissionsList from "../components/page/gasControlled/emergencyPlanAndRelease/emissionsList";
import warningRelease from "../components/page/gasControlled/emergencyPlanAndRelease/warningRelease";
import PatrolLogDetail from "../components/page/gridManage/PatrolLogDetail"
import pollutionDetail from "../components/page/gridManage/PollutionDetailTest";
import eventReportDetail from "../components/page/gridManage/EventReportDetailTest";
import ScheduleFollowingDetail from  '../components/page/measure/ScheduleFollowingDetail'
import pollutionHomePage from '../components/page/PollutionControl/PollutionHomePage.vue'
import PollutantCtrlHomePage from "../components/page/gasControlled/emergencyPlanAndRelease/PollutantCtrlHomePage";
import dynamicControlHTML from "../components/page/DynamicControl/DynamicControlHTML.vue"
import targetManagement from "../components/page/DynamicControl/targetManagement"
import reachCalendar from "../components/page/DynamicControl/reachCalendar"
import reachState from "../components/page/DynamicControl/reachState"
import annualGoalSetting from "../components/page/DynamicControl/annualGoalSetting"
import todaysGoal from "../components/page/DynamicControl/todaysGoal"
import PatrolRouter from "../components/page/gridManage/PatrolRouter";
import airwrzd from "../components/page/DynamicControl/map/airwrzd.vue";
import PollutionsourceSupervisionHTML from "../components/page/PollutionControl/PollutionsourceSupervisionHTML";
import traitManagement from "../components/page/PollutionControl/traitManagement";
import login from "../components/login";
Vue.use(Router)


export default new Router({
    routes: [
        {
            path: '/test',
            name: 'test',
            component: test
        },
        {
            path: '/loginByToken',
            name: 'loginByToken',
            component: loginByToken
        },
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/',
            name: 'amfHomeHtml',
            component: amfHomeHtml,
            redirect: '/dynamicControlHTML',
            children: [

                {
                    path: '/dynamicControlHTML',
                    name: 'dynamicControlHTML',
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: dynamicControlHTML
                },
                {
                    path: '/targetManagement',
                    name: 'targetManagement',
                    children:[
                        {
                            path: '/reachCalendar',
                            name: 'reachCalendar',
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                            component: reachCalendar
                        },
                        {
                            path: '/reachState',
                            name: 'reachState',
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                            component: reachState
                        },
                        {
                            path: '/annualGoalSetting',
                            name: 'annualGoalSetting',
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                            component: annualGoalSetting
                        },
                        {
                            path: '/todaysGoal',
                            name: 'todaysGoal',
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                            component: todaysGoal
                        },
                    ],
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: targetManagement
                },
                {
                    path: '/tEnvHourdataArea',
                    name: 'tEnvHourdataArea',
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: tEnvHourdataArea
                },
                {
                    path: '/MonitorAlarm',
                    name: 'MonitorAlarm',
                    component: MonitorAlarm
                },
                {
                    path: '/TaskSell',
                    name: 'TaskSell',
                    component: TaskSell
                },
                {
                    path: '/ScheduleFollowing',
                    name: 'ScheduleFollowing',
                    component: ScheduleFollowing
                },
                {
                    path: '/ScheduleFollowingDetail',
                    name: 'ScheduleFollowingDetail',
                    component: ScheduleFollowingDetail
                },
                {
                    path: '/PatrolLogDetail',
                    name: 'PatrolLogDetail',
                    component: PatrolLogDetail
                },
                {
                    path: '/MeasureStore',
                    name: 'MeasureStore',
                    component: MeasureStore
                },
                {
                    path: '/MonitorDetail',
                    name: 'MonitorDetail',
                    component: MonitorDetail
                },
                {
                    path: '/airwrzd',
                    name: 'airwrzd',
                    component: airwrzd
                },


                {
                    path: '/PollutantCtrlHomePage',
                    name: 'PollutantCtrlHomePage',
                    meta: {
                        //auth: true//开启页面登陆状态校验
                        //gasPredictEchar  warningRelease   gasAnalysis     emissionsList
                    },
                    children:[
                        {
                            path: '/gasPredictEchar',
                            name: 'gasPredictEchar',
                            component: gasPredictEchar
                        },
                        {
                            path: '/warningRelease',
                            name: 'warningRelease',
                            component: warningRelease
                        },
                        {
                            path: '/gasAnalysis',
                            name: 'gasAnalysis',
                            component: gasAnalysis
                        },
                        {
                            path: '/emergencyPlan',
                            name: 'emergencyPlan',
                            component: emergencyPlan
                        },
                        {
                            path: '/emissionsList',
                            name: 'emissionsList',
                            component: emissionsList
                        },
                    ],
                    component: PollutantCtrlHomePage
                },
                {
                    path: '/pollutionHomePage',
                    name: 'pollutionHomePage',
                    children:[
                        {
                            path: '/PollutionControlHomePage',
                            name: 'PollutionControlHomePage',
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                            component: PollutionControlHomePage
                        },

                        {
                            path: '/EntOutStatistical',
                            name: 'EntOutStatistical',
                            component: EntOutStatistical
                        },
                        {
                            path: '/EnterpriseArchives',
                            name: 'EnterpriseArchives',
                            component: EnterpriseArchives
                        },
                        {
                            path: '/PollutionsourceSupervisionHTML',
                            name: 'PollutionsourceSupervisionHTML',
                            component: PollutionsourceSupervisionHTML
                        },
                        {
                            path: '/traitManagement',
                            name: 'traitManagement',
                            component: traitManagement
                        },
                    ],
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: pollutionHomePage
                },
                {
                    path: '/entArchivesDetil',
                    name: 'entArchivesDetil',
                    component: entArchivesDetil
                },
                {
                    path: '/report',
                    name: 'report',
                    children:[
                        {
                            path: '/airQuality',
                            name: 'airQuality',
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                            component: airQuality
                        },
                        {
                            path: '/regionBy',
                            name: 'regionBy',
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                            component: regionBy
                        },
                        {
                            path: '/cityHistoryAnalyze',
                            name: 'cityHistoryAnalyze',
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                            component: cityHistoryAnalyze
                        },
                        {
                            path: '/cityPmiData',
                            name: 'cityPmiData',
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                            component: cityPmiData
                        },
                        {
                            path: '/alarmData',
                            name: 'alarmData',
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                            component: alarmData
                        },
                        {
                            path: '/analysis',
                            name: 'analysis',
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                            component: analysis
                        },
                        {
                            path: '/analysisMonth',
                            name: 'analysisMonth',
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                            component: analysisMonth
                        },
                        {
                            path: '/analisisYear',
                            name: 'analisisYear',
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                            component: analisisYear
                        }
                    ],
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: report
                },
                {
                    path: '/PatrolRouter',
                    name: 'PatrolRouter',
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: PatrolRouter,
                    children:[
                        {
                            path: '/PatrolPlanMake',
                            name: 'PatrolPlanMake',
                            component: PatrolPlanMake,
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                        },
                        {
                            path: '/PatrolLog',
                            name: 'PatrolLog',
                            component: PatrolLog,
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                        },
                        {
                            path: '/PollutionScreening',
                            name: 'PollutionScreening',
                            component: PollutionScreening,
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                        },
                        {
                            path: '/EventReport',
                            name: 'EventReport',
                            component: EventReport,
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                        },
                        {
                            path: '/eventReportDetail',
                            name: 'eventReportDetail',
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                            component: eventReportDetail
                        },
                        {
                            path: '/pollutionDetail',
                            name: 'pollutionDetail',
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                            component: pollutionDetail
                        },
                    ]
                },
            ]
        },
        {
            path: '/unitRanking',
            name: 'unitRanking',
            meta: {
                //auth: true//开启页面登陆状态校验
            },
            component: unitRanking
        },



    ]

})
