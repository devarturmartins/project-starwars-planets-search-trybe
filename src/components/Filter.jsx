import React, { useContext } from 'react';
import appContext from '../context/AppContext';

function Filter() {
  const {
    filterNamePlanets,
    filterClass,
    clickFilter,
    searchByClass,
  } = useContext(appContext);
  // const { results } = dataPlanet;

  return (
    <div>
      <input
        onChange={ filterNamePlanets }
        data-testid="name-filter"
        type="text"
      />
      <select name="column" onChange={ filterClass } data-testid="column-filter">
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        onChange={ filterClass }
        name="comparison"
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        onChange={ filterClass }
        value={ searchByClass.number }
        name="number"
        type="number"
        data-testid="value-filter"
      />
      <button onClick={ clickFilter } data-testid="button-filter">Filtrar</button>
    </div>
  );
}

export default Filter;
