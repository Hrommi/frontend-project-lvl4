// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import gon from 'gon';
import io from 'socket.io-client';
import '../assets/application.scss';
import run from './init';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io();

run(gon, socket);
