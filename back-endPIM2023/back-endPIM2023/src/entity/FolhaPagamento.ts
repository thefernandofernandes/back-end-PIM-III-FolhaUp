import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    
} from "typeorm";
import { Funcionario } from "./Funcionario";

@Entity({ schema: 'pim_folhaup', name: 'folhadepagamento' })
export class FolhaPagamento {

    @PrimaryGeneratedColumn()
    codigofolha: number;

    @Column()
    funcionario: number;

    @Column({ type: 'numeric', precision: 2, scale: 0, nullable: true })
    mes: number;

    @Column({ type: 'numeric', precision: 4, scale: 0, nullable: true })
    ano: number;

    @Column({ type: 'numeric', precision: 2, scale: 0, nullable: true })
    diastrabalho: number;

    @Column({ type: 'numeric', precision: 4, scale: 0, nullable: true })
    horastrabalho: number;
 
    @OneToMany(() => Funcionario, funcionario => funcionario.empresa)
    funcionarios: Funcionario[];
    


}
