import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  contactId: string | null = null;

  get contact() {
    return this.form.controls['contact'] as FormControl;
  }

  get tags() {
    return this.form.controls['tags'] as FormArray;
  }

  get emails() {
    return this.form.controls['emails'] as FormArray;
  }

  get phones() {
    return this.form.controls['phones'] as FormArray;
  }

  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  form = this.fb.group({
    contact: this.fb.group({
      id: '',
      first_name: '',
      last_name: '',
      gender: '',
      city: '',
      address: '',
      country: '',
      bookmark: false,
    }),
    tags: this.fb.array([]),
    emails: this.fb.array([]),
    phones: this.fb.array([]),
  });

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id');
    this.formService.getForm(this.contactId).subscribe((data) => {
      const form = data;
      this.contact.setValue(form.contact);
      form.tags.map((tag) => this.addTag(tag));
      form.phones.map((phone) => this.addPhone(phone));
      form.emails.map((email) => this.addEmail(email));
    });
  }

  addTag(object?: any) {
    const tagForm = this.fb.group({
      id: object?.id || 0,
      contactId: this.contactId,
      tag: object?.tag || 'Placeholder',
    });
    this.tags.push(tagForm);
  }

  addPhone(object?: any) {
    const tagForm = this.fb.group({
      id: object?.id || 0,
      contactId: this.contactId,
      phone: object?.phone || 'Placeholder',
    });
    this.phones.push(tagForm);
  }

  addEmail(object?: any) {
    const tagForm = this.fb.group({
      id: object?.id || 0,
      contactId: this.contactId,
      email: object?.email || 'Placeholder',
    });
    this.emails.push(tagForm);
  }

  deleteTag(index: number) {
    const id = this.tags.at(index).value.id;
    this.formService.deleteTag(id).subscribe();
    this['tags'].removeAt(index);
  }

  deletePhone(index: number) {
    const id = this.phones.at(index).value.id;
    this.formService.deletePhone(id).subscribe();
    this['phones'].removeAt(index);
  }

  deleteEmail(index: number) {
    const id = this.emails.at(index).value.id;
    this.formService.deleteEmail(id).subscribe();
    this['emails'].removeAt(index);
  }

  submitForm() {
    this.formService.sendFormContact(this.form.value.contact).subscribe();
    this.formService.sendFormTags(this.form.value.tags).subscribe();
    this.formService.sendFormEmails(this.form.value.emails).subscribe();
    this.formService.sendFormPhones(this.form.value.phones).subscribe();

    this.router.navigate(['/']);
  }
}
