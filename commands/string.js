import { argumentIgnore } from './conditions.js';
import * as utils from '../utils.js';

export const getLength = (str) => `${utils.copyOrWrite(str)} ${str} to REG_A
write OP_GET_LENGTH to REG_OP
cpu_exec`;

export const isStartsWith = (str, startsWith, true_condition, false_condition) => {
    let output = `${utils.copyOrWrite(str)} ${str} to REG_A
${utils.copyOrWrite(startsWith)} ${startsWith} to REG_B
write OP_STARTS_WITH to REG_OP
cpu_exec`;
    
    if (true_condition && true_condition !== argumentIgnore) {
        output += `\njump_if ${true_condition}`;
    }

    if (false_condition && false_condition !== argumentIgnore) {
        output += `\njump_if_not ${false_condition}`;
    }

    return output;
}

export const getColumn = (str, columnNumber, separator) => `${utils.copyOrWrite(str)} ${str} to REG_A
${utils.copyOrWrite(columnNumber)} ${columnNumber} to REG_B
${utils.copyOrWrite(separator)} ${separator} to REG_C
write OP_GET_COLUMN to REG_OP
cpu_exec`;

export const replaceColumn = (str, columnNumber, separator, newString) => `${utils.copyOrWrite(str)} ${str} to REG_A
${utils.copyOrWrite(columnNumber)} ${columnNumber} to REG_B
${utils.copyOrWrite(separator)} ${separator} to REG_C
${utils.copyOrWrite(newString)} ${newString} to REG_D
write OP_REPLACE_COLUMN to REG_OP
cpu_exec`;

export const concat = (a, b, separator) => `${utils.copyOrWrite(a)} ${a} to REG_A
${utils.copyOrWrite(b)} ${b} to REG_B
${utils.copyOrWrite(separator)} ${separator} to REG_C
write OP_CONCAT_WITH to REG_OP
cpu_exec`;
