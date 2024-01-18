import NotFound from "../errors/NotFound.js";

function manipulador404(req, res, next){
  const err404 = new NotFound();
  next(err404);
}

export default manipulador404;