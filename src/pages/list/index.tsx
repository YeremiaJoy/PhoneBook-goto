import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_PHONE_LIST } from "@/graphql/queries";
import { DELETE_PHONE_CONTACT } from "@/graphql/mutation";
import MainLayout from "@/containers/shared/MainLayout";
import AdvancedAction from "@/containers/Listing/AdvancedAction";
import { ListingCardContainer } from "@/styles/02_containers/ListingCard";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PageOption,
  PageOptionContainer,
  PageShow,
  PaginationWrapper,
} from "@/styles/02_containers/Pagination";
import { counterShowPage, generatePageOptions } from "@/helpers/pagination";
import { Contact } from "@/definitions/contact";
import ListingCard from "@/containers/Listing/ListingCard";

function PhoneListing() {
  const location = useLocation();
  const navigate = useNavigate();

  const perPage = 1;
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
    if (page === currentPage) return;
    setCurrentPage(page);
    const variables = {
      limit: perPage,
      offset: (page - 1) * perPage,
    };
    setVariables(variables);
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
  async function handleDelete(contact: Contact) {
    handleFavorite(contact);
    await deleteContact({
      variables: { id: contact.id },
    }).then(({ data }) => {
      const { first_name, last_name } = data.delete_contact_by_pk;
      console.log(`${first_name} ${last_name}`);
    });
  }

  // go to edit page
  async function handleEdit(id: number) {
    navigate(`/${id}`);
  }

  // Favorite contact
  const [favorite, setFavorite] = useState<Contact[]>([]);
  const [currentData, setCurrentData] = useState<Contact[]>([]);

  useEffect(() => {
    if (data) {
      setCurrentData(data.contact);
      const favoriteItem = JSON.parse(
        window.localStorage.getItem("favorite") || "[]"
      );
      removeDuplicateData(favoriteItem, data.contact);
    }
  }, [data]);

  function removeDuplicateData(
    favoriteData: Contact[],
    currentData: Contact[],
    found?: boolean,
    item?: Contact
  ) {
    setFavorite(favoriteData);
    const dataWithoutFavorite = currentData.reduce(
      (acc: Contact[], curr: Contact) => {
        const found = favoriteData.find((fav: Contact) => fav.id === curr.id);
        if (!found) acc.push(curr);
        return acc;
      },
      []
    );

    if (found && item) setCurrentData([...dataWithoutFavorite, item]);
    else setCurrentData(dataWithoutFavorite);
  }

  function handleFavorite(contact: Contact) {
    const favoriteData = JSON.parse(
      window.localStorage.getItem("favorite") || "[]"
    );
    const found = favoriteData.filter(
      (favorite: Contact) => favorite.id === contact.id
    ).length;

    let favoriteItem;
    if (found) {
      const isMatch = (item: Contact) => item.id === contact.id;
      const index = favoriteData.findIndex(isMatch);
      favoriteData.splice(index, 1);
      favoriteItem = favoriteData;
    } else {
      favoriteItem = [...favoriteData, contact];
    }
    removeDuplicateData(favoriteItem, currentData, found, contact);
    localStorage.setItem("favorite", JSON.stringify(favoriteItem));
  }

  return (
    <MainLayout>
      <h2>Contact Listing</h2>
      <AdvancedAction search={refetch} setVariables={setVariables} />
      <ListingCardContainer>
        {favorite.map((favorite: any) => {
          return (
            <ListingCard
              key={favorite.id}
              contact={favorite}
              handleFavorite={handleFavorite}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              favorite
            />
          );
        })}

        {!loading &&
          currentData.map((contact: any) => {
            return (
              <ListingCard
                key={contact.id}
                contact={contact}
                handleFavorite={handleFavorite}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
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
