import { Contact } from "./contact";

export interface ListingCardProps {
  contact: Contact;
  handleFavorite: Function;
  handleEdit: Function;
  handleDelete: Function;
  favorite?: boolean;
}
