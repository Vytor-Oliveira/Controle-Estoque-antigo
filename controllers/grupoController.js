import Grupo from '../models/grupo.js';

export const createGroup = async (req, res) => {
  const { nome } = req.body;
  try {
    const newGroup = await Grupo.create({ nome });
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllGroups = async (req, res) => {
  try {
    const groups = await Grupo.findAll();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGroupById = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Grupo.findByPk(id);
    if (group) {
      res.json(group);
    } else {
      res.status(404).json({ error: 'Group not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateGroup = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  try {
    const group = await Grupo.findByPk(id);
    if (group) {
      await group.update({ nome });
      res.json(group);
    } else {
      res.status(404).json({ error: 'Group not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Grupo.findByPk(id);
    if (group) {
      await group.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Group not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
