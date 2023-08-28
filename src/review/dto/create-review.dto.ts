import { IsDate, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
	@IsString()
	name: string;
	@IsString()
	title: string;
	@IsString()
	description: string;
	@Max(5)
	@Min(1)
	@IsNumber()
	rating: number;
	@IsDate()
	createdAt: Date;
	@IsString()
	productId: string;
}
