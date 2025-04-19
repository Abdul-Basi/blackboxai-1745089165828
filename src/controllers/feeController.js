const Fee = require('../models/fee');

async function createFee(data) {
  try {
    const fee = await Fee.create(data);
    return fee;
  } catch (error) {
    throw error;
  }
}

async function getFeesByStudent(studentId) {
  try {
    const fees = await Fee.findAll({ where: { studentId } });
    return fees;
  } catch (error) {
    throw error;
  }
}

async function updateFee(id, data) {
  try {
    const fee = await Fee.findByPk(id);
    if (!fee) {
      throw new Error('Fee record not found');
    }
    await fee.update(data);
    return fee;
  } catch (error) {
    throw error;
  }
}

async function deleteFee(id) {
  try {
    const fee = await Fee.findByPk(id);
    if (!fee) {
      throw new Error('Fee record not found');
    }
    await fee.destroy();
    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createFee,
  getFeesByStudent,
  updateFee,
  deleteFee,
};
