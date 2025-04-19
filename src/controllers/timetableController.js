const Timetable = require('../models/timetable');
const Resource = require('../models/resource');

async function createTimetableEntry(data) {
  try {
    const entry = await Timetable.create(data);
    return entry;
  } catch (error) {
    throw error;
  }
}

async function getTimetableByDay(dayOfWeek) {
  try {
    const entries = await Timetable.findAll({ where: { dayOfWeek } });
    return entries;
  } catch (error) {
    throw error;
  }
}

async function updateTimetableEntry(id, data) {
  try {
    const entry = await Timetable.findByPk(id);
    if (!entry) {
      throw new Error('Timetable entry not found');
    }
    await entry.update(data);
    return entry;
  } catch (error) {
    throw error;
  }
}

async function deleteTimetableEntry(id) {
  try {
    const entry = await Timetable.findByPk(id);
    if (!entry) {
      throw new Error('Timetable entry not found');
    }
    await entry.destroy();
    return true;
  } catch (error) {
    throw error;
  }
}

async function createResource(data) {
  try {
    const resource = await Resource.create(data);
    return resource;
  } catch (error) {
    throw error;
  }
}

async function getAllResources() {
  try {
    const resources = await Resource.findAll();
    return resources;
  } catch (error) {
    throw error;
  }
}

async function updateResource(id, data) {
  try {
    const resource = await Resource.findByPk(id);
    if (!resource) {
      throw new Error('Resource not found');
    }
    await resource.update(data);
    return resource;
  } catch (error) {
    throw error;
  }
}

async function deleteResource(id) {
  try {
    const resource = await Resource.findByPk(id);
    if (!resource) {
      throw new Error('Resource not found');
    }
    await resource.destroy();
    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createTimetableEntry,
  getTimetableByDay,
  updateTimetableEntry,
  deleteTimetableEntry,
  createResource,
  getAllResources,
  updateResource,
  deleteResource,
};
