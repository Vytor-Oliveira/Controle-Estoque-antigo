import Usuario from '../models/Usuario.js';
import sequelize from '../config/db.js'; // Importar sequelize

// Função para realizar o login do usuário
export const login = async (req, res) => {
    const { nome, senha } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { nome, senha } });

        if (!usuario) {
            console.log(`Usuário não encontrado ou senha incorreta: ${nome}`);
            return res.status(404).json({ error: 'Usuário não encontrado ou senha incorreta' });
        }

        console.log('Login bem-sucedido');
        res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).json({ error: 'Erro ao realizar login' });
    }
};

// Função para criar usuário de teste
const criarUsuarioTeste = async () => {
    await sequelize.sync({ alter: true });

    const nome = 'admin';
    const senha = 'senha';

    try {
        await Usuario.findOrCreate({
            where: { nome },
            defaults: {
                nome,
                email: 'admin@example.com',
                senha
            }
        });

        console.log('Usuário de teste criado.');
    } catch (error) {
        console.error('Erro ao criar usuário de teste:', error);
    }
};

criarUsuarioTeste(); // Chamar a função para garantir que o usuário de teste é criado
