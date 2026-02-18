import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly service: GuestbookService) {}

  @Get() 
  getAll() { 
    return this.service.findAll(); 
  }

  @Post() 
  create(@Body() dto: any) { 
    return this.service.create(dto); 
  }

  @Delete(':id') 
  remove(@Param('id') id: string) { 
    return this.service.delete(id); 
  }
}