import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_PHONE_LIST } from "@/graphql/queries";
import { DELETE_PHONE_CONTACT } from "@/graphql/mutation";
import MainLayout from "@/containers/shared/MainLayout";
import AdvancedAction from "@/containers/Listing/AdvancedAction";
import {
  BubbleContact,
  ContactContainer,
  ListingAction,
  ListingCardContainer,
  ListingHeader,
  UserName,
} from "@/styles/02_containers/ListingCard";
import { formatDate } from "@/helpers/dateFormat";
import { faEdit, faStar, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@/styles/01_components/Card";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PageOption,
  PageOptionContainer,
  PageShow,
  PaginationWrapper,
} from "@/styles/02_containers/Pagination";
import { counterShowPage, generatePageOptions } from "@/helpers/pagination";

function PhoneListing() {
  const location = useLocation();
  const navigate = useNavigate();

  const perPage = 10;
  const [variables, setVariables] = useState({
    limit: perPage,
    offset: 0,
  });
  //graphQL get contact list
  const { loading, data, refetch } = useQuery(GET_PHONE_LIST, {
    variables,
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const total = data?.contact_aggregate.aggregate.count;

  const pageOption: number[] = generatePageOptions(total, perPage, currentPage);

  async function changePage(page: number) {
    setCurrentPage(page);
    setVariables({
      limit: perPage,
      offset: (page - 1) * perPage,
    });
    refetch();
  }

  // Fetch listing every route changed
  useEffect(() => {
    refetch();
  }, [location]);

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

  // go to edit page
  async function handleEdit(id: number) {
    navigate(`/${id}`);
  }

  return (
    <MainLayout>
      <h2>Contact Listing</h2>
      <AdvancedAction search={refetch} setVariables={setVariables} />
      <ListingCardContainer>
        {!loading &&
          data?.contact.map((contact: any) => {
            return (
              <Card key={contact.id}>
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
                  <div className="action">
                    <FontAwesomeIcon
                      icon={faEdit}
                      color="var(--text)"
                      onClick={() => handleEdit(contact.id)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      color="var(--danger)"
                      onClick={() => handleDelete(contact.id)}
                    />
                  </div>
                </ListingAction>
              </Card>
            );
          })}
      </ListingCardContainer>

      <PaginationWrapper>
        <PageOptionContainer>
          {pageOption?.map((page: number) => {
            return (
              <PageOption
                key={page}
                className={page === currentPage ? "active" : ""}
                onClick={() => changePage(page)}
              >
                {page}
              </PageOption>
            );
          })}
        </PageOptionContainer>

        <PageShow>
          Show {counterShowPage(perPage, currentPage, total)} per {total}
        </PageShow>
      </PaginationWrapper>
    </MainLayout>
  );
}

export default PhoneListing;
