import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsUniqueArray(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isUniqueArray',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any[], args: ValidationArguments) {
          if (!Array.isArray(value)) {
            return false;
          }
          const uniqueIds = new Set(value.map((item) => item.id));
          return uniqueIds.size === value.length;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} contiene elementos duplicados`;
        },
      },
    });
  };
}
