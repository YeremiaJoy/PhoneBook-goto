import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_PHONE_LIST } from "@/graphql/queries";
import { DELETE_PHONE_CONTACT } from "@/graphql/mutation";
import MainLayout from "@/containers/shared/MainLayout";
import AdvancedAction from "@/containers/Listing/AdvancedAction";
import {
  BubbleContact,
  ContactContainer,
  ListingAction,
  ListingCard,
  ListingCardContainer,
  ListingHeader,
  UserName,
} from "@/styles/02_containers/ListingCard";
import { formatDate } from "@/helpers/dateFormat";
import { faStar, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PhoneListing() {
  const get_list = {
    limit: 20,
    offset: 0,
  };
  //graphQL get data Pokemon List
  const { loading, data, refetch } = useQuery(GET_PHONE_LIST, {
    variables: {
      get_list,
    },
  });

  // delete phone contact
  const [deleteContact, deletion_data] = useMutation(DELETE_PHONE_CONTACT);

  async function handleDelete(id: number) {
    await deleteContact({
      variables: { id },
    });

    refetch();
    console.log(deletion_data);
  }

  return (
    <MainLayout>
      <AdvancedAction />
      <ListingCardContainer>
        {!loading &&
          data?.contact.map((contact: any) => {
            return (
              <ListingCard key={contact.id}>
                <ListingHeader>
                  <UserName>
                    <FontAwesomeIcon
                      className="favorite"
                      icon={faStar}
                      color="#262626"
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
                        <BubbleContact key={phone.number}>
                          {phone.number}
                        </BubbleContact>
                      );
                    })}
                  </ContactContainer>
                  <div className="delete">
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      color="#ff6961"
                      onClick={() => handleDelete(contact.id)}
                    />
                  </div>
                </ListingAction>
              </ListingCard>
            );
          })}
      </ListingCardContainer>
    </MainLayout>
  );
}

export default PhoneListing;
