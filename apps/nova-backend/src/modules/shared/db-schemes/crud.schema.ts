import { Omit, Record } from '@prisma/client/runtime/library';

export interface IDbCrudSchema<
  Table extends Record<string, any>,
  Id extends keyof Table,
  ExcludeId extends boolean = true,
  TableWithoutId = ExcludeId extends true ? Omit<Table, Id> : Table,
  IdType = Table[Id]
> {
  create(data: TableWithoutId): Promise<Table>;
  read(data: { [K in Id]: IdType }): Promise<Table | null>;
  update(data: Partial<TableWithoutId>, id: IdType): Promise<Table>;
  delete(id: IdType): Promise<Table>;
}
