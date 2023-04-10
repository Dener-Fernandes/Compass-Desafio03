interface ISearchUserQuery {
  name?: string;
  cpf?: string;
  birth?: string;
  email?: string;
  password?: string;
  cep?: string;
  qualified?: boolean;
  patio?: string;
  complement?: string;
  neighbourhood?: string;
  locality?: string;
  uf?: string;
  page?: number;
  limit?: number;
}

export { ISearchUserQuery }