import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ProductModel } from '../product/product.model';

export type ReviewDocument = HydratedDocument<ReviewModel>;

@Schema({ timestamps: true })
export class ReviewModel {
	@Prop()
	name: string;
	@Prop()
	title: string;
	@Prop()
	description: string;
	@Prop()
	rating: number;
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: ProductModel.name })
	productId: ProductModel;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
