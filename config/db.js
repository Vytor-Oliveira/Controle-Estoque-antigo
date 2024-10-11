import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('controleEstoque', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306, // Verifique se a porta está correta
    logging: false, // Desativar logging de SQL se necessário
});

export default sequelize;
