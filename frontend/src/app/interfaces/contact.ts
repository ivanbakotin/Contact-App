export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  city: string;
  adress: string;
  gender: string;
  country: string;
  bookmark: boolean;
  tags: string[];
  emails: string[];
  phones: string[];
}

export interface Tag {
  id: number;
  ContactId: number;
  tag: string;
}

export interface Phone {
  id: number;
  ContactId: number;
  phone: string;
}

export interface Email {
  id: number;
  ContactId: number;
  email: string;
}
