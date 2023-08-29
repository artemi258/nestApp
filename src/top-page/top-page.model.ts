import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TopPageModelDocument = HydratedDocument<TopPageModel>;

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export class HhData {
	@Prop()
	count: number;
	@Prop()
	juniorSalary: number;
	@Prop()
	middleSalary: number;
	@Prop()
	seniorSalary: number;
}

export class TopPageAdvantages {
	@Prop()
	title: string;
	@Prop()
	description: string;
}

@Schema()
export class TopPageModel {
	@Prop()
	_id: string;
	@Prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;
	@Prop()
	secondCategory: string;
	@Prop({ unique: true })
	alias: string;
	@Prop()
	title: string;
	@Prop()
	category: string;
	@Prop({ type: HhData })
	hh?: HhData;
	@Prop([TopPageAdvantages])
	advantages: TopPageAdvantages[];
	@Prop()
	seoTest: string;
	@Prop()
	tagsTitle: string;
	@Prop([String])
	tags: string[];
}

export const TopPageModelSchema = SchemaFactory.createForClass(TopPageModel);
