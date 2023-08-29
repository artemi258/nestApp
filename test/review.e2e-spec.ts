import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import mongoose, { disconnect } from 'mongoose';

const productId = new mongoose.Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
	name: 'Тест 3',
	title: 'Заголовок',
	description: 'Описание тестовое',
	rating: 5,
	productId,
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/review/create (POST)', async () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				console.log('productId123', productId);
				console.log('productId', body);
				createdId = body._id;
				expect(createdId).toBeDefined;
			});
	});
	// it('/review/create (POST) - fail', async () => {
	// 	return request(app.getHttpServer())
	// 		.post('/review/create')
	// 		.send({ ...testDto, rating: 0 })
	// 		.expect(400)
	// 		.then(({ body }: request.Response) => {
	// 			console.log('body', body);
	// 		});
	// });

	// it('/review/byProduct/:productId (GET)', async () => {
	// 	return request(app.getHttpServer())
	// 		.delete('/review/byProduct/' + '6041f7a3b3e24b1e15e98d38')
	// 		.expect(200)
	// 		.then(({ body }: request.Response) => {
	// 			console.log(body);
	// 			expect(body.length).toBe(1);
	// 		});
	// });
	// it('/review/:id (DELETE)', () => {
	// 	return request(app.getHttpServer())
	// 		.delete('/review/' + createdId)
	// 		.expect(200);
	// });
	afterAll(() => {
		disconnect();
	});
});
