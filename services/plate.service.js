const Plate = require('../models/Plate');

exports.findPlates = async (filters) => {
  const { plate = '', province = '', type = '' } = filters;

  const query = {
    plate: { $regex: plate, $options: 'i' },
    province: { $regex: province, $options: 'i' }
  };

  if (type) query.type = type;

  return Plate.find(query);
};

exports.createPlate = async (data) => {
  return Plate.create(data);
};

exports.updatePlate = async (id, data) => {
  return Plate.findByIdAndUpdate(id, data, { new: true });
};

exports.deletePlate = async (id) => {
  return Plate.findByIdAndDelete(id);
};
