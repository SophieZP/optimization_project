import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidCostMatrix', async: false })
export class IsValidCostMatrix implements ValidatorConstraintInterface {
  validate(costs: number[][], args: ValidationArguments) {
    if (!Array.isArray(costs) || costs.length === 0) {
      return false;
    }

    const numCols = costs[0].length;

    // Verificar que todas las filas tengan el mismo número de columnas
    for (const row of costs) {
      if (!Array.isArray(row) || row.length !== numCols) {
        return false;
      }

      // Verificar que todos los valores sean números no negativos
      for (const cost of row) {
        if (typeof cost !== 'number' || cost < 0 || !isFinite(cost)) {
          return false;
        }
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'La matriz de costos debe ser rectangular y contener solo números no negativos';
  }
}
