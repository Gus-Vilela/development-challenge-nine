const destroy = require('./PatientDestroy');
const show = require('./PatientShow');
const showAll = require('./PatientShowAll');
const store = require('./PatientStore');
const update = require('./PatientUpdate');

module.exports = {
  destroy,
  showAll,
  show,
  update,
  store,
};
