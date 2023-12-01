import { PrimaryGeneratedColumn, Column, Index, Entity } from 'typeorm';

@Entity('TranslateKeys')
export class TranslateKey {
  @PrimaryGeneratedColumn({
    comment: 'Identificador único de la clave de traducción',
  })
  id: number;

  @Index('moduleIdx')
  @Column({
    type: 'varchar',
    length: 50,
    comment: 'Modulo de la clave de traducción',
  })
  module: string;

  @Index('languageIdx')
  @Column({
    type: 'char',
    length: 3,
    comment: 'Idioma de la clave de traducción',
  })
  language: string;

  @Index('keyIdx')
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Clave de traducción',
  })
  key: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Valor de la clave de traducción',
  })
  value: string;
}
