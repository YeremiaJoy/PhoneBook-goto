import { LoadingContainer } from "@/styles/02_containers/Loading";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  return (
    <LoadingContainer>
      <FontAwesomeIcon icon={faSpinner} />
    </LoadingContainer>
  );
}
