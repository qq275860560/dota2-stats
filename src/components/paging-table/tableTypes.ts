export type TableData = {
  list: any[];
  total?: number;
};

export type PagingParam = {
  pageNum: number;
  pageSize: number;
  callback: (result: TableData) => {};
};
