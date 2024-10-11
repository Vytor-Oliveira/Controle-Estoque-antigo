@echo off
pm2 start C:\Users\Cliente\Desktop\ControleEstoque\server.js --name "controleEstoque"
pm2 save
