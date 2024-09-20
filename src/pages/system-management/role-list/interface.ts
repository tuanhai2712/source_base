import type { TablePaginationConfig } from 'antd/es/table';

export interface TableParams {
  pagination?: TablePaginationConfig;
  field?: string;
  order?: string;
  filters?: any;
}

export interface IFilter {
  pageSize?: number;
  pageIndex?: number;
  searchTerm?: string;
  orderBy?: string;
  orderByDesc?: string;
  pageOffset?: number;
}
