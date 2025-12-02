import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'hasUniqueIds', async: false })
export class HasUniqueIds implements ValidatorConstraintInterface {
  validate(items: any[], args: ValidationArguments) {
    if (!Array.isArray(items)) {
      return false;
    }

    const ids = items.map((item) => item.id);
    const uniqueIds = new Set(ids);

    return ids.length === uniqueIds.size;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Todos los IDs deben ser únicos';
  }
}
