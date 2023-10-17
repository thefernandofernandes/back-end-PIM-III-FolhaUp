import { Express, Request, Response } from 'express';
import myDataSource from '../app-data-source';
import { Funcionario } from '../entity/Funcionario';

export function funcionarioRoutes(app: Express) {
  
  app.get("/funcionarios", async function (req: Request, res: Response) {
      const funcionarios = await myDataSource.getRepository(Funcionario).find();
      res.json(funcionarios);
  });

  app.get("/funcionarios/:cpf", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Funcionario).findOneBy({
      cpf: +req.params.cpf,
    });
    return res.send(results);
  });

  app.post("/funcionarios", async function (req: Request, res: Response) {
    const funcionario = await myDataSource.getRepository(Funcionario).create(req.body);
    const results = await myDataSource.getRepository(Funcionario).save(funcionario);
    return res.send(results);
  });

  app.put("/funcionarios/:cpf", async function (req: Request, res: Response) {
    const funcionario = await myDataSource.getRepository(Funcionario).findOneBy({
        cpf: +req.params.cpf,
    });

    if (funcionario) {  
        myDataSource.getRepository(Funcionario).merge(funcionario, req.body);
        const results = await myDataSource.getRepository(Funcionario).save(funcionario);
        return res.send(results);
    } else {
        // Tratando o caso em que "funcionario" é null.
        res.status(404).send({ message: 'Funcionário não encontrado' });
    }
});  

app.delete("/funcionarios/:cpf", async function (req: Request, res: Response) {
  const results = await myDataSource.getRepository(Funcionario).delete(req.params.cpf);
  return res.send(results);
});
  
}
