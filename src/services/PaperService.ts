import { API_BASE_URLv3 } from './api';

export async function searchPaperByText(
  text: string,
  offset: number = 0,
  limit: number = 10,
) {
  console.log({ text, offset, limit });
  if (!text) throw new Error('No text provided');

  let queryParams = `q=(${encodeURIComponent(text)})`;
  if (offset !== undefined) queryParams += `&offset=${offset}`;
  if (limit !== undefined) queryParams += `&limit=${limit}`;

  try {
    const response = await fetch(`${API_BASE_URLv3}/works/?${queryParams}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    // handle error
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getAllPapers() {
  try {
    const response = await fetch(`${API_BASE_URLv3}/search/works`);
    const result = await response.json();
    return result;
  } catch (err) {
    // handle error
    console.log('Error in PaperService: ', err);
    throw err;
  }
}

export default {
  searchPaperByText,
  getAllPapers,
};
