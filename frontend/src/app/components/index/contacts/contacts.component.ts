import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  currentTags: string[] = [];

  defaultContact = {
    id: 0,
    first_name: 'first_name',
    last_name: 'last_name',
    address: 'adress',
    city: 'city',
    country: 'country',
    gender: 'gender',
    bookmark: false,
  };

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService
      .getContacts()
      .subscribe(
        (contacts) => (
          (this.contacts = contacts), (this.filteredContacts = contacts)
        )
      );
  }

  removeDuplicates() {
    this.filteredContacts = this.filteredContacts.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );
  }

  searchContacts(event: any): void {
    this.contactService
      .searchContact(event.target.value)
      .subscribe(
        (contacts) => (
          (this.contacts = contacts),
          (this.filteredContacts = contacts),
          this.removeDuplicates(),
          this.filterContacts()
        )
      );
  }

  clearFilter() {
    this.currentTags = [];
    this.filteredContacts = this.contacts;
  }

  filterContacts(filtered: any[] = this.filteredContacts) {
    console.log(filtered);
    this.currentTags.forEach((tag) => {
      this.filteredContacts = filtered.filter((contact) => {
        return contact?.tags?.includes(tag);
      });
    });
  }

  filterByTag(tag: string): void {
    if (!this.currentTags.includes(tag)) {
      this.currentTags.push(tag);
    }
    this.filterContacts();
  }

  addContact(): void {
    this.contactService
      .createContact(this.defaultContact)
      .subscribe((contact) => {
        this.contacts.push(contact), this.filteredContacts.push(contact);
      });
  }

  deleteContact(id: number): void {
    this.filteredContacts = this.filteredContacts.filter(
      (contact) => contact.id != id
    );
    this.contacts = this.contacts.filter((contact) => contact.id != id);
    this.contactService.deleteContact(id).subscribe();
  }
}
