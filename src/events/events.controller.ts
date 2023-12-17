import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventDto } from './dto/event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('/')
  create(@Body() event: EventDto, @Ip() ip) {
    return this.eventsService.create(event, ip);
  }

  @Get('/')
  findAll(): EventDto[] {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() eventDto: EventDto, @Ip() ip) {
    return this.eventsService.update(id, eventDto, ip);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Post('id-url-friendly/')
  urlFriendly(@Query('id') id: string) {
    return this.eventsService.urlFriendly(id);
  }
}
