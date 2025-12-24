import { Record } from '@prisma/client/runtime/library';

export interface IDbFindSchema<
  Table extends Record<string, any>,
  KeyWord extends keyof Table,
  Id extends keyof Table,
  WhereInput extends object,
> {
  findMany(where: WhereInput): Promise<Table[] | null>;
  findByKeyWord(data: {
    [K in KeyWord]: Table[KeyWord];
  }): Promise<Table[] | null>;
  findByid(id: Table[Id]): Promise<Table | null>;
}
