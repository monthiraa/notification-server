const express = require("express");
const bodyParser = require('body-parser')
const async = require("async")
const uuid = require('uuid');
const app = express();
const serviceController = require('./controller/serviceController');
require('./server/server')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/service', async (req, res) => {
  try {
    const isService = await serviceController.checkServiceName(req.body.name);
    const serviceKey = uuid(req.body.name);
    const secretKey = uuid();
    req.body.serviceKey = serviceKey;
    req.body.secretKey = secretKey;
    const newService = await serviceController.createService(req.body);
    res.status(200).send(newService);
  } catch (err) {
    res.status(500).send({
      error: {
        code: 500,
        message: err.message
      }
    })
  }
})

app.post('/pushSingle', async (req, res) => {
  let noti;
  try {
    if (!req.body.deviceToken || !req.body.platform) {
      res.status(500).send({
        error: {
          code: 500,
          message: 'deviceToken or platform not found'
        }
      })
    }
    const queryService = {
      serviceKey: req.body.serviceKey,
      secretKey: req.body.secretKey,
    }
    const isService = await serviceController.checkService(queryService);
    if (req.body.platform === 'ios') {
      noti = await pushIos(req.body, isService);
    } else {
      noti = await pushAndroid(req.body, isService);
    }
    res.status(200).send(noti);
  } catch (err) {
    res.status(500).send({
      error: {
        code: 500,
        message: err.message
      }
    })
  }
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
