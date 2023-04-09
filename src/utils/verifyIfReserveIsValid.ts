import { IReserve } from "../interfaces/IReserve";

interface IIsReserveValid {
  doesUserHaveReserveInThisDate: boolean;
  isCarAlreadyReservedInThisDate: boolean;
}

async function verifyIfReserveIsValid(
  id_user: string,
  id_car: string,
  start_date: string,
  end_date: string,
  reservesList: IReserve[],
  typeMethod: string
): Promise<IIsReserveValid> {
  const isReserveValid = { 
    doesUserHaveReserveInThisDate: true, 
    isCarAlreadyReservedInThisDate: true 
  };

  // Check if user exists and if the dates overlap
  for (const reserve of reservesList) {
    if (reserve.id_user === id_user) {
      if (start_date <= reserve.end_date && end_date >= reserve.start_date && typeMethod === "create") {
        isReserveValid.doesUserHaveReserveInThisDate = false;
        break;
      }
    }
  }

  // Check if car exists and if the dates overlap
  for (const reserve of reservesList) {
    if (reserve.id_car === id_car) {
      if (start_date <= reserve.end_date && end_date >= reserve.start_date && typeMethod === "create") {
        isReserveValid.isCarAlreadyReservedInThisDate = false;
        break;
      }
    }
  }

  // Return result
  return isReserveValid;
}

export { verifyIfReserveIsValid }