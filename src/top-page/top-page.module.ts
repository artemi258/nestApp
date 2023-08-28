import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageModel, TopPageModelSchema } from './top-page.model';

@Module({
	controllers: [TopPageController],
	imports: [MongooseModule.forFeature([{ name: TopPageModel.name, schema: TopPageModelSchema }])],
})
export class TopPageModule {}
