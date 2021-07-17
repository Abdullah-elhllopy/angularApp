import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PostService } from '../../services/post.service';
import { TranslateService } from '@ngx-translate/core';
import { NavbarService } from '../navbar/navbar.service';
import { Post } from '../../models/Post';
import { FormGroup, FormControl, Validators } from '@angular/Forms';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  @Output() newPost: EventEmitter<Post> = new EventEmitter();
  @Output() updatedPost: EventEmitter<Post> = new EventEmitter();
  
  @Input()currentPost!: Post;
  @Input()isEdit!: boolean;
  
  currentLang !:string;
  vaildForm !: FormGroup;
  constructor(private postService: PostService ,public translate: TranslateService ,public navbarService : NavbarService) {
    this.navbarService.languageSubject.subscribe(x=>{
          this.currentLang = x;
    })
   }

  ngOnInit() {
    
    this.vaildForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")]),
      body:  new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")])     
    });
    
  }

  get f(){

    return this.vaildForm.controls;

  }
  submit(){
  
    if(!this.vaildForm.value.title || !this.vaildForm.value.body) {
      alert('Please add post');
    } else {
      this.postService.savePost(this.vaildForm.value  as Post).subscribe((post: Post | undefined) => {
        this.newPost.emit(post);
      });
      this.vaildForm.reset();
    }
    

  }

  addPost(title: any, body: any) {
    
    if(!title || !body) {
      alert('Please add post');
    } else {
      this.postService.savePost({title, body} as Post).subscribe((post: Post | undefined) => {
        this.newPost.emit(post);
      });
    }
    
    
  }

 
  updatePost() {
    this.postService.updatePost(this.currentPost).subscribe((post: Post | undefined) => {
      this.isEdit = false;
      this.updatedPost.emit(post);
    });
  }

}
