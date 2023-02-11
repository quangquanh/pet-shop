export interface FindOptionsOder {
  [key: string]: OrderByValue | FindOptionsOder;
}

export type OrderByValue = 'ASC' | 'DESC' | 'asc' | 'desc';

export interface FindAllDto {
  keyword?: string;
  page?: number;
  limit?: number;
  sort?: FindOptionsOder;
}
