import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Grupo = sequelize.define('Grupo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

export default Grupo;