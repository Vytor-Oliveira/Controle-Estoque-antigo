$(document).ready(function(){
    // Initialize Bootstrap dropdown
    $('.dropdown-toggle').dropdown();

    // Função para buscar dados da movimentação
    function fetchMovimentacoes() {
        $.ajax({
            url: 'http://localhost:3000/movimentacoes',
            method: 'GET',
            success: function(data) {
                const movimentacaoTableBody = $('#movimentacaoTableBody');
                movimentacaoTableBody.empty();
                data.forEach(movimentacao => {
                    const row = `
                        <tr>
                            <td>${movimentacao.id}</td>
                            <td>${movimentacao.data_movimentacao}</td>
                            <td>${movimentacao.tipo}</td>
                            <td>${movimentacao.responsavel_id}</td>
                            <td>${movimentacao.observacao}</td>
                            <td>
                                <button class="btn btn-primary visualizarBtn" data-id="${movimentacao.id}">Visualizar</button>
                            </td>
                        </tr>
                    `;
                    movimentacaoTableBody.append(row);
                });
            },
            error: function(error) {
                console.error('Erro ao buscar movimentações:', error);
            }
        });
    }

    // Função para buscar detalhes da movimentação por ID
    function fetchMovimentacaoById(id) {
        $.ajax({
            url: `http://localhost:3000/movimentacoes/${id}`,
            method: 'GET',
            success: function(movimentacao) {
                $('#visualizarId').val(movimentacao.id);
                $('#visualizarDataMovimentacao').val(movimentacao.data_movimentacao);
                $('#visualizarTipo').val(movimentacao.tipo);
                $('#visualizarResponsavel').val(movimentacao.responsavel_id);
                $('#visualizarObservacao').val(movimentacao.observacao);
                $('#visualizarMovimentacaoModal').modal('show');
            },
            error: function(error) {
                console.error('Erro ao buscar movimentação:', error);
            }
        });
    }

    // Evento para abrir o modal de visualização
    $(document).on('click', '.visualizarBtn', function() {
        const id = $(this).data('id');
        fetchMovimentacaoById(id);
    });

    // Função para buscar grupos
    function fetchGroups() {
        $.ajax({
            url: 'http://localhost:3000/grupos',
            method: 'GET',
            success: function(data) {
                const grupoSelect = $('#grupo, #alterarGrupo');
                grupoSelect.empty();
                data.forEach(grupo => {
                    grupoSelect.append(new Option(grupo.nome, grupo.id));
                });
            },
            error: function(error) {
                console.error('Erro ao buscar grupos:', error);
            }
        });
    }

    // Função para buscar unidades de medida
    function fetchUnidadesMedida() {
        $.ajax({
            url: 'http://localhost:3000/unidades_medida',
            method: 'GET',
            success: function(data) {
                const unidadeSelect = $('#unidade, #alterarUnidade');
                unidadeSelect.empty();
                data.forEach(unidade => {
                    unidadeSelect.append(new Option(unidade.nome, unidade.id));
                });
            },
            error: function(error) {
                console.error('Erro ao buscar unidades de medida:', error);
            }
        });
    }

    // Função para buscar produtos
    function fetchProducts() {
        $.ajax({
            url: 'http://localhost:3000/produtos',
            method: 'GET',
            success: function(data) {
                const produtosTableBody = $('#produtosTableBody');
                produtosTableBody.empty();
                data.forEach(produto => {
                    const row = `
                        <tr>
                            <td><input type="checkbox" class="produtoCheckbox" data-id="${produto.id}"></td>
                            <td>${produto.id}</td>
                            <td>${produto.nome}</td>
                            <td>${produto.UnidadeMedida ? produto.UnidadeMedida.nome : ''}</td>
                            <td>${produto.Grupo ? produto.Grupo.nome : ''}</td>
                            <td>${produto.estoque_atual}</td>
                        </tr>
                    `;
                    produtosTableBody.append(row);
                });
            },
            error: function(error) {
                console.error('Erro ao buscar produtos:', error);
            }
        });
    }

    fetchMovimentacoes();
    fetchGroups();
    fetchUnidadesMedida();
    fetchProducts();

    // Handle the inclusion of a new product
    $('#incluirProdutoForm').on('submit', function(event){
        event.preventDefault();

        const nome = $('#nome').val();
        const unidade_medida_id = $('#unidade').val();
        const grupo_id = $('#grupo').val();

        if (nome && unidade_medida_id && grupo_id) {
            $.ajax({
                url: 'http://localhost:3000/produtos',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ nome, unidade_medida_id, grupo_id }),
                success: function() {
                    alert('Produto incluído com sucesso!');
                    fetchProducts();
                    $('#incluirProdutoForm')[0].reset();
                    $('#incluirProdutoModal').modal('hide');
                },
                error: function(error) {
                    console.error('Erro ao incluir produto:', error);
                    alert('Erro ao incluir produto');
                }
            });
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Handle the inclusion of a new group
    $('#incluirGrupoForm').on('submit', function(event){
        event.preventDefault();

        const nome = $('#nomeGrupo').val();

        if (nome) {
            $.ajax({
                url: 'http://localhost:3000/grupos',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ nome }),
                success: function() {
                    alert('Grupo incluído com sucesso!');
                    fetchGroups();
                    $('#incluirGrupoForm')[0].reset();
                    $('#incluirGrupoModal').modal('hide');
                },
                error: function(error) {
                    console.error('Erro ao incluir grupo:', error);
                    alert('Erro ao incluir grupo');
                }
            });
        } else {
            alert('Por favor, preencha o nome do grupo.');
        }
    });

    // Handle product update
    $('#alterarProdutoForm').on('submit', function(event) {
        event.preventDefault();

        const id = $('#produtoId').val();
        const nome = $('#alterarNome').val();
        const unidade_medida_id = $('#alterarUnidade').val();
        const grupo_id = $('#alterarGrupo').val();

        if (id && nome && unidade_medida_id && grupo_id) {
            $.ajax({
                url: `http://localhost:3000/produtos/${id}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ nome, unidade_medida_id, grupo_id }),
                success: function() {
                    alert('Produto atualizado com sucesso!');
                    fetchProducts();
                    $('#alterarProdutoForm')[0].reset();
                    $('#alterarProdutoModal').modal('hide');
                },
                error: function(error) {
                    console.error('Erro ao atualizar produto:', error);
                    alert('Erro ao atualizar produto');
                }
            });
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Handle product delete
    $('#excluirProdutoBtn').click(function() {
        const selectedProducts = $('.produtoCheckbox:checked').map(function() {
            return $(this).data('id');
        }).get();

        if (selectedProducts.length > 0) {
            if (confirm('Tem certeza que deseja excluir os produtos selecionados?')) {
                selectedProducts.forEach(id => {
                    $.ajax({
                        url: `http://localhost:3000/produtos/${id}`,
                        method: 'DELETE',
                        success: function() {
                            fetchProducts();
                        },
                        error: function(error) {
                            console.error('Erro ao excluir produto:', error);
                            alert('Erro ao excluir produto');
                        }
                    });
                });
                alert('Produtos excluídos com sucesso!');
            }
        } else {
            alert('Por favor, selecione pelo menos um produto.');
        }
    });

    // Pre-fill the update form when the update button is clicked
    $('#alterarProdutoBtn').click(function() {
        const selectedProducts = $('.produtoCheckbox:checked').map(function() {
            return $(this).data('id');
        }).get();

        if (selectedProducts.length === 1) {
            const productId = selectedProducts[0];

            $.ajax({
                url: `http://localhost:3000/produtos/${productId}`,
                method: 'GET',
                success: function(product) {
                    $('#produtoId').val(product.id);
                    $('#alterarNome').val(product.nome);
                    $('#alterarUnidade').val(product.unidade_medida_id);
                    $('#alterarGrupo').val(product.grupo_id);
                    $('#alterarProdutoModal').modal('show');
                },
                error: function(error) {
                    console.error('Erro ao buscar produto:', error);
                    alert('Erro ao buscar produto');
                }
            });
        } else {
            alert('Por favor, selecione exatamente um produto para alterar.');
        }
    });

    // Selecionar/Deselecionar todos os checkboxes
    $('#selectAll').click(function(){
        $('tbody input[type="checkbox"]').prop('checked', this.checked);
    });

    // Atualizar produtos na inicialização da página
    $('#atualizarProdutos').click(function(){
        fetchProducts();
    });

    // Atualizar produtos automaticamente na inicialização da página
    fetchProducts();

    // ESTOQUE.HTML JAVASCRIPT
    let itensMovimentacao = [];

    function buscarProdutoPorId(id) {
        $.ajax({
            url: `http://localhost:3000/produtos/${id}`,
            method: 'GET',
            success: function(produto) {
                $('#produtoNome').val(produto.nome);
                $('#produtoUnidade').val(produto.UnidadeMedida ? produto.UnidadeMedida.nome : '');
            },
            error: function(error) {
                console.error('Erro ao buscar produto:', error);
                alert('Erro ao buscar produto');
                $('#produtoNome').val('');
                $('#produtoUnidade').val('');
            }
        });
    }

    $('#produtoCodigo').on('change', function() {
        const produtoId = $(this).val();
        if (produtoId) {
            buscarProdutoPorId(produtoId);
        } else {
            $('#produtoNome').val('');
            $('#produtoUnidade').val('');
        }
    });

    $('#adicionarProduto').click(function() {
        const produtoCodigo = $('#produtoCodigo').val();
        const produtoNome = $('#produtoNome').val();
        const produtoUnidade = $('#produtoUnidade').val();
        const quantidade = $('#quantidade').val();

        if (!produtoCodigo || !quantidade) {
            alert('Por favor, preencha o código do produto e a quantidade.');
            return;
        }

        const item = {
            produtoCodigo,
            produtoNome,
            produtoUnidade,
            quantidade
        };
        itensMovimentacao.push(item);
        atualizarTabelaItens();
        limparCamposProduto();
    });

    function atualizarTabelaItens() {
        const tabelaItens = $('#itensMovimentacao');
        tabelaItens.empty();
        itensMovimentacao.forEach((item, index) => {
            const row = `
                <tr>
                    <td><input type="checkbox" class="itemCheckbox" data-index="${index}"></td>
                    <td>${item.produtoCodigo}</td>
                    <td>${item.produtoNome}</td>
                    <td>${item.produtoUnidade}</td>
                    <td>${item.quantidade}</td>
                </tr>
            `;
            tabelaItens.append(row);
        });
    }

    function limparCamposProduto() {
        $('#produtoCodigo').val('');
        $('#produtoNome').val('');
        $('#produtoUnidade').val('');
        $('#quantidade').val('');
    }

    $('#confirmarMovimentacao').click(function() {
        const dataMovimentacao = $('#data').val();
        const tipo = $('#tipo').val();
        const motivo = $('#motivo').val();
        const observacao = $('#observacao').val();
        const responsavelId = 1;

        if (!dataMovimentacao || itensMovimentacao.length === 0) {
            alert('Por favor, preencha a data da movimentação e adicione ao menos um item.');
            return;
        }

        const movimentacao = {
            data_movimentacao: dataMovimentacao,
            tipo,
            motivo,
            observacao,
            responsavel_id: responsavelId,
            itens: itensMovimentacao
        };

        console.log('Movimentação enviada:', movimentacao);

        $.ajax({
            url: 'http://localhost:3000/movimentacoes',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(movimentacao),
            success: function() {
                alert('Movimentação confirmada com sucesso!');
                $('#movimentacaoEstoqueForm')[0].reset();
                $('#movimentacaoEntradaModal').modal('hide');
                itensMovimentacao = [];
                atualizarTabelaItens();
            },
            error: function(error) {
                console.error('Erro ao confirmar movimentação:', error);
                alert('Erro ao confirmar movimentação');
            }
        });
    });
});
