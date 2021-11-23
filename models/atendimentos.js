/*const { json } = require('express')*/
/*const { json } = require('body-parser/')*/
const moment = require('moment')
const atendimento = require('../controllers/atendimento')
const conexao = require('../infraestrutura/conexao')


class Atendimento {
    adiciona(atendimento,res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

        /** Tratamento de regras de negócio para as validacoes - Inicio*/
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido:dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido:clienteEhValido,
                mensagem: 'Cliente deve ter menos menos 5 caracteres'
            } 
        ]


        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

         /** Tratamento de regras de negócio para as validacoes - Fim*/

        if (existemErros) {
            res.status(400).json(erros)    
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
        
            const sql = 'INSERT INTO Atendimentos SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                     res.status(400).json(erro)
                } else {
                     res.status(201).json(atendimentoDatado)
                }
            })
        }
    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => { 
            if(erro) {
                res.status(400).json(erro)
            } else { 
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }      
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta (id, res) {
        const sql ='DELETE FROM atendimentos WHERE ID=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
               res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento;
