import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class HasUniqueIds implements ValidatorConstraintInterface {
    validate(items: any[], args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
