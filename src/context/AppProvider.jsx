/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import AppContext from './AppContext';
import useFetch from '../hooks/useFetch';

function AppProvider({ children }) {
  const [dataPlanet, setDataPlanet] = useState([]);
  const [searchPlanet, setSearchPlanet] = useState([]);
  const [searchByClass, setSearchByClass] = useState({
    column: 'population',
    comparison: 'maior que',
    number: 0,
  });
  const [planetsFilteredState, setPlanetsFilteredState] = useState([]);
  const [valuesOptions, setValuesOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const { errors, isLoading, makeFetch } = useFetch();
  const [activeFilter, setActiveFilter] = useState(false);

  useEffect(() => {
    const responseApi = async (url) => {
      const resposta = await makeFetch(url);
      resposta.results.forEach((e) => delete e.residents);
      setDataPlanet(resposta);
      setPlanetsFilteredState(resposta.results);
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
    const filterName = results.filter((el) => el.name.toLowerCase()
      .includes(planet.toLowerCase()));
    setSearchPlanet(filterName);
  };

  const filterClass = (e) => {
    setSearchByClass({
      ...searchByClass,
      [e.target.name]: e.target.value,
    });
  };

  const clickFilter = () => {
    if (searchByClass.comparison === 'maior que') {
      const planetsFiltered = planetsFilteredState.filter((planetas) => (
        +(planetas[searchByClass.column]) > +(searchByClass.number)
      ));
      setPlanetsFilteredState(planetsFiltered);
      const ppla = valuesOptions.filter((e) => e !== searchByClass.column);
      setValuesOptions(ppla);
      setSearchByClass({ ...searchByClass, column: valuesOptions[0] });
    }
    if (searchByClass.comparison === 'menor que') {
      const planetsFiltered = planetsFilteredState.filter((planetas) => (
        +(planetas[searchByClass.column]) < +(searchByClass.number)
      ));
      setPlanetsFilteredState(planetsFiltered);
      const ppla = valuesOptions.filter((e) => e !== searchByClass.column);
      setValuesOptions(ppla);
      setSearchByClass({ ...searchByClass, column: valuesOptions[0] });
    }
    if (searchByClass.comparison === 'igual a') {
      const planetsFiltered = planetsFilteredState.filter((planetas) => (
        +(planetas[searchByClass.column]) === +(searchByClass.number)
      ));
      setPlanetsFilteredState(planetsFiltered);
      const ppla = valuesOptions.filter((e) => e !== searchByClass.column);
      setValuesOptions(ppla);
      setSearchByClass({ ...searchByClass, column: valuesOptions[0] });
    }
  };

  const values = useMemo(() => ({
    isLoading,
    errors,
    makeFetch,
    dataPlanet,
    searchPlanet,
    handleChange,
    searchByClass,
    filterNamePlanets,
    activeFilter,
    filterClass,
    clickFilter,
    planetsFilteredState,
    valuesOptions,
  }), [
    isLoading,
    errors,
    dataPlanet,
    searchPlanet,
    searchPlanet,
    activeFilter,
    filterClass,
    searchByClass,
    planetsFilteredState,
    valuesOptions,
  ]);

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
