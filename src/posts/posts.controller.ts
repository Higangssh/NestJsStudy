import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreatePostDto,  PostsService } from './posts.service';




@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  
  @Get()
  getPosts(){
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number){
    return this.postsService.getPostById(id);
  }
  


  @Post()
  postPosts(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Put(':id')
  putPosts(
    @Param ('id', ParseIntPipe) id: number,
    @Body() createPostDto: CreatePostDto){ 
      return this.postsService.updatePost(id,createPostDto);
    }

  @Delete(':id')
  deletePosts(@Param('id', ParseIntPipe) id :number){
    return this.postsService.deletePost(id);
  }

}


