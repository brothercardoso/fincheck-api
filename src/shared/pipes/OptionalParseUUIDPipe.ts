import {
  ArgumentMetadata,
  Injectable,
  ParseUUIDPipe,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class OptionalParseUUIDPipe implements PipeTransform<
  string | undefined
> {
  private readonly parseUUIDPipe = new ParseUUIDPipe();

  async transform(
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): Promise<string | undefined> {
    if (!value) {
      return undefined;
    }
    return this.parseUUIDPipe.transform(value, metadata);
  }
}
