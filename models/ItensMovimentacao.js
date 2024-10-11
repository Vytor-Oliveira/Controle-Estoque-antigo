import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Movimentacao from './Movimentacao.js';
import Produto from './Produto.js';

const ItensMovimentacao = sequelize.define('ItensMovimentacao', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    movimentacao_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Movimentacao,
            key: 'id'
        }
    },
    produto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produto,
            key: 'id'
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unidade: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
});

ItensMovimentacao.belongsTo(Movimentacao, { foreignKey: 'movimentacao_id' });
ItensMovimentacao.belongsTo(Produto, { foreignKey: 'produto_id' });

export default ItensMovimentacao;
