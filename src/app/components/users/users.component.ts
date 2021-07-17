import { NgForm ,FormGroup, FormControl, Validators ,ValidatorFn} from '@angular/Forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User'; 
import { TranslateService } from '@ngx-translate/core';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 
   
  currentLang !:string;
  users: User[]=[];
  showExtended: boolean = true;
  loaded: boolean = false;
  enableAdd: boolean = false;
  showUserForm: boolean = false;
  data: any;
  vaildForm !: FormGroup

  constructor(private userService: UserService,public translate: TranslateService , public navbarService :NavbarService) { 
    this.navbarService.languageSubject.subscribe(x=>{
      this.currentLang = x;
    })
    
  }

  ngOnInit() {
      this.userService.getData().subscribe((data: any) => {
        
      });
   
      this.userService.getUsers().subscribe((users: User[]) => {
        this.users = users;
        this.loaded = true;
      });

      this.vaildForm = new FormGroup({

        firstName: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")]),
    
        lastName:  new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")]),
        email: new FormControl('',[
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    
      });

  }

  get f(){

    return this.vaildForm.controls;

  }
  submit(){
   
    let user : User = {
      firstName : this.vaildForm.value.firstName,
      lastName : this.vaildForm.value.lastName,
      email :this.vaildForm.value.email,
      hide : true,
      registered : new Date(),
      isActive :true
    }
    
    this.userService.addUser(user); 
    this.vaildForm.reset()
  
  }
  
  onSubmit({value, valid}: NgForm) {
    if(!valid){
      console.log('Form is not valid');
    } else {
      value.isActive = true;
      value.registered = new Date();
      value.hide = true;

      this.userService.addUser(value);
    }
  }

  
}
