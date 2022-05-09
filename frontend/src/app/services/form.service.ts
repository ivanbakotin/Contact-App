import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { APIURL } from '../utils/constants';
import { Form } from '../interfaces/form';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private FORM = 'Contacts/Form/';
  private UPDATECONTACT = 'Contacts/Form/';
  private UPDATETAGS = 'Tags/';
  private UPDATEPHONES = 'Phones/';
  private UPDATEEMAILS = 'Emails/';

  private DELETETAG = 'Tags/';
  private DELETEPHONE = 'Phones/';
  private DELETEEMAIL = 'Emails/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getForm(id: string | null): Observable<Form> {
    return this.http.get<Form>(APIURL + this.FORM + id);
  }

  sendFormContact(form: any) {
    return this.http.put(APIURL + this.UPDATECONTACT, form, this.httpOptions);
  }

  sendFormTags(form: any) {
    return this.http.put(APIURL + this.UPDATETAGS, form, this.httpOptions);
  }

  sendFormEmails(form: any) {
    return this.http.put(APIURL + this.UPDATEEMAILS, form, this.httpOptions);
  }

  sendFormPhones(form: any) {
    return this.http.put(APIURL + this.UPDATEPHONES, form, this.httpOptions);
  }

  deleteTag(id: number) {
    return this.http.delete(APIURL + this.DELETETAG + id);
  }

  deletePhone(id: number) {
    return this.http.delete(APIURL + this.DELETEPHONE + id);
  }

  deleteEmail(id: number) {
    return this.http.delete(APIURL + this.DELETEEMAIL + id);
  }
}
