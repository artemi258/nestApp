import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { getModelToken } from '@nestjs/mongoose';
import mongoose from 'mongoose';

describe('ReviewService', () => {
	let service: ReviewService;
	const exec = { exec: jest.fn() };
	const reviewRepositoryFactory = () => ({
		find: () => exec,
	});

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ReviewService,
				{ useFactory: reviewRepositoryFactory, provide: getModelToken('ReviewModel') },
			],
		}).compile();

		service = module.get<ReviewService>(ReviewService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
	it('findByProductId working', async () => {
		const id = new mongoose.Types.ObjectId().toHexString();
		reviewRepositoryFactory()
			.find()
			.exec.mockRejectedValueOnce([{ productId: id }]);
		const res = (await service.findByProductId(id)) ?? [];
		console.log(id);
		expect(res[0].productId).toBe(id);
	});
});
