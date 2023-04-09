interface ISearchReserveQuery {
  id_user?: string;
  id_car?: string;
  start_date?: string;
  end_date?: string;
  final_value?: Number;
  page?: number;
  limit?: number;
}

export { ISearchReserveQuery }