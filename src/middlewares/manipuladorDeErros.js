import mongoose from "mongoose";
import ErrorBase from "../errors/ErrorBase.js";
import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";
import ErrorValidation from "../errors/ErrorValidation.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
  } else if(err instanceof mongoose.Error.ValidationError){    
    new ErrorValidation(err).enviarResposta(res);
  } else if(err instanceof ErrorBase) {
    err.enviarResposta(res);
  }
  else {
    new ErrorBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;