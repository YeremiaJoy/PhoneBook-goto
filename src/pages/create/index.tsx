import MainLayout from "@/containers/shared/MainLayout";
import { GET_CONTACT_DETAILS } from "@/graphql/queries";
import { formatDate } from "@/helpers/dateFormat";
import { Button, ButtonContainer } from "@/styles/01_components/Button";
import { Card } from "@/styles/01_components/Card";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { Contact, Phones } from "@/definitions/contact";
import * as Yup from "yup";
import InputField from "@/components/Field";
import { FormContainer } from "@/styles/02_containers/Form";
import DuplicableWrapper from "@/components/DuplicableWrapper";
import {
  ADD_CONTACT_WITH_PHONES,
  ADD_NUMBER_TO_CONTACT,
  EDIT_CONTACT,
  EDIT_PHONE_NUMBER,
} from "@/graphql/mutation";
import toast from "react-hot-toast";

const RequiredAndSpecialCharNotAllowed = Yup.string()
  .matches(/^'?\p{L}+(?:[' ]\p{L}+)*'?$/u, "Special character is not allowed")
  .required("This field is mandatory");
const DisplayingErrorMessagesSchema = Yup.object().shape({
  first_name: RequiredAndSpecialCharNotAllowed,
  last_name: RequiredAndSpecialCharNotAllowed,
});

export default function CreatePhoneContact() {
  const params = useParams();
  const navigate = useNavigate();

  const [oldPhoneNumber, setOldPhoneNumber] = useState<Phones[]>([
    {
      number: "",
    },
  ]);
  const [form, setForm] = useState<Contact>({
    first_name: "",
    last_name: "",
    created_at: "",
    phones: [{ number: "" }],
  });
  const isEditPage = params?.id;

  //graphQL get contact list
  const [fetchDetail] = useLazyQuery(GET_CONTACT_DETAILS, {
    variables: {
      id: isEditPage,
    },
  });

  useEffect(() => {
    if (isEditPage) {
      fetchDetail().then((res) => {
        const data = res.data.contact_by_pk;
        if (data) {
          setForm({ ...data, created_at: formatDate(data.created_at) });
          setOldPhoneNumber(data.phones);
        } else {
          goBack();
        }
      });
    }
  }, []);

  function goBack() {
    navigate("/");
  }

  // create contact with phone number
  const [createContact] = useMutation(ADD_CONTACT_WITH_PHONES);
  const [addPhoneNumber] = useMutation(ADD_NUMBER_TO_CONTACT);
  // edit phone contact
  const [updateContact] = useMutation(EDIT_CONTACT);
  const [updatePhoneNumber] = useMutation(EDIT_PHONE_NUMBER);

  async function handleCreate(contact: Contact) {
    await createContact({
      variables: contact,
    }).then(({ data }) => {
      if (data) {
        toast.success("Contact succesfully created");
        goBack();
      } else {
        toast.error("The phone number is already in use by another contact");
      }
    });
  }
  async function handleUpdate(contact: Contact) {
    const { id, first_name, last_name, phones } = contact;
    var error = false;
    await updateContact({
      variables: {
        id,
        _set: {
          first_name,
          last_name,
        },
      },
    });
    // phones.forEach((phone: Phones, idx: number) => {
    for (let idx = 0; idx < phones.length; idx++) {
      const phone = phones[idx];
      if (oldPhoneNumber[idx]) {
        await updatePhoneNumber({
          variables: {
            pk_columns: {
              number: oldPhoneNumber[idx].number,
              contact_id: id,
            },
            new_phone_number: phone.number,
          },
          // eslint-disable-next-line no-loop-func
        }).then(({ data }) => {
          if (!data) {
            error = true;
            return;
          }
        });
      } else {
        await addPhoneNumber({
          variables: {
            contact_id: id,
            phone_number: phone.number,
          },
          // eslint-disable-next-line no-loop-func
        }).then(({ data }) => {
          if (!data) {
            error = true;
            return;
          }
        });
      }
    }

    if (error) {
      toast.error("The phone number is already in use by another contact");
    } else {
      toast.success("Contact succesfully updated");
      goBack();
    }
  }

  function submitForm(value: Contact) {
    if (isEditPage) {
      handleUpdate(value);
    } else {
      handleCreate(value);
    }
  }
  return (
    <MainLayout>
      <Card>
        <div className="card shadow-md relative">
          <h1 className="text-center">
            {isEditPage ? "Edit" : "Create"} Contact
          </h1>
          <Formik
            enableReinitialize={true}
            initialValues={form}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={submitForm}
          >
            {({ values }) => (
              <Form>
                <FormContainer>
                  <InputField
                    label="First Name"
                    name="first_name"
                    placeholder="Input First Name"
                  />
                  <InputField
                    label="Last Name"
                    name="last_name"
                    placeholder="Input Last Name"
                  />
                  <DuplicableWrapper
                    label="Phones"
                    name="phones"
                    placeholder="Input Phone Number"
                    value={values.phones}
                  />
                  {isEditPage && (
                    <InputField
                      label="Created At"
                      name="created_at"
                      value={values.created_at}
                      disabled={true}
                    />
                  )}
                  <ButtonContainer>
                    <Button
                      type="submit"
                      aria-label={
                        isEditPage ? "Update Contact" : "Create Contact"
                      }
                    >
                      {isEditPage ? "Update" : "Create"}
                    </Button>
                    <Button
                      type="button"
                      className="button__light"
                      onClick={goBack}
                      aria-label="Cancel"
                    >
                      Cancel
                    </Button>
                  </ButtonContainer>
                </FormContainer>
              </Form>
            )}
          </Formik>
        </div>
      </Card>
    </MainLayout>
  );
}
