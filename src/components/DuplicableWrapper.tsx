import { InputFieldType } from "@/definitions/InputField";
import { Button } from "@/styles/01_components/Button";
import {
  DuplicableInputContainer,
  DuplicableWrapperContainer,
  RemoveButtonContainer,
} from "@/styles/01_components/DuplicableWrapper";
import { Input, MessageDanger } from "@/styles/01_components/Field";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, FieldArray } from "formik";

export default function DuplicableWrapper({
  label,
  name,
  placeholder,
  value,
  disabled,
}: InputFieldType) {
  return (
    <DuplicableWrapperContainer>
      <label>{label}</label>
      <FieldArray name={name}>
        {({ remove, push }) => (
          <DuplicableInputContainer>
            {value.length > 0 &&
              value.map((phone: any, index: any) => (
                <div key={index}>
                  <div className="field">
                    <Field
                      as={Input}
                      id={`${name}-${index}`}
                      name={`${name}-${index}`}
                      placeholder={placeholder}
                      type="text"
                      disabled={disabled}
                    />
                    {/* Delete button was hidden because there is no requirement to delete phone number */}
                    {/* <Button
                      type="button"
                      className="button__danger"
                      onClick={() => remove(index)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button> */}
                  </div>
                  <MessageDanger>
                    <ErrorMessage name={`${name}-${index}`} />
                  </MessageDanger>
                </div>
              ))}
            <RemoveButtonContainer>
              <Button
                type="button"
                aria-label="Add More"
                onClick={() => push({ number: "" })}
              >
                <FontAwesomeIcon icon={faPlus} /> Add More
              </Button>
            </RemoveButtonContainer>
          </DuplicableInputContainer>
        )}
      </FieldArray>
    </DuplicableWrapperContainer>
  );
}
