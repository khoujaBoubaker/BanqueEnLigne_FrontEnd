import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor() { }
  contact = {nom : 'med' , mail : 'med@gmail.com'};

  ngOnInit() {
    console.log("Initialisation ..");
  }

}
