import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { act } from 'react-dom/test-utils';
import AppProvider from '../context/AppProvider';
import testData from '../../cypress/mocks/testData';
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
        <App />
      )
      
    })

  })
  test('Testa se os filtros de input e dropdown existem', async () => {
    render(<App />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
      const button = screen.getByRole('button', {
        name: /filtrar/i
      });
      expect(button).toBeInTheDocument();
    });
    // const input = screen.getByTestId("name-filter");
    // const column = screen.getByTestId("column-filter");
    // const comparison = screen.getByTestId("comparison-filter");
    // const number = screen.getByTestId("value-filter");

    // expect(input).toBeInTheDocument();
    // expect(column).toBeInTheDocument();
    // expect(comparison).toBeInTheDocument();
    // expect(number).toBeInTheDocument();
  })
});
 