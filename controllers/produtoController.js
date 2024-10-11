import Produto from '../models/Produto.js';
import UnidadeMedida from '../models/UnidadeMedida.js';
import Grupo from '../models/grupo.js';

export const getProdutoById = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findOne({
            where: { id },
            include: [UnidadeMedida, Grupo]
        });
        if (produto) {
            res.status(200).json(produto);
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createProduct = async (req, res) => {
  const { nome, descricao, grupo_id, unidade_medida_id } = req.body;
  try {
    const newProduct = await Produto.create({ nome, descricao, grupo_id, unidade_medida_id });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Produto.findAll({
      include: [Grupo, UnidadeMedida]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, grupo_id, unidade_medida_id } = req.body;
  try {
    const product = await Produto.findByPk(id);
    if (product) {
      product.nome = nome;
      product.descricao = descricao;
      product.grupo_id = grupo_id;
      product.unidade_medida_id = unidade_medida_id;
      await product.save();
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Produto.findByPk(id, {
      include: [Grupo, UnidadeMedida]
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Produto.findByPk(id);
    if (product) {
      await product.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
