import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm";
import { Funcionario } from "./Funcionario";

@Entity({ schema: 'pim_folhaup', name: 'departamento' })
export class Departamento {

    @PrimaryGeneratedColumn()
    codigodepartamento: number;

    @Column()
    cnpj: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    nome: string;

    @OneToMany(() => Funcionario, funcionario => funcionario.empresa)
    funcionarios: Funcionario[];

}