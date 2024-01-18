import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErrorValidation extends RequisicaoIncorreta {
  constructor(err){
    const mensagensErro = Object.values(err.errors)
      .map(err => err.message)
      .join("; ");
    super(`Os seguintes erros foram encontrados: ${mensagensErro}`);
  }
}

export default ErrorValidation;