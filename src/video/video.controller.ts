import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Header, Res, HttpStatus, Headers, Req, UseGuards} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Request, Response } from 'express';
import { VideoDto } from './dto/video.dto';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Video')// chia cụm API
@Controller('video') //http://localhost:8080/video/
export class VideoController {
  constructor(private readonly videoService: VideoService) {}
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post("/create-video")
  async create(
    @Body() createVideoDto: CreateVideoDto,
    @Res() res: Response
): Promise <Response<VideoDto>> {
    // return res.status(HttpStatus.CREATED).json(createVideoDto);
    let newVideo = await this.videoService.create(createVideoDto);
    return res.status(HttpStatus.CREATED).json(newVideo);
  }

  @Get("/get-video")
  @ApiQuery({name: "page", required: false, type:Number})
  @ApiQuery({name: "size", required: false, type:Number})
  @ApiQuery({name: "keyword", required: false, type:String})
  @ApiHeader({name: "token", required: false})
  @ApiResponse({status: HttpStatus.OK, description: "Get list video successfully"})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal server"})

  async findAll(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('keyword') keyword: string,
    @Res() res: Response,
    @Headers("token") token: string,
    @Req() req:Request
  ): Promise<Response <VideoDto[]>> {
    try {
      // return res.status(HttpStatus.OK).json({page,size,keyword,token});
      // return this.videoService.findAll();
      // Format datatype cho page và size
      // toán tử 3 ngôi
      const formatPage = page ? Number(page) : 1;
      const formatSize = size ? Number(size) : 10;
      let videos = await this.videoService.findAll(formatPage,formatSize,keyword);
      return res.status(HttpStatus.OK).json(videos);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
   
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }
}
