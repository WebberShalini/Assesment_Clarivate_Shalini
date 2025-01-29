export const fetchItemsFromAPI = async (page) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=10`
  );
  return response.json();
};
