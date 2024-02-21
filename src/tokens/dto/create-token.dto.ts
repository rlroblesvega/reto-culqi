import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreateTokenDto {
  
  @JoiSchema(Joi.string().min(13).max(16).creditCard().required())
  card_number!: string;

  @JoiSchema(Joi.string().min(3).max(4).required())
  cvv!: string;

  @JoiSchema(Joi.string().min(1).max(2).required())
  expiration_month!: string;

  @JoiSchema(Joi.string().max(4).required())
  expiration_year!: string;

  @JoiSchema(Joi.string().min(5).max(100).required())
  email!: string;
}

export class SearchTokenDto {
  
  @JoiSchema(Joi.string().required())
  token!: string;
}
