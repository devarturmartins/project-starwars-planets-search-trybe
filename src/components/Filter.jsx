import React, { useContext } from 'react';
import appContext from '../context/AppContext';

function Filter() {
  const {
    filterNamePlanets,
    filterClass,
    clickFilter,
    searchByClass,
    valuesOptions,
    filtrosSelecionados,
    deleteFilter,
    removeAllFilter,
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
        {
          valuesOptions.map((e) => (
            <option key={ e } value={ e }>{ e }</option>
          ))
        }

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
      <button
        onClick={ () => removeAllFilter() }
        data-testid="button-remove-filters"
      >
        Remover Filtros
      </button>
      {
        filtrosSelecionados?.map((e, i) => (
          <div key={ i } data-testid="filter">
            <span>{ `${e.column} ${e.comparison} ${e.number}` }</span>
            <button
              onClick={ () => deleteFilter(e) }
            >
              Apagar filtro
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default Filter;
