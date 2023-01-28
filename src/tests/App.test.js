import React from 'react';
import { getAllByTestId, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { act } from 'react-dom/test-utils';
import AppProvider from '../context/AppProvider';
import Filter from '../components/Filter';
import Home from '../components/Home';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';
// test('I am your test', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Hello, App!/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Testa a aplicação', () => {
  const resposta = {
    // count: 60,
    // next: "https://swapi.dev/api/planets/?page=2",
    // token: 'token',
    results: [
      {
          name: "Tatooine", 
          rotation_period: "23", 
          orbital_period: "304", 
          diameter: "10465", 
          climate: "arid", 
          gravity: "1 standard", 
          terrain: "desert", 
          surface_water: "1", 
          population: "200000",  
          films: [
              "https://swapi.dev/api/films/1/", 
              "https://swapi.dev/api/films/3/", 
              "https://swapi.dev/api/films/4/", 
              "https://swapi.dev/api/films/5/", 
              "https://swapi.dev/api/films/6/"
          ], 
          created: "2014-12-09T13:50:49.641000Z", 
          edited: "2014-12-20T20:58:18.411000Z", 
          url: "https://swapi.dev/api/planets/1/"
      }, 
      {
          name: "Alderaan", 
          rotation_period: "24", 
          orbital_period: "364", 
          diameter: "12500", 
          climate: "temperate", 
          gravity: "1 standard", 
          terrain: "grasslands, mountains", 
          surface_water: "40", 
          population: "2000000000",
          films: [
              "https://swapi.dev/api/films/1/", 
              "https://swapi.dev/api/films/6/"
          ], 
          created: "2014-12-10T11:35:48.479000Z", 
          edited: "2014-12-20T20:58:18.420000Z", 
          url: "https://swapi.dev/api/planets/2/"
      }, 
  ]
  }
  beforeEach( async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData)
    });
    await act(async () => {
      render(
        <App>
          <AppProvider>
            <Filter />
            <Home />
          </AppProvider>
        </App>
      )   
    })

  })

  afterEach(() => jest.restoreAllMocks());
  test('Testa se os filtros e os botões de input e dropdown existem', async () => {
    // render(<App />);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
    });
    const button = screen.getByRole('button', {
      name: /filtrar/i
    });
    const input = screen.getByTestId("name-filter");
    const column = screen.getByTestId("column-filter");
    const comparison = screen.getByTestId("comparison-filter");
    const number = screen.getByTestId("value-filter");
    const buttonRemoveFilter = screen.getByRole('button', {
      name: /remover filtros/i
    });

    expect(input).toBeInTheDocument();
    expect(column).toBeInTheDocument();
    expect(comparison).toBeInTheDocument();
    expect(number).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(buttonRemoveFilter).toBeInTheDocument();
  })

  test('Testa se a table é renderizada', async () => {
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
    });
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  })

  test('Testa o filtro de Search com o nome "Tatooine"', async () => {
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
    });
    const input = screen.getByTestId("name-filter");
    act(() => {
      userEvent.type(input, 'tatooine');
    })
    const planet = screen.getByRole('cell', {
      name: /tatooine/i
    });
    expect(planet).toBeInTheDocument();
  })
  test('Testa os filtros de dropdown', async () => {
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
    });
    const column = screen.getByTestId("column-filter");
    const comparison = screen.getByTestId("comparison-filter");
    const number = screen.getByTestId("value-filter");
    const button = screen.getByRole('button', {
      name: /filtrar/i
    });
    act(() => {
      userEvent.selectOptions(column, 'rotation_period');
      userEvent.selectOptions(comparison, 'igual a');
      userEvent.type(number, '23');
      userEvent.click(button);
    })
    const buttonFilter = screen.getByRole('button', {
      name: /apagar filtro/i
    })
    const tatooine = screen.getByRole('cell', {
      name: /tatooine/i
    });
    const hoth = screen.getByRole('cell', {
      name: /hoth/i
    });
    const dagobah = screen.getByRole('cell', {
      name: /dagobah/i
    });
    expect(buttonFilter).toBeInTheDocument();
    // expect(planetas.length).toEqual(6);
    expect(tatooine).toBeInTheDocument();
    expect(hoth).toBeInTheDocument();
    expect(dagobah).toBeInTheDocument();
    userEvent.click(buttonFilter);
    const bespin = screen.getByRole('cell', {
      name: /bespin/i
    });
    expect(bespin).toBeInTheDocument();
  })

  test("Testa mais de um filtro", async () => {
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
    });
    const column = screen.getByTestId("column-filter");
    const comparison = screen.getByTestId("comparison-filter");
    const number = screen.getByTestId("value-filter");
    const button = screen.getByTestId("button-filter");

    act(() => {
      userEvent.selectOptions(column, "diameter");
      userEvent.selectOptions(comparison, 'maior que');
      userEvent.type(number, '8900');
      userEvent.click(button);
      userEvent.clear(number);
      userEvent.selectOptions(column, "population");
      userEvent.selectOptions(comparison, 'menor que');
      userEvent.type(number, '10000000');
      userEvent.click(button);
    });

    const filterSelected = screen.getAllByTestId("filter");
    expect(filterSelected).toHaveLength(2);

    const buttonRemoveFilter = screen.getByRole('button', {
      name: /apagar filtro/i
    });
    userEvent.click(buttonRemoveFilter[1]);
    expect(filterSelected).toHaveLength(1);
  });

});
 