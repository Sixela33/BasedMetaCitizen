import { ArrayMinSize } from "class-validator";
import { IsOptional } from "class-validator";
import { IsArray } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";

export class CreateApiKeyDto {
    @IsString()
    name: string;

    @IsArray()
    @ArrayMinSize(1)
    allowedOrigins: string[];

    @IsOptional()
    @IsArray()
    redirectUrls?: string[];
}

export class UpdateApiKeyDto extends PartialType(CreateApiKeyDto) {
    @IsString()
    name: string;
    
}
  