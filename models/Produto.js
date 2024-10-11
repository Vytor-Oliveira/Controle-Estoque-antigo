import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import UnidadeMedida from './UnidadeMedida.js';
import Grupo from './Grupo.js';

const Produto = sequelize.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estoque_atual: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    unidade_medida_id: {
        type: DataTypes.INTEGER,
        references: {
            model: UnidadeMedida,
            key: 'id'
        }
    },
    grupo_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Grupo,
            key: 'id'
        }
    }
});

Produto.belongsTo(UnidadeMedida, { foreignKey: 'unidade_medida_id' });
Produto.belongsTo(Grupo, { foreignKey: 'grupo_id' });

export default Produto;
