import { Injectable, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument, ProductModel } from './product.model';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from '../review/review.model';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(ProductModel.name) private readonly productModel: Model<ProductDocument>,
	) {}

	async create(dto: CreateProductDto) {
		return this.productModel.create(dto);
	}
	async findById(id: string) {
		return this.productModel.findById(id).exec();
	}
	async deleteById(id: string) {
		return this.productModel.findByIdAndDelete(id).exec();
	}
	async updateById(id: string, dto: CreateProductDto) {
		return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}
	async findWithReviews(dto: FindProductDto) {
		return this.productModel
			.aggregate([
				{
					$match: {
						categories: dto.category,
					},
				},
				{
					$sort: {
						_id: 1,
					},
				},
				{
					$limit: dto.limit,
				},
				{
					$lookup: {
						from: 'reviewmodels',
						localField: '_id',
						foreignField: 'productId',
						as: 'reviews',
					},
				},
				{
					$addFields: {
						reviewCount: { $size: '$reviews' },
						reviewAvg: { $avg: '$reviews.rating' },
						reviews: {
							$function: {
								body: function (reviews: ReviewModel[]): ReviewModel[] {
									return reviews.sort(
										(a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
									);
								},
								args: ['$reviews'],
								lang: 'js',
							},
						},
					},
				},
			])
			.exec() as unknown as (ProductModel & {
			reviews: ReviewModel[];
			reviewCount: number;
			reviewAvg: number;
		})[];
	}
}
