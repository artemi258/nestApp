import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewService } from './review.service';
import { ReviewModel, ReviewSchema } from './review.model';

@Module({
	controllers: [ReviewController],
	imports: [MongooseModule.forFeature([{ name: ReviewModel.name, schema: ReviewSchema }])],
	providers: [ReviewService],
})
export class ReviewModule {}
