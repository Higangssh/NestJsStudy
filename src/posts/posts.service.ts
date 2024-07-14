import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostModel } from './entities/posts.entity';

    export interface PostModelInterface{
        id : number;
        author: string;
        title : string;
        content : string;
        likeCount: number;
        commentCount: number;
    }

    export type CreatePostDto = {
    author: string;
    title: string;
    content: string;
    };
  
  

    let posts: PostModel[] = [
        {
        id : 1,
        author: "John Doe",
        title: "Understanding TypeScript",
        content: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.",
        likeCount: 25,
        commentCount: 10,
        },
        { 
        id : 2,
        author: "Jane Smith",
        title: "Learning React",
        content: "React is a JavaScript library for building user interfaces.",
        likeCount: 40,
        commentCount: 15,
        },
        {
        id : 3,
        author: "Alice Johnson",
        title: "A Guide to Node.js",
        content: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
        likeCount: 35,
        commentCount: 5,
        },
    
    ]; 

@Injectable()
export class PostsService {

    constructor(
      @InjectRepository(PostModel)
      private readonly postsRepository: Repository<PostModel>
    ){}

    async getAllPosts(){
        return this.postsRepository.find();
    }

    async getPostById(id : number){
      try {
        return await this.postsRepository.findOneOrFail({ where: { id } });
      } catch (error) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }

    }

    async createPost(createPostDto: CreatePostDto){

        const post = this.postsRepository.create({
          author: createPostDto.author,
          title: createPostDto.title,
          content: createPostDto.content,
          likeCount: 0,
          commentCount: 0
        })

        const newPost = await this.postsRepository.save(post)
        return newPost;
    }

  async updatePost(id : number, createPostDto: CreatePostDto){
    const post = await this.postsRepository.findOne({
      where:{
        id: id,
      }
      } );

      if(!post){
        throw new NotFoundException();
      }
      if (createPostDto.author) {
        post.author = createPostDto.author;
      }

      if (createPostDto.title) {
        post.title = createPostDto.title;
      }

      if (createPostDto.content) {
        post.content = createPostDto.content;
      }

      const newPost = await this.postsRepository.save(post);

      return newPost;
    }

    async deletePost(id : number){
        const post = await this.postsRepository.findOne({
          where: {
            id: id,
          }
        });

        if(!post){
          throw new NotFoundException();
        }
    
        await this.postsRepository.delete(id);
        return id;
    }



}
