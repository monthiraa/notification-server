const Service = require('../models/service');

function checkService(serviceData) {
  const service = Service.findOne(serviceData);
  if (service !== null) {
    return service;
  } else {
    throw new Error("Service not found")
  }
}

function checkServiceName(serviceName) {
  const service = Service.findOne({
    name: serviceName
  });
  if (service) {
    return service;
  } else {
    throw new Error("Service Already")
  }
}

function createService(serviceData) {
  const service = Service.create(serviceData);
  return service;
}

module.exports = {
  checkService,
  checkServiceName,
  createService,
}
