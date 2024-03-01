const venda = async (req, res) => {
    const { cliente_id, produto_id, quantidade } = req.body

    try {
        const cliente = await pool.query('Select * from clientes where id = $1', [cliente_id])

        if (cliente.rowCount < 1) {
            return res.status(404).json({mensagem: 'Cliente não existe'})
        }

        const produto = await pool.query('Select * from produtos where id = $1', [produto_id])

        if (produto.rowCount < 1) {
            return res.status(404).json({mensagem: 'Este produto não existe'})
        }

        if(quantidade < 1) {
            return res.status(400).json({mensagem: 'A quantidade é no mínimo um'})
        }

        const query = `
        insert into vendas (cliente_id, produto_id, quantidade)
        values ($1, $2, $3)
        `
        const vendaRealizada = await pool.query(query, [cliente_id, produto_id, quantidade] )

        return res.status(201).json(vendaRealizada.rows[0])
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor'})
        
    }
}

module.exports = {
    venda
}