import { ListingCardProps } from "@/definitions/Listing";
import { formatDate } from "@/helpers/dateFormat";
import { Card } from "@/styles/01_components/Card";
import {
  BubbleContact,
  ContactContainer,
  ListingAction,
  ListingHeader,
  UserName,
} from "@/styles/02_containers/ListingCard";
import { faEdit, faStar, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ListingCard({
  contact,
  handleFavorite,
  handleEdit,
  handleDelete,
  favorite,
}: ListingCardProps) {
  return (
    <Card>
      <ListingHeader>
        <UserName>
          <FontAwesomeIcon
            onClick={() => handleFavorite(contact)}
            className="favorite"
            icon={faStar}
            color={favorite ? "var(--yellow)" : "var(--grey)"}
          />
          <strong>{`${contact.first_name} ${contact.last_name} `}</strong>
        </UserName>
        <span className="created-at">
          ~created at {formatDate(contact.created_at)}
        </span>
      </ListingHeader>

      <ListingAction>
        <ContactContainer>
          {contact.phones.map((phone: any) => {
            return (
              <BubbleContact key={phone.number}>{phone.number}</BubbleContact>
            );
          })}
        </ContactContainer>
        <div className="action">
          <FontAwesomeIcon
            icon={faEdit}
            color="var(--text)"
            onClick={() => handleEdit(contact.id)}
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            color="var(--danger)"
            onClick={() => handleDelete(contact)}
          />
        </div>
      </ListingAction>
    </Card>
  );
}
