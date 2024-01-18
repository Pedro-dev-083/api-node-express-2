import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
  try {
    let { limit = 5, page = 1, ordenacao = "_id:-1" } = req.query;

    let [campoOrdenacao, order] = ordenacao.split(":");

    limit = parseInt(limit);
    page = parseInt(page);
    order = parseInt(order);

    const resultado = req.resultado;

    if (limit > 0 && page > 0) {
      const resultadoPaginado = await resultado.find()
        .sort({ [campoOrdenacao]: order })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      res.status(200).json(resultadoPaginado);
    } else {
      next(new RequisicaoIncorreta());
    }
  }
  catch (err) {
    next(err);
  }
}

export default paginar;