import { Express, Request, Response } from 'express';
import myDataSource from '../app-data-source';
import { Empresa } from '../entity/Empresa';

export function empresaRoutes(app: Express) {
  
  app.get("/empresas", async function (req: Request, res: Response) {
      const empresas = await myDataSource.getRepository(Empresa).find();
      res.json(empresas);
  });

  app.get("/empresas/:cnpj", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Empresa).findOneBy({
      cnpj: +req.params.cnpj,
    });
    return res.send(results);
  });

  app.post("/empresas", async function (req: Request, res: Response) {
    const empresa = await myDataSource.getRepository(Empresa).create(req.body);
    const results = await myDataSource.getRepository(Empresa).save(empresa);
    return res.send(results);
  });

  app.put("/empresas/:cnpj", async function (req: Request, res: Response) {
    const empresa = await myDataSource.getRepository(Empresa).findOneBy({
        cnpj: +req.params.cnpj,
    });

    if (empresa) {  
        myDataSource.getRepository(Empresa).merge(empresa, req.body);
        const results = await myDataSource.getRepository(Empresa).save(empresa);
        return res.send(results);
    } else {
        // Tratando o caso em que "empresa" é null.
        res.status(404).send({ message: 'Empresa não encontrada' });
    }
});  

app.delete("/empresas/:cnpj", async function (req: Request, res: Response) {
  const results = await myDataSource.getRepository(Empresa).delete(req.params.cnpj);
  return res.send(results);
});
  
}
