import { Express, Request, Response } from 'express';
import myDataSource from '../app-data-source';
import { Beneficio } from '../entity/\Beneficio';

export function beneficioRoutes(app: Express) {
  
  app.get("/beneficio", async function (req: Request, res: Response) {
      const beneficio = await myDataSource.getRepository(Beneficio).find();
      res.json(beneficio);
  });

  app.get("/beneficio/:codigobeneficio", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Beneficio).findOneBy({
        codigobeneficio: +req.params. codigobeneficio,
    });
    return res.send(results);
  });

  app.post("/beneficio", async function (req: Request, res: Response) {
    const beneficio = await myDataSource.getRepository(Beneficio).create(req.body);
    const results = await myDataSource.getRepository(Beneficio).save(beneficio);
    return res.send(results);
  });

  app.put("/beneficio/:codigobeneficio", async function (req: Request, res: Response) {
    const beneficio = await myDataSource.getRepository(Beneficio).findOneBy({
        codigobeneficio: +req.params.codigobeneficio,
    });

    if (beneficio) {  
        myDataSource.getRepository(Beneficio).merge(beneficio, req.body);
        const results = await myDataSource.getRepository(Beneficio).save(beneficio);
        return res.send(results);
    } else {
        // Tratando o caso em que "beneficio" é null.
        res.status(404).send({ message: 'Beneficio não encontrada' });
    }
});  

app.delete("/beneficio/:codigobeneficio", async function (req: Request, res: Response) {
  const results = await myDataSource.getRepository(Beneficio).delete(req.params.codigobeneficio);
  return res.send(results);
});
  
}