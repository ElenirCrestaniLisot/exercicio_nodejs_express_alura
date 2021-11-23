class Tabelas {
    init(conexao) {
        this.conexao = conexao
        this.criarAtendimento()
    }

    criarAtendimento() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int Not Null Auto_increment, cliente varchar(50) Not Null, pet varchar(20),  servico varchar(20) Not Null, data datetime Not Null, dataCriacao datetime Not Null, status varchar(20)  Not Null,   observacoes text,PRIMARY KEY(id))'
    
        this.conexao.query(sql,(erro) => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('A tabela ATENDIMENTOS foi criada')
            }  
        })
    }
}

module.exports = new Tabelas



