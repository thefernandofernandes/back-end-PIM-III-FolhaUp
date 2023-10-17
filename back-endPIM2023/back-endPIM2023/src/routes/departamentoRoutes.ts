import { Express, Request, Response } from 'express';
import myDataSource from '../app-data-source';
import { Departamento } from '../entity/Departamento';

export function departamentoRoutes(app: Express) {
  
  app.get("/departamento", async function (req: Request, res: Response) {
      const departamento = await myDataSource.getRepository(Departamento).find();
      res.json(departamento);
  });

  app.get("/departamento/:codigodepartamento", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Departamento).findOneBy({
        codigodepartamento: +req.params.codigodepartamento,
    });
    return res.send(results);
  });

  app.post("/departamento", async function (req: Request, res: Response) {
    const departamento = await myDataSource.getRepository(Departamento).create(req.body);
    const results = await myDataSource.getRepository(Departamento).save(departamento);
    return res.send(results);
  });

  app.put("/departamento/:codigodepartamento", async function (req: Request, res: Response) {
    const departamento = await myDataSource.getRepository(Departamento).findOneBy({
        cnpj: +req.params.cnpj,
    });

    if (departamento) {  
        myDataSource.getRepository(Departamento).merge(departamento, req.body);
        const results = await myDataSource.getRepository(Departamento).save(departamento);
        return res.send(results);
    } else {
        // Tratando o caso em que "departamento" é null.
        res.status(404).send({ message: 'Departamento não encontrada' });
    }
});  

app.delete("/departamento/:codigodepartamento", async function (req: Request, res: Response) {
  const results = await myDataSource.getRepository(Departamento).delete(req.params.codigodepartamento);
  return res.send(results);
});
  
}