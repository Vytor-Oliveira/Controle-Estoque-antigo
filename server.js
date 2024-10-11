import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/db.js';
import usuarioRoutes from './routes/Usuario_routes.js';
import grupoRoutes from './routes/Grupo_routes.js';
import produtoRoutes from './routes/Produto_routes.js';
import movimentacaoRoutes from './routes/Movimentacao_routes.js';
import unidadeMedidaRoutes from './routes/UnidadeMedida_routes.js';
import itensMovimentacaoRoutes from './routes/itensMovimentacao_routes.js';
import UnidadeMedida from './models/UnidadeMedida.js';

const app = express();
const hostname = 'localhost';
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/usuarios', usuarioRoutes);
app.use('/grupos', grupoRoutes);
app.use('/produtos', produtoRoutes);
app.use('/movimentacoes', movimentacaoRoutes);
app.use('/unidades_medida', unidadeMedidaRoutes);
app.use('/itens_movimentacao', itensMovimentacaoRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/test', (req, res) => {
  res.send('Servidor funcionando');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

sequelize.sync()
    .then(async () => {
        console.log("Todos os modelos foram sincronizados com sucesso.");

        const unidadesPredefinidas = [
            { nome: 'Unidade' },
            { nome: 'Caixa' },
            { nome: 'Pacote' },
            { nome: 'Kg' },
            { nome: 'Litro' }
        ];

        for (const unidade of unidadesPredefinidas) {
            await UnidadeMedida.findOrCreate({ where: { nome: unidade.nome } });
        }

        console.log("Unidades de medida predefinidas foram inseridas com sucesso.");

        app.listen(port, () => {
            console.log(`Servidor está rodando em http://${hostname}:${port}/`);
        });
    })
    .catch(error => {
        console.error("Erro ao sincronizar os modelos:", error);
    });
