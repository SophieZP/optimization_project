import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isBalancedProblem', async: false })
export class IsBalancedProblem implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any;

    if (!object.origins || !object.destinations) {
      return false;
    }

    const totalSupply = object.origins.reduce(
      (sum: number, o: any) => sum + (o.supply || 0),
      0,
    );
    const totalDemand = object.destinations.reduce(
      (sum: number, d: any) => sum + (d.demand || 0),
      0,
    );

    // Permitir problemas balanceados o desbalanceados
    // Solo verificar que los totales sean válidos
    return totalSupply > 0 && totalDemand > 0;
  }

  defaultMessage(args: ValidationArguments) {
    return 'El problema debe tener oferta y demanda válidas (mayores a cero)';
  }
}
