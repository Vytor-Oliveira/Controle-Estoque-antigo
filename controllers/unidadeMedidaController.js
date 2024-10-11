import UnidadeMedida from '../models/UnidadeMedida.js';

export const createUnidadeMedida = async (req, res) => {
  const { nome } = req.body;
  try {
    const newUnidade = await UnidadeMedida.create({ nome });
    res.status(201).json(newUnidade);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllUnidadesMedida = async (req, res) => {
  try {
    const unidades = await UnidadeMedida.findAll();
    res.json(unidades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
