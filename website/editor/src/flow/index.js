//@flow

import {createEffect, createStore, createEvent} from 'effector'
import type {FlowError} from './index.h'

export const showTypeNode = createEvent<void>()
export const hideTypeNode = createEvent<void>()

export const typeAtPos = createEffect<
  {|
    filename: string,
    body: string,
    line: number,
    col: number,
  |},
  {|
    code: {|c: string, t: number, l: number|} | 'fail',
    success: boolean,
    processTime: number,
    service: 'type-at-pos',
  |},
  mixed,
>()

export const checkContent = createEffect<
  string,
  {|
    code: Array<FlowError> | 'fail',
    success: boolean,
    processTime: number,
    service: 'flow',
  |},
  mixed,
>()
