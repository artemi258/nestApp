import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { TopLevelCategory } from '../top-page.model';
import { Type } from 'class-transformer';

class HhData {
	@IsNumber()
	count: number;
	@IsNumber()
	juniorSalary: number;
	@IsNumber()
	middleSalary: number;
	@IsNumber()
	seniorSalary: number;
}

class TopPageAdvantages {
	@IsString()
	title: string;
	@IsString()
	description: string;
}

export class CreateTopPageDto {
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;
	@IsString()
	secondCategory: string;
	@IsString()
	alias: string;
	@IsString()
	title: string;
	@IsString()
	category: string;
	@IsOptional()
	@ValidateNested()
	@Type(() => HhData)
	hh?: HhData;
	@IsArray()
	@ValidateNested()
	@Type(() => TopPageAdvantages)
	advantages: TopPageAdvantages[];
	@IsString()
	seoTest: string;
	@IsString()
	tagsTitle: string;
	@IsArray()
	@IsString({ each: true })
	tags: string[];
}
