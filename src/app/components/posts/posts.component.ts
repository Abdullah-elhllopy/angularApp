import { NavbarService } from './../navbar/navbar.service';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { TranslateService } from '@ngx-translate/core';
import { Post } from '../../models/Post';




@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  inputs: ['questionNumber'],
  providers: [PostService]
})
export class PostsComponent implements OnInit   {
  posts: Post[]=[];
  currentPost: Post  ={
    id: 0,
    title: '',
    body: ''
  }

  isEdit: boolean = false;
  currentLang !:string;
 

  constructor(
      public postService: PostService ,
      public translate: TranslateService ,
      public navbarService : NavbarService,
    
    ) {
    this.postService = postService;
    this.navbarService.languageSubject.subscribe (x=>{
        this.currentLang = x;
    })
   
   }
  
  
  ngOnInit() {  
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });

 
    
  }
  
  
  onNewPost(post: Post) {
    this.posts.unshift(post);
  }

  editPost(post: Post) {
    this.currentPost = post;
    this.isEdit = true;
    
  }

  onUpdatedPost(post: Post) {
    this.posts.forEach((cur, index) => {
      if(post.id === cur.id) {
        this.posts.splice(index, 1);
        this.posts.unshift(post);
        this.isEdit = false;
        this.currentPost = {
          id: 0,
          title: '',
          body: ''
        }
      }
    });
  }


  removePost(post: Post) {
    if(confirm('Are You Sure?')) {
      this.postService.removePost(post.id).subscribe(() => {
        this.posts.forEach((cur, index) => {
          if(post.id === cur.id) {
            this.posts.splice(index, 1);  
          }
        });
      });
    }
  }

}
