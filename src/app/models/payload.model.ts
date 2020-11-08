// might want to extract pageSize and page out and its just something
// the search method adds on? or something else adds on to the payload?
// cause otherwise, every search payload needs these two fields on it

// fix this later ...

export interface CategorySearchPayload {
  name: string;
  sortBy?: { value: string; dir: string };
  page?: number;
  pageSize?: number;
}
