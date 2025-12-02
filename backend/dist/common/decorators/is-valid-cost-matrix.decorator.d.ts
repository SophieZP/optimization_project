import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsValidCostMatrix implements ValidatorConstraintInterface {
    validate(costs: number[][], args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
