import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { APIURL } from '../utils/constants';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private CONTACTS = 'Contacts/';
  private BOOKMARKS = 'Contacts/Bookmarked';
  private PROFILE = 'Contacts/';
  private SEARCH = 'Contacts/Search';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(APIURL + this.CONTACTS);
  }

  getBookmarks(): Observable<Contact[]> {
    return this.http.get<Contact[]>(APIURL + this.BOOKMARKS);
  }

  getProfile(id: string | null): Observable<Contact[]> {
    return this.http.get<Contact[]>(APIURL + this.PROFILE + id);
  }

  createContact(defaultContact: any) {
    return this.http.post<Contact>(
      APIURL + this.CONTACTS,
      defaultContact,
      this.httpOptions
    );
  }

  searchContact(params: string): Observable<Contact[]> {
    let search = '';
    if (params) {
      search = `?parameter=${params}`;
    }
    return this.http.get<Contact[]>(APIURL + this.SEARCH + search);
  }

  deleteContact(id: number) {
    return this.http.delete(APIURL + this.CONTACTS + id);
  }
}
