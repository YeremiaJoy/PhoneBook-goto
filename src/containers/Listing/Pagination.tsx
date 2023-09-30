import { VariablesListingContext } from "@/helpers/context";
import { counterShowPage, generatePageOptions } from "@/helpers/pagination";
import {
  PageOption,
  PageOptionContainer,
  PageShow,
  PaginationWrapper,
} from "@/styles/02_containers/Pagination";
import { useState, useContext } from "react";

export default function Pagination({ total }: { total: number }) {
  const { setVariables } = useContext(VariablesListingContext);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
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
  return (
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
  );
}
