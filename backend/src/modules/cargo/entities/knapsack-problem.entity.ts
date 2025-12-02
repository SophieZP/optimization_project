import { CargoItem } from './cargo-item.entity';

export class KnapsackProblem {
  id?: string;
  capacity: number;
  items: CargoItem[];
  createdAt?: Date;
}
