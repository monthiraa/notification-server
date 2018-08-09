const apn = require('apn');
const gcm = require('node-gcm');

//Replace your developer API key with GCM enabled here
const serviceAndroid = new gcm.Sender('YOUR_API_KEY_HERE');

const serviceIos = new apn.Provider({
  cert: "certificates/cert.pem",
  key: "certificates/key.pem",
});

async function sendIos(notiData, service) {

  let notification = new apn.Notification();
  notification.message = notiData.message;
  notification.topic = service.name;
  notification.badge = 3;

  const deviceId = [notiData.deviceToken];//Add your mobile device registration tokens here
  // notification.sound = "ping.aiff";
  // notification.alert = "You have a new message";
  const pushIos = await service.send(notification, deviceId)
  service.shutdown();
  return pushIos;
}

async function sendAndroid(notiData, service) {
  const message = new gcm.Message();
  message.addNotification('title', service.name);
  message.addNotification('body', notiData.message);
  const deviceId = [notiData.deviceToken];//Add your mobile device registration tokens here
  const pushAndroid = await sender.send(message, deviceId)
  return pushAndroid;
}

module.exports = {
  sendIos,
  sendAndroid
}
