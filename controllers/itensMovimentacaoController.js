import ItensMovimentacao from '../models/ItensMovimentacao.js';

export const createItem = async (req, res) => {
    try {
        const item = await ItensMovimentacao.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getItems = async (req, res) => {
    try {
        const items = await ItensMovimentacao.findAll();
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        await ItensMovimentacao.destroy({ where: { id } });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
