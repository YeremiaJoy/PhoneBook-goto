import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_PHONE_LIST } from "./graphql/queries";
import MainLayout from "./containers/shared/MainLayout";
import AdvancedAction from "./containers/Listing/AdvancedAction";
import {
  BubbleContact,
  ContactContainer,
  ListingAction,
  ListingCard,
  ListingCardContainer,
  ListingHeader,
  UserName,
} from "./styles/02_containers/ListingCard";
import { formatDate } from "./helpers/dateFormat";
import { faStar, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function App() {
  const get_list = {
    limit: 20,
    offset: 0,
  };
  //graphQL get data Pokemon List
  const [getPhoneList, { loading, data }] = useLazyQuery(GET_PHONE_LIST, {
    variables: {
      get_list,
    },
  });
  useEffect(() => {
    getPhoneList();
  }, [getPhoneList, data]);

  return (
    <MainLayout>
      <AdvancedAction />
      <ListingCardContainer>
        {data?.contact.map((contact: any) => {
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
                  <FontAwesomeIcon icon={faTrashAlt} color="#ff6961" />
                </div>
              </ListingAction>
            </ListingCard>
          );
        })}
      </ListingCardContainer>
    </MainLayout>
  );
}

export default App;
