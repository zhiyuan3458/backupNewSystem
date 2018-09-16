const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
  console.log('1243');
});

const models = {
  projects: {
    name: {type: String, require: true},
    path: {type: String, require: true},
    componentName: {type: String, require: true, default: 'mainFrame'},
    iconUrl: {type: String, require: true, default: 'mainFrame'},
    children: [
      {
        path: {type: String, require: true, default: '/index'},
        name: {type: String, require: true},
        iconUrl: {type: String, default: ''},
        componentName: {type: String, require: true},
        meta: {
          title: {type: String, require: true}
        },
        children: [
          {
            path: {type: String, default: '/index'},
            name: {type: String},
            iconUrl: {type: String, default: ''},
            componentName: {type: String}
          }
        ]
      }
    ]
  },
  menus: {
    subsystemId: {type: String, require: true},
    name: {type: String, require: true},
    iconUrl: {type: String, require: true},
    children: [
      {
        name: {type: String, require: true, default: '道路养护系统'},
        iconUrl: {type: String, require: true},
        path: {type: String, require: true},
        componentName: {type: String, require: true},
        meta: {
          title: {type: String}
        }
      }
    ]
  },
  shortcuts: {
    id: {type: String},
    name: {type: String, require: true},
    path: {type: String, require: true},
    iconUrl: {type: String, require: true}
  },
  echartsInfo: {
    title: {type: String, require: true},
    url: {type: String, require: true},
    position: {
      x: {type: Number, require: true},
      y: {type: Number, require: true},
      w: {type: Number, require: true},
      h: {type: Number, require: true},
      i: {type: String, require: true}
    }
  },
  echartData: {
    id: {type: String, require: true},
    xAxis: {type: Array, require: true},
    yAxis: {type: Array, require: true}
  }
};

// 创建一个model，相当于一个表
for (var m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name);
  }
};
