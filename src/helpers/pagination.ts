export function counterShowPage(
  perPage: number,
  currentPage: number,
  total: number
): number {
  if (perPage * currentPage > total) return total;
  return perPage * currentPage;
}

export function generatePageOptions(
  total: number,
  perPage: number,
  currentPage: number
): number[] {
  const totalPageNumber = Math.ceil(total / Number(perPage));

  const maxPagination = 5;
  let parsedArray = [1, totalPageNumber];
  const currPage = Number(currentPage);

  if (totalPageNumber > maxPagination) {
    if (currPage === 0) return [];
    else if (currPage === 1) {
      parsedArray.splice(1, 0, currPage + 1, currPage + 2, currPage + 3);
    } else if (currPage === totalPageNumber) {
      parsedArray.splice(1, 0, currPage - 3, currPage - 2, currPage - 1);
    } else if (currPage - 1 === 1) {
      parsedArray.splice(1, 0, currPage, currPage + 1, currPage + 2);
    } else if (currPage + 1 === totalPageNumber) {
      parsedArray.splice(1, 0, currPage - 2, currPage - 1, currPage);
    } else {
      parsedArray.splice(1, 0, currPage - 1, currPage, currPage + 1);
    }
  } else {
    // create pagination number follows totalPageNumber variable
    // source: https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
    parsedArray = Array.from({ length: totalPageNumber }, (_, i) => i + 1);
  }
  return parsedArray;
}
