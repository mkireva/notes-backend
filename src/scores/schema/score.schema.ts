import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScoreDocument = Score & Document;

@Schema({ versionKey: false, collection: 'scores' })
export class Score {
  @Prop()
  scoreId: string;

  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  text: string;

  @Prop()
  scoreDate: Date;

  @Prop()
  createdAt: string;

  @Prop()
  key: string;

  @Prop()
  color: string;

  @Prop()
  category: string;

  @Prop()
  lyrics: string;

  @Prop()
  url: string;

  @Prop()
  description: string;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);
