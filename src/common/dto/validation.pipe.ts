import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { FindOptionsOder } from './find.dto';

@Injectable()
export class FindOptionsOrderPipe
  implements PipeTransform<string, FindOptionsOder>
{
  transform(value: string, metadata: ArgumentMetadata): FindOptionsOder {
    try {
      const orders = value.split(','),
        result = {};
      for (const order of orders) {
        const [field, direction] = order.trim().split(':');
        result[field] = direction;
      }
      return result;
    } catch (error) {
      return null;
    }
  }
}
