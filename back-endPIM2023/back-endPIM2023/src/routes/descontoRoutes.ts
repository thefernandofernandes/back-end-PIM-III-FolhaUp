import { Express, Request, Response } from 'express';
import myDataSource from '../app-data-source';
import { Desconto } from '../entity/\Desconto';

export function descontoRoutes(app: Express) {
  
    app.get("/descontos", async function (req: Request, res: Response) {
        const descontos = await myDataSource.getRepository(Desconto).find();
        res.json(Desconto);
    });

  app.get("/descontos/:codigodesconto", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Desconto).findOneBy({
        codigodesconto:+req.params.codigodesconto,
    });
    return res.send(results);
  });

  app.post("/descontos", async function (req: Request, res: Response) {
    const descontos = await myDataSource.getRepository(Desconto).create(req.body);
    const results = await myDataSource.getRepository(Desconto).save(descontos);
    return res.send(results);
  });

  app.put("/descontos/:codigodesconto", async function (req: Request, res: Response) {
    const descontos = await myDataSource.getRepository(Desconto).findOneBy({
        codigodesconto:+req.params.codigodesconto,
    });

    if (descontos) {  
        myDataSource.getRepository(Desconto).merge(descontos, req.body);
        const results = await myDataSource.getRepository(Desconto).save(descontos);
        return res.send(results);
    } else {
        // Tratando o caso em que "desconto" é null.
        res.status(404).send({ message: 'Desconto não encontrada' });
    }
});  

app.delete("/descontos/:codigodesconto", async function (req: Request, res: Response) {
  const results = await myDataSource.getRepository(Desconto).delete(req.params.codigodesconto);
  return res.send(results);
});
  
}