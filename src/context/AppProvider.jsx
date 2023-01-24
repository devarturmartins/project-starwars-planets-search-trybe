/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import AppContext from './AppContext';
import useFetch from '../hooks/useFetch';

function AppProvider({ children }) {
  const [dataPlanet, setDataPlanet] = useState([]);
  const [searchPlanet, setSearchPlanet] = useState([]);
  const { errors, isLoading, makeFetch } = useFetch();
  const [activeFilter, setActiveFilter] = useState(false);

  useEffect(() => {
    const responseApi = async (url) => {
      const resposta = await makeFetch(url);
      resposta.results.forEach((e) => delete e.residents);
      setDataPlanet(resposta);
    };
    responseApi('https://swapi.dev/api/planets');
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    return value;
  };

  const filterNamePlanets = (e) => {
    setActiveFilter(true);
    const planet = handleChange(e);
    const { results } = dataPlanet;
    const filterName = results.filter((el) => el.name.toLowerCase().includes(planet));
    // console.log(filterName);
    setSearchPlanet(filterName);
  };

  const values = useMemo(() => ({
    isLoading,
    errors,
    makeFetch,
    dataPlanet,
    searchPlanet,
    handleChange,
    filterNamePlanets,
    activeFilter,
  }), [isLoading, errors, dataPlanet, searchPlanet, searchPlanet, activeFilter]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default AppProvider;
