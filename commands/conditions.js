import * as utils from '../utils.js';

export const argumentIgnore = '_';

const simpleEqual = (a, b, command, true_condition, false_condition) => {
    let output = `${utils.copyOrWrite(a)} ${a} to REG_A`;

    if (b !== null) {
        output += `\n${utils.copyOrWrite(b)} ${b} to REG_B`;
    }

    output += `\nwrite ${command} to REG_OP
cpu_exec`;

    output += `\njump_if ${true_condition}`;

    if (false_condition && false_condition !== argumentIgnore) {
        output += `\njump_if_not ${false_condition}`;
    }

    return output;
}

export const commandIsNumber = (a, true_condition, false_condition) => simpleEqual(a, null, 'OP_IS_NUM', true_condition, false_condition);

export const commandEqual = (a, b, true_condition, false_condition) => simpleEqual(a, b, 'OP_CMP_EQ', true_condition, false_condition);

export const commandNotEqual = (a, b, true_condition, false_condition) => simpleEqual(a, b, 'OP_CMP_NEQ', true_condition, false_condition);

export const commandLessThan = (a, b, true_condition, false_condition) => simpleEqual(a, b, 'OP_CMP_LT', true_condition, false_condition);
export const commandLessThanOrEqual = (a, b, true_condition, false_condition) => simpleEqual(a, b, 'OP_CMP_LE', true_condition, false_condition);

export const commandMoreThan = (a, b, true_condition, false_condition) => simpleEqual(b, a, 'OP_CMP_LT', true_condition, false_condition);
export const commandMoreThanOrEqual = (a, b, true_condition, false_condition) => simpleEqual(b, a, 'OP_CMP_LE', true_condition, false_condition);

export const commandContains = (a, b, true_condition, false_condition) => simpleEqual(a, b, 'OP_CONTAINS', true_condition, false_condition);
