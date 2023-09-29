export interface Contact {
  id?: number;
  first_name: string;
  last_name: string;
  phones: Phones[];
  created_at: string;
}
export interface Phones {
  number: string;
}
