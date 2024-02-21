import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
  @Prop()
  token: string;

  @Prop(raw({
    card_number: { type: String },
    cvv: { type: String },
    expiration_month: { type: String },
    expiration_year: { type: String },
    email: { type: String }
  }))
  cardData: Record<string, any>;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
