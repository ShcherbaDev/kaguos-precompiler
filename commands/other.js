import * as utils from '../utils.js';

export const commandNoOperation = (delay) => `${utils.copyOrWrite(delay)} ${delay} to REG_A
write OP_NOP to REG_OP
cpu_exec`;

export const commandHalt = () => `write OP_HALT to REG_OP
cpu_exec`;

export const commandUnknown = () => `write OP_UNKNOWN to REG_OP
cpu_exec`;
