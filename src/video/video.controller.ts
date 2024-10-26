import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Header, Res, HttpStatus, Headers, Req} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Request, Response } from 'express';
import { VideoDto } from './dto/video.dto';

@Controller('video') //http://localhost:8080/video/
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post("/create-video")
  create(
    @Body() createVideoDto: CreateVideoDto,
    @Res() res: Response
) {
    return res.status(HttpStatus.CREATED).json(createVideoDto);
    // return this.videoService.create(createVideoDto);
  }

  @Get("/get-video")
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
