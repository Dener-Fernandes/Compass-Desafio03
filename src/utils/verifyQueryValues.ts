import { PaginationOption01 } from "../interfaces";

function verifyQueryValues(query: PaginationOption01): boolean {
  let result = false;

  for (const item of query) {
    if (item) {
      result = true;
      break;
    }
  }

  return result;
}

export { verifyQueryValues };
