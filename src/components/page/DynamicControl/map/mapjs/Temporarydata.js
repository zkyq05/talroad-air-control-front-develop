const regin_tree_lin = {
  'msg': '操作成功！',
  'code': 0,
  'data': [
    {
      'name': '张家口市',
      'label': '张家口市',
      'value': '130700',
      'children': [
        {
          'name': '桥东区',
          'label': '桥东区',
          'value': '149',
          'children': null
        },
        {
          'name': '桥西区',
          'label': '桥西区',
          'value': '150',
          'children': null
        },
        {
          'name': '宣化区',
          'label': '宣化区',
          'value': '151',
          'children': null
        },
        {
          'name': '下花园区',
          'label': '下花园区',
          'value': '152',
          'children': null
        },
        {
          'name': '万全区',
          'label': '万全区',
          'value': '153',
          'children': null
        },
        {
          'name': '崇礼区',
          'label': '崇礼区',
          'value': '154',
          'children': null
        },
        {
          'name': '张北县',
          'label': '张北县',
          'value': '155',
          'children': [
            {
              'name': '油娄沟',
              'label': '油娄沟',
              'value': '3282',
              'children': null
            }
          ]
        },
        {
          'name': '康保县',
          'label': '康保县',
          'value': '156',
          'children': null
        },
        {
          'name': '沽源县',
          'label': '沽源县',
          'value': '157',
          'children': null
        },
        {
          'name': '尚义县',
          'label': '尚义县',
          'value': '158',
          'children': null
        },
        {
          'name': '蔚县',
          'label': '蔚县',
          'value': '159',
          'children': null
        },
        {
          'name': '阳原县',
          'label': '阳原县',
          'value': '160',
          'children': null
        },
        {
          'name': '怀安县',
          'label': '怀安县',
          'value': '161',
          'children': null
        },
        {
          'name': '怀来县',
          'label': '怀来县',
          'value': '162',
          'children': null
        },
        {
          'name': '涿鹿县',
          'label': '涿鹿县',
          'value': '163',
          'children': null
        },
        {
          'name': '赤城县',
          'label': '赤城县',
          'value': '164',
          'children': null
        }
      ]
    }
  ]
}
const site_kind_lin = {
  'msg': '操作成功！ ',
  'code': 0,
  'data': [
    {
      'pkId': 3,
      'stationTypeName': '国控站'
    },
    {
      'pkId': 4,
      'stationTypeName': '省控站'
    },
    {
      'pkId': 5,
      'stationTypeName': '标准站点'
    },
    {
      'pkId': 6,
      'stationTypeName': '基础网格站点'
    },
    {
      'pkId': 7,
      'stationTypeName': '污染来源站点'
    },
    {
      'pkId': 8,
      'stationTypeName': '园区监控站点'
    },
    {
      'pkId': 9,
      'stationTypeName': '道路扬尘监控站点'
    }
  ]
}
const select_point_lin = {
  'msg': '操作成功！',
  'code': 0,
  'data': {
    'stationOnlineInfo': {
      'totalNumOfSites': 10,
      'onlineRate': 81.82,
      'onlineNum': 9,
      'offlineNum': 2,
      'overStandardNum': 0,
      'abnormalNum': 0
    },
    'stationList': {
      'totalCount': 11,
      'pageSize': 10,
      'totalPage': 2,
      'currPage': 1,
      'list': [
        {
          'stationId': '1',
          'stationName': '桥西监测站',
          'stationAddress': '测试修改',
          'stationTypeName': '省控站',
          'stationStatus': '在线',
          'longitude': 116.398520,
          'latitude': 40.025085,
          'aqi': 249
        },
        {
          'stationId': '13137185700',
          'stationName': '下花园小型站',
          'stationAddress': '廊坊',
          'stationTypeName': '标准站点',
          'stationStatus': '在线',
          'longitude': 116.398520,
          'latitude': 40.025085,
          'aqi': 249
        },
        {
          'stationId': '187465',
          'stationName': '沽源县监测站',
          'stationAddress': '张北县',
          'stationTypeName': '基础网格站点',
          'stationStatus': '在线',
          'longitude': 116.489356,
          'latitude': 39.949459,
          'aqi': 249
        },
        {
          'stationId': '1cefbc2c1d3046dc93c4e0103969b98f',
          'stationName': '崇礼滑雪场空气监测站',
          'stationAddress': null,
          'stationTypeName': '污染来源站点',
          'stationStatus': '离线',
          'longitude': 116.500855,
          'latitude': 39.932642,
          'aqi': null
        },
        {
          'stationId': '2',
          'stationName': '宣化空气站',
          'stationAddress': '北京',
          'stationTypeName': '园区监控站点',
          'stationStatus': '在线',
          'longitude': 116.502004,
          'latitude': 39.874192,
          'aqi': 249
        },
        {
          'stationId': '229552a5355d4439ad4d45bf934f1f93',
          'stationName': '张北自建空气站',
          'stationAddress': null,
          'stationTypeName': '道路扬尘监控站点',
          'stationStatus': '离线',
          'longitude': 116.542823,
          'latitude': 39.885266,
          'aqi': null
        },
        {
          'stationId': '4444',
          'stationName': '崇礼区监测站',
          'stationAddress': '廊坊',
          'stationTypeName': '国控站',
          'stationStatus': '在线',
          'longitude': 116.511778,
          'latitude': 39.842289,
          'aqi': 249
        },
        {
          'stationId': '5464',
          'stationName': '万全区监测站',
          'stationAddress': '中山',
          'stationTypeName': '省控站',
          'stationStatus': '在线',
          'longitude': 116.358276,
          'latitude': 39.840073,
          'aqi': 249
        },
        {
          'stationId': '6e977ffe052e475c8a112df3130b0988',
          'stationName': '桥东监测站',
          'stationAddress': '廊坊',
          'stationTypeName': '标准站点',
          'stationStatus': '',
          'longitude': 116.328955,
          'latitude': 39.900766,
          'aqi': 249
        },
        {
          'stationId': '7e191266bb304266b97e10f92722d79b',
          'stationName': '康保县监测站',
          'stationAddress': null,
          'stationTypeName': '基础网格站点',
          'stationStatus': '在线',
          'longitude': 116.325505,
          'latitude': 39.924232,
          'aqi': 249
        }
      ],
      'lastPage': false
    }
  }
}
export default {
  site_kind_lin,
  regin_tree_lin,
  select_point_lin
}
