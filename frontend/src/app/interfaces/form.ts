import { Contact, Tag, Phone, Email } from './contact';

export interface Form {
  contact: Contact;
  tags: Tag[];
  phones: Phone[];
  emails: Email[];
}
