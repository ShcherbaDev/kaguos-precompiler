import * as utils from '../utils.js';

export const commandAdd = (a, b) => `${utils.copyOrWrite(a)} ${a} to REG_A
${utils.copyOrWrite(b)} ${b} to REG_B
write OP_ADD to REG_OP
cpu_exec`;

export const commandSubtract = (a, b) => `${utils.copyOrWrite(a)} ${a} to REG_A
${utils.copyOrWrite(b)} ${b} to REG_B
write OP_SUB to REG_OP
cpu_exec`;

export const commandIncrement = (a) => `${utils.copyOrWrite(a)} ${a} to REG_A
write OP_INCR to REG_OP
cpu_exec`;

export const commandDecrement = (a) => `${utils.copyOrWrite(a)} ${a} to REG_A
write OP_DECR to REG_OP
cpu_exec`;

export const commandDivide = (a, b) => `${utils.copyOrWrite(a)} ${a} to REG_A
${utils.copyOrWrite(b)} ${b} to REG_B
write OP_DIV to REG_OP
cpu_exec`;

export const commandModulus = (a, b) => `${utils.copyOrWrite(a)} ${a} to REG_A
${utils.copyOrWrite(b)} ${b} to REG_B
write OP_MOD to REG_OP
cpu_exec`;

export const commandMultiply = (a, b) => `${utils.copyOrWrite(a)} ${a} to REG_A
${utils.copyOrWrite(b)} ${b} to REG_B
write OP_MUL to REG_OP
cpu_exec`;
