import ErrorBase from "./ErrorBase.js";

class RequisicaoIncorreta extends ErrorBase{
  constructor(msg = "Um ou mais dados fornecidos estão incorretos"){
    super(msg, 400);
  }
}

export default RequisicaoIncorreta;