import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(
    value: any,
    metadata: ArgumentMetadata,
  ): Promise<any | never> {
    const obj = plainToClass(metadata.metatype, value);
    const arrayOfErrors = await validate(obj);

    if (arrayOfErrors.length) {
      const messages = arrayOfErrors.map((error) => {
        return `${error.property} - ${Object.values(error.constraints).join(
          ', ',
        )}`;
      });
      throw new ValidationException(JSON.stringify(messages));
    }
    return value;
  }
}
