import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432, // definido no docker-compose
  username: 'postgres',
  password: 'docker',
  database: 'devtraining',
  entities: [],
  synchronize: true, // pega as entidades e cria as tabelas, mas quem cria de fato será nossa migration
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          ...dataSourceOptions,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
