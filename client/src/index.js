import React from 'react';
import ReactDOM from 'react-dom';
import './App_styles.scss';
//import dotenv from 'dotenv';
import App from './view/App';
import { YouTubeProvider } from '../src/state/YouTube.store'
//dotenv.config();

ReactDOM.render( <YouTubeProvider><App /></YouTubeProvider>, document.getElementById('root'));
