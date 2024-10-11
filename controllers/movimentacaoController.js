import sequelize from '../config/db.js';
import Movimentacao from '../models/Movimentacao.js';
import ItensMovimentacao from '../models/ItensMovimentacao.js';
import Produto from '../models/Produto.js';

export const getMovimentacoes = async (req, res) => {
    try {
        const movimentacoes = await Movimentacao.findAll();
        res.status(200).json(movimentacoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getMovimentacaoById = async (req, res) => {
    try {
        const { id } = req.params;
        const movimentacao = await Movimentacao.findByPk(id);
        if (movimentacao) {
            res.status(200).json(movimentacao);
        } else {
            res.status(404).json({ message: 'Movimentação não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createMovimentacao = async (req, res) => {
    const { data_movimentacao, tipo, responsavel_id, observacao, itens } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const movimentacao = await Movimentacao.create({
            data_movimentacao,
            tipo,
            responsavel_id,
            observacao
        }, { transaction });

        for (const item of itens) {
            const produto = await Produto.findByPk(item.produtoCodigo, { transaction });

            if (!produto) {
                throw new Error(`Produto com código ${item.produtoCodigo} não encontrado`);
            }

            let novoEstoqueAtual;
            if (tipo === 'entrada') {
                novoEstoqueAtual = produto.estoque_atual + parseFloat(item.quantidade);
            } else if (tipo === 'saida') {
                novoEstoqueAtual = produto.estoque_atual - parseFloat(item.quantidade);
                if (novoEstoqueAtual < 0) {
                    throw new Error(`Estoque insuficiente para o produto ${item.produtoNome}`);
                }
            }

            await Produto.update(
                { estoque_atual: novoEstoqueAtual },
                { where: { id: item.produtoCodigo }, transaction }
            );

            await ItensMovimentacao.create({
                movimentacao_id: movimentacao.id,
                produto_id: item.produtoCodigo,
                quantidade: item.quantidade,
                unidade: item.produtoUnidade
            }, { transaction });
        }

        await transaction.commit();

        res.status(201).json(movimentacao);
    } catch (error) {
        await transaction.rollback();
        console.error('Erro ao criar movimentação:', error);
        res.status(400).json({ error: error.message });
    }
};
