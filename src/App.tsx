import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_PHONE_LIST } from "./graphql/queries";
import MainLayout from "./containers/MainLayout";

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
      {data?.contact.map((val: any) => {
        return <span key={val.id}>{val.first_name}</span>;
      })}
    </MainLayout>
  );
}

export default App;
