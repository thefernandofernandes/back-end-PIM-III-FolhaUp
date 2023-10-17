import { Express, Request, Response } from 'express';
import myDataSource from '../app-data-source';
import { Desconto } from '../entity/\Desconto';

export function descontoRoutes(app: Express) {
  
  app.get("/desconto", async function (req: Request, res: Response) {
      const desconto = await myDataSource.getRepository(Desconto).find();
      res.json(desconto);
  });

  app.get("/desconto/:codigodesconto", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Desconto).findOneBy({
      codigodesconto: +req.params. codigodesconto,
    });
    return res.send(results);
  });

  app.post("/desconto", async function (req: Request, res: Response) {
    const desconto = await myDataSource.getRepository(Desconto).create(req.body);
    const results = await myDataSource.getRepository(Desconto).save(desconto);
    return res.send(results);
  });

  app.put("/desconto/:codigodesconto", async function (req: Request, res: Response) {
    const desconto = await myDataSource.getRepository(Desconto).findOneBy({
      codigodesconto: +req.params. codigodesconto,
    });

    if (desconto) {  
        myDataSource.getRepository(Desconto).merge(desconto, req.body);
        const results = await myDataSource.getRepository(Desconto).save(desconto);
        return res.send(results);
    } else {
        // Tratando o caso em que "desconto" é null.
        res.status(404).send({ message: 'Desconto não encontrada' });
    }
});  

app.delete("/desconto/:codigodesconto", async function (req: Request, res: Response) {
  const results = await myDataSource.getRepository(Desconto).delete(req.params.codigodesconto);
  return res.send(results);
});
  
}