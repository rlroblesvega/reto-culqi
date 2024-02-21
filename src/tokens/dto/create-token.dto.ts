import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';

const allowedDomains = ['gmail.com', 'hotmail.com', 'yahoo.es'];

const emailSchema = Joi.string().email().min(5).max(100).custom((value: string, helpers) => {
  const domain = value.split('@')[1];
  if (allowedDomains.includes(domain)) {
    return value;
  } else {
    return helpers.error('any.invalid');
  }
}, 'Custom validation').required();

const currentYear = new Date().getFullYear();
const maxYear = currentYear + 5;

const expirationYearSchema = Joi.string().max(4).custom((value: string, helpers) => {
  const intValue = parseInt(value);
  if (!isNaN(intValue) && intValue >= currentYear && intValue <= maxYear) {
    return value;
  } else {
    return helpers.error('any.invalid');
  }
}, 'Custom validation').required();

@JoiSchemaOptions({
  allowUnknown: false,
})

export class CreateTokenDto {
  
  @JoiSchema(Joi.string().min(13).max(16).creditCard().required())
  card_number!: string;

  @JoiSchema(Joi.string().min(3).max(4).required())
  cvv!: string;

  @JoiSchema(Joi.string().valid('1','2','3','4','5','6','7','8','9','10','11','12').min(1).max(2).required())
  expiration_month!: string;

  @JoiSchema(expirationYearSchema)
  expiration_year!: string;

  @JoiSchema(emailSchema)
  email!: string;
}

export class SearchTokenDto {
  
  @JoiSchema(Joi.string().required())
  token!: string;
}
