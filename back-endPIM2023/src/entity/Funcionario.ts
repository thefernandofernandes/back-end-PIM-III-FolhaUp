import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { Empresa } from "./Empresa";

  @Entity('funcionario', { schema: 'pim_folhaup' })
  export class Funcionario extends BaseEntity {

  @PrimaryColumn({ type: 'numeric' })
  cpf: number;

  @Column({ type: 'numeric', precision: 3, scale: 0, nullable: true })
  matricula: number;

  @Column({ type: 'numeric', precision: 14, scale: 0, nullable: true })
  cnpj: number;

  @Column({ type: 'numeric', precision: 3, scale: 0, nullable: true })
  departamento: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  endereco: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  salario: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  cargo: string;

  @Column({ type: 'date', nullable: true })
  dataadmissao: Date;

  @Column({ type: 'date', nullable: true })
  datanascimento: Date;

  @Column({ type: 'varchar', length: 50, nullable: false })
  telefone: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  email: string;

  @ManyToOne(() => Empresa)
  @JoinColumn({ name: 'cnpj' })
  empresa: Empresa;

  


}
