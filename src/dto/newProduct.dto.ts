import { Provider } from 'src/providers/Provider.entity';

export class NewProductDto {
  title: string;
  description?: string;
  stock: number;
  poster: string;
  price: number;
  provider: Provider;
}
