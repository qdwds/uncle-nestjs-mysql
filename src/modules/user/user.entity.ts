import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: "user"
})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string

    @Column()
    isDisplay: string

    @Column()
    username: string

    @Column()
    password: string

    @CreateDateColumn()
    createDate: string

    @UpdateDateColumn()
    updateDate: string
}