import React, { useContext } from 'react';
import appContext from '../context/AppContext';

function Filter() {
  const { filterNamePlanets } = useContext(appContext);
  // const { results } = dataPlanet;

  return (
    <div>
      <input
        onChange={ filterNamePlanets }
        data-testid="name-filter"
        type="text"
      />
    </div>
  );
}

export default Filter;
