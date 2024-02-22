import { IHoliday } from '../interfaces/calendar.interfaces';

const API_URL: string = import.meta.env.VITE_API_URL;

export const fetchWorldwideHolidays = async (): Promise<
  IHoliday[] | undefined
> => {
  const url = API_URL + '/api/v3/NextPublicHolidaysWorldwide';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    if (!response.ok) throw new Error('Bad fetch response');
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
