import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Usuario from './Usuario.js';

const Movimentacao = sequelize.define('Movimentacao', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data_movimentacao: {
        type: DataTypes.DATE,
        allowNull: false
    },
    tipo: {
        type: DataTypes.ENUM('entrada', 'saida'),
        allowNull: false
    },
    responsavel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    observacao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

Movimentacao.belongsTo(Usuario, { foreignKey: 'responsavel_id' });

export default Movimentacao;
