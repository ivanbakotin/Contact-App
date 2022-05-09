import { Component, OnInit } from '@angular/core';

import { Contact } from 'src/app/utils/testData';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    const data = sessionStorage.getItem('key');
    if (!data) {
      Contact.map((con) => {
        this.contactService.createContact(con).subscribe();
      });
    }
    sessionStorage.setItem('key', 'value');
  }
}
