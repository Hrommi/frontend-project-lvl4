// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import gon from 'gon';
import io from 'socket.io-client';
import Rollbar from 'rollbar';
import '../assets/application.scss';
import './i18n';
import run from './init';

// eslint-disable-next-line no-new
new Rollbar({
  accessToken: process.env.ROLLBAR_CLIENT_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io();

run(gon, socket);
