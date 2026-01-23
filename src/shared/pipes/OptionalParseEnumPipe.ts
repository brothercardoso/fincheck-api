import {
  ArgumentMetadata,
  Injectable,
  ParseEnumPipe,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class OptionalParseEnumPipe<
  T extends Record<string, unknown>,
> implements PipeTransform<
  string | undefined,
  Promise<T[keyof T] | undefined>
> {
  private readonly parseEnumPipe: ParseEnumPipe<T>;

  constructor(enumType: T) {
    this.parseEnumPipe = new ParseEnumPipe(enumType);
  }

  async transform(
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): Promise<T[keyof T] | undefined> {
    if (!value) {
      return undefined;
    }
    return this.parseEnumPipe.transform(
      value as unknown as T,
      metadata,
    ) as Promise<T[keyof T]>;
  }
}
