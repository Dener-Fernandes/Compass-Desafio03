function parseAndValidateDate(dateString: string): Date | null {
  const [day, month, year] = dateString.split('/').map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  ) {

    const formattedDate: string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate as unknown as Date;
  }

  return null;
}

export { parseAndValidateDate }