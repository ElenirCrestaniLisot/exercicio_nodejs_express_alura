const customExpress = require('./config/customexpress');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/tabelas')

conexao.connect(erro => {
    if(erro) {
        console.log(erro)
    }else {
        console.log ('conectou ok no Mysql')
        Tabelas.init(conexao)
        const app = customExpress();

        app.listen(3000, () =>
        console.log('servidor rodando na porta 3007 do note da Elen na sexta feira com Hudson'));
    }
})




