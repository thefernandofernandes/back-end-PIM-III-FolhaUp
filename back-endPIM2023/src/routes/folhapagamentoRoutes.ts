import { Express, Request, Response } from 'express';
import myDataSource from '../app-data-source';
import { FolhaPagamento } from '../entity/\FolhaPagamento';

export function folhapagamentoRoutes(app: Express) {
  
  app.get("/folhadepagamento", async function (req: Request, res: Response) {
      const folhadepagamento = await myDataSource.getRepository(FolhaPagamento).find();
      res.json(folhadepagamento);
  });

  app.get("/folhadepagamento/:codigofolha", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(FolhaPagamento).findOneBy({
        codigofolha:+req.params.codigofolha,
    });
    return res.send(results);
  });

  app.post("/folhadepagamento", async function (req: Request, res: Response) {
    const folhadepagamento = await myDataSource.getRepository(FolhaPagamento).create(req.body);
    const results = await myDataSource.getRepository(FolhaPagamento).save(folhadepagamento);
    return res.send(results);
  });

  app.put("/folhadepagamento/:codigofolha", async function (req: Request, res: Response) {
    const folhadepagamento = await myDataSource.getRepository(FolhaPagamento).findOneBy({
        codigofolha:+req.params.codigofolha,
    });

    if (folhadepagamento) {  
        myDataSource.getRepository(FolhaPagamento).merge(folhadepagamento, req.body);
        const results = await myDataSource.getRepository(FolhaPagamento).save(folhadepagamento);
        return res.send(results);
    } else {
        // Tratando o caso em que "folhapagamento" é null.
        res.status(404).send({ message: 'FolhaPagamento não encontrada' });
    }
});  

app.delete("/folhadepagamento/:codigofolha", async function (req: Request, res: Response) {
  const results = await myDataSource.getRepository(FolhaPagamento).delete(req.params.codigofolha);
  return res.send(results);
});
  
}