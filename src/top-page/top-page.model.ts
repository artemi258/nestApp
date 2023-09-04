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

@Schema({ timestamps: true })
export class TopPageModel {
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
	seoText: string;
	@Prop()
	tagsTitle: string;
	@Prop([String])
	tags: string[];
}

export const TopPageModelSchema = SchemaFactory.createForClass(TopPageModel);

TopPageModelSchema.index({
	title: 'text',
	seoText: 'text',
	'advantages.description': 'text',
	'advantages.title': 'text',
});
