import NotFound from "../errors/NotFound.js";
import { autores, livros } from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;

      next();
    } catch (err) {
      next(err);

    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livrosResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livrosResultado != null) {
        res.status(200).send(livrosResultado);
      } else {
        next(new NotFound("Id do livro não localizado."));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      const livroResultado = await livro.save();
      res.status(201).send(livroResultado.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultado = await livros.findByIdAndUpdate(id, { $set: req.body });
      if (livroResultado != null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new NotFound("Id do livro não localizado."));
      }
    } catch (err) {
      next(err);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultado = await livros.findByIdAndDelete(id);
      if (livroResultado != null) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NotFound("Id do livro não localizado."));
      }
    } catch (err) {
      next(err);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livros
          .find(busca)
          .populate("autor");

        req.resultado = livrosResultado;

        next();
      } else {
        res.status(200).send([]);
      }

    } catch (err) {
      next(err);
    }

  };

}

async function processaBusca(params) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;
  let busca = {};

  if (editora) busca.editora = editora;

  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas && !maxPaginas) busca.numeroPaginas = { $gte: parseInt(minPaginas) };

  if (!minPaginas && maxPaginas) busca.numeroPaginas = { $lte: parseInt(maxPaginas) };

  if (minPaginas && maxPaginas) busca.numeroPaginas = { $gte: parseInt(minPaginas), $lte: parseInt(maxPaginas) };

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }


  }

  return busca;
}

export default LivroController;