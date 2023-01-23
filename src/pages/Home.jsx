import React, { useContext } from 'react';
import appContext from '../context/AppContext';

function Home() {
  const { isLoading, errors, makeFetch } = useContext(appContext);

  useEffect(() => {
    const responseApi = async (url) => {
      const response = await makeFetch(url);
      return response;
    };
    responseApi('https://swapi.dev/api/planets');
    console.log(responseApi('https://swapi.dev/api/planets'));
  }, []);
  return (
    <div>
      home
    </div>
  );
}

export default Home;
