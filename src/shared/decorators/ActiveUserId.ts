import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ActiveUserId = createParamDecorator<undefined>(
  (_data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<{ userId: string }>();
    return request.userId;
  },
);
