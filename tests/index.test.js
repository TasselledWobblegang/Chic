//test that root is querying the document
// test that the react component is rendering
import React from 'react';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import styles from './styles/style.css';
import { render, screen, waitFor } from '@testing-library/react'

// describe('root is establishing the connection to #root', ()=>{

//     describe('LabeledText', () => {

//         let dummy = {
//             "margin": 5px;
//             "text-decoration": none;
//             "display": flex;
//             "flex-direction": column;
//         }

//         beforeAll(() => {

//         })

//     })

// })

describe('root is establishing the connection to #root', () => {
    
    const input = screen.getByLabelText('#root')
    // Events and assertions...

    const dummy = {
        "margin": '5px',
        "text-decoration": 'none',
        "display": 'flex',
        "flex-direction": 'column',
    }

    test('the queryselector should match the ',() => {
        expect(document.querySelector('#root').toEqual(document.querySelector(dummy)));

    })


  })


test('unit testing react component', () => {
    // render(<App />)
    // const input = screen.getByLabelText('user_id')
    // Events and assertions...
  })