import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect, useContext } from "react";
import { GET_PHONE_LIST } from "@/graphql/queries";
import { DELETE_PHONE_CONTACT } from "@/graphql/mutation";
import MainLayout from "@/containers/shared/MainLayout";
import AdvancedAction from "@/containers/Listing/AdvancedAction";
import {
  ListingCardContainer,
  NoData,
} from "@/styles/02_containers/ListingCard";
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
import toast from "react-hot-toast";
import Pagination from "@/containers/Listing/Pagination";
import { VariablesListingContext } from "@/helpers/context";

function PhoneListing() {
  const location = useLocation();
  const navigate = useNavigate();

  const { variables, setVariables } = useContext(VariablesListingContext);

  //graphQL get contact list
  const { loading, data, refetch } = useQuery(GET_PHONE_LIST, {
    variables,
  });

  // total data
  const total = data?.contact_aggregate.aggregate.count;

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
    handleFavorite(contact, "delete");
    await deleteContact({
      variables: { id: contact.id },
    }).then(({ data }) => {
      if (data.delete_contact_by_pk) {
        const { first_name, last_name } = data?.delete_contact_by_pk;
        toast.success(`${first_name} ${last_name} successfully deleted`);
      }
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

  function handleFavorite(contact: Contact, type?: string) {
    const favoriteData = JSON.parse(
      window.localStorage.getItem("favorite") || "[]"
    );
    const found = favoriteData.filter(
      (favorite: Contact) => favorite.id === contact.id
    ).length;

    let favoriteItem = favoriteData;
    if (found) {
      const isMatch = (item: Contact) => item.id === contact.id;
      const index = favoriteData.findIndex(isMatch);
      favoriteData.splice(index, 1);
      favoriteItem = favoriteData;
    } else if (type !== "delete") {
      favoriteItem = [...favoriteData, contact];
    }
    removeDuplicateData(favoriteItem, currentData, found, contact);
    localStorage.setItem("favorite", JSON.stringify(favoriteItem));
  }

  return (
    <MainLayout>
      <h2>Contact Listing</h2>
      <AdvancedAction search={refetch} />
      <ListingCardContainer>
        {!favorite.length && !currentData.length && (
          <NoData>No Result Found</NoData>
        )}
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

      <Pagination total={total} />
    </MainLayout>
  );
}

export default PhoneListing;
