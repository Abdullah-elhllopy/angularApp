import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavbarService } from '../navbar/navbar.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentLang !:string;
  
  constructor(public translate: TranslateService ,private navbarService : NavbarService) {
    this.navbarService.languageSubject.subscribe(x=>{
      this.currentLang =x;
    })

   }

  ngOnInit(): void {
  }

}
