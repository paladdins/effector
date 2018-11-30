//@flow
// import invariant from 'invariant'
import type {SingleStepValidContext} from '../effector/index.h'
import {cmd as Cmd, ctx as Ctx} from 'effector/datatype/FullDatatype.bs'

// function stepArg(ctx: SingleStepValidContext) {
//  switch (ctx.type) {
//   case Ctx.EMIT:
//    return ctx.data.payload
//   case Ctx.COMPUTE:
//    return ctx.data.result
//   case Ctx.FILTER:
//   case Ctx.UPDATE:
//    return ctx.data.value
//   default:
//    throw new Error('RunContext is not supported')
//  }
// }
import {singleStep as singleStepRE, stepArg} from './Walk.bs'
import {
  singleCompute,
  singleEmit,
  singleFilter,
  singleRun,
  singleUpdate,
} from './singleStep'

export function singleStep(
  single: Cmd.Cmd,
  ctx: SingleStepValidContext,
  transactions: Array<() => void>,
): SingleStepValidContext | Ctx.run | void {
  const arg = stepArg(ctx)
  // if (ctx.type === Ctx.FILTER && !ctx.data.isChanged) return
  switch (single.type) {
    case Cmd.EMIT:
      return singleEmit(arg, single, ctx, transactions)
    case Cmd.FILTER:
      return singleFilter(arg, single, ctx, transactions)
    case Cmd.RUN:
      return singleRun(arg, single, ctx, transactions)
    case Cmd.UPDATE:
      return singleUpdate(arg, single, ctx, transactions)
    case Cmd.COMPUTE:
      return singleCompute(arg, single, ctx, transactions)
    default:
      /*::(single.type: empty)*/
      throw new Error('impossible case')
  }
}
