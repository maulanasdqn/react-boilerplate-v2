export type MetaTypes = {
  page?: number;
  rowCount?: number;
  start?: string;
  end?: string;
  query?: string;
  tipeStorage?: string;
  availablePage?: number;
};

export interface CommonResponse<CommonTypes> {
  items: CommonTypes[];
  pages: number;
  page: number;
  size: number;
}
