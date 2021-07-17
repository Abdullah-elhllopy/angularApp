import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/Forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {

    if((control.value as string).indexOf(' ') >= 0){

        return {cannotContainSpace: true}

    }

    return null;

}
  // Methods
  constructor() {
    
  } 

  ngOnInit() {
   
  }
}
