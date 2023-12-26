import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export function IsNotNegative(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isNotNegative',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value >= 0; // Kiểm tra xem giá trị có lớn hơn hoặc bằng 0 không
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must not be negative number`;
        },
      },
    });
  };
}
