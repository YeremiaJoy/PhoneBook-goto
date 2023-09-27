import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
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
  const [variables, setVariables] = useState({
    limit: 10,
    offset: 0,
  });

  //graphQL get data Pokemon List
  const { loading, data, refetch } = useQuery(GET_PHONE_LIST, {
    variables,
  });

  // delete phone contact
  const [deleteContact] = useMutation(DELETE_PHONE_CONTACT, {
    refetchQueries: [
      GET_PHONE_LIST, // DocumentNode object parsed with gql
      "GetContactList", // Query name
    ],
  });

  async function handleDelete(id: number) {
    await deleteContact({
      variables: { id },
    }).then(({ data }) => {
      const { first_name, last_name } = data.delete_contact_by_pk;
      console.log(`${first_name} ${last_name}`);
    });
  }

  return (
    <MainLayout>
      <AdvancedAction search={refetch} setVariables={setVariables} />
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
