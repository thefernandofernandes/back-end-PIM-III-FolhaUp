import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,

} from "typeorm";
import { FolhaPagamento } from "./FolhaPagamento";

@Entity({ schema: 'pim_folhaup', name: 'desconto' })
export class Desconto {

    @PrimaryGeneratedColumn()
    codigodesconto: number;

    @Column()
    folhadepagamento: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    nome: string;

    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
    valor: number;

    @ManyToOne(() => FolhaPagamento)
    @JoinColumn({ name: 'codigodesconto' })
    empresa: FolhaPagamento;


   
}