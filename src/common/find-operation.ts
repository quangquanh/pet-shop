import { Like } from 'typeorm';

export function likeField(value: any) {
  return value ? Like(`%${value}%`) : undefined;
}
