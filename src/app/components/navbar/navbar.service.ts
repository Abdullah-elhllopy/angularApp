import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  language : string = 'en'
  languageSubject : Subject<string>= new Subject();
  constructor() { }
  
}
