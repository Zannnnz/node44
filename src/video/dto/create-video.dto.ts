import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { videoType } from "../enum/video_type.enum";

export class CreateVideoDto {
    @IsNotEmpty({message: "Video name không được để trống"})
    @ApiProperty() // show cái property ra giao diện swagger
    video_name: string;
    
    @IsNotEmpty({message: "Thumbnail không được để trống"})
    @ApiProperty() // show cái property ra giao diện swagger
    thumbnail: string;
    
    @IsNotEmpty({message: "Mô tả không được để trống"})
    @ApiProperty() // show cái property ra giao diện swagger
    description: string;
    
    @ApiProperty()
    views: number;
    
    @IsNotEmpty({message: "Source không được để trống"})
    @ApiProperty() // show cái property ra giao diện swagger
    source: string;
    
    user_id: number;
    
    @ApiProperty({enum: videoType})
    @IsEnum(videoType)
    type_id: number;
}

