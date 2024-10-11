import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const UnidadeMedida = sequelize.define('UnidadeMedida', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});

export default UnidadeMedida;
