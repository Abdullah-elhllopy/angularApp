import { ViewEncapsulation } from '@angular/core';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PostService } from 'src/app/services/post.service';
import { NavbarService } from './navbar.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [PostService]
})
export class NavbarComponent implements OnInit {
  currentLang !:string;
  constructor(public translate: TranslateService ,private navbarService : NavbarService ) {
    
    this.translate.use(this.currentLang)
  }
 
  ngOnInit() {
    this.translate.defaultLang ||'en'
  }

  changeLang(lang :string){
   this.translate.use(lang)
   this.navbarService.languageSubject.next(lang)
    
  }
}
