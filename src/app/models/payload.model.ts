// might want to extract pageSize and page out and its just something
// the search method adds on? or something else adds on to the payload?
export interface CategorySearchPayload {
  name: string;
  page?: number;
  pageSize?: number;
}
