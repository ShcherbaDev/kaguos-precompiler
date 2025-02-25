// ======
//  Math
// ======

const commandAdd = (a, b) => `${_copyOrWrite(a)} ${a} to REG_A
${_copyOrWrite(b)} ${b} to REG_B
write OP_ADD to REG_OP
cpu_exec`;

const commandSubtract = (a, b) => `${_copyOrWrite(a)} ${a} to REG_A
${_copyOrWrite(b)} ${b} to REG_B
write OP_SUB to REG_OP
cpu_exec`;

const commandIncrement = (a) => `${_copyOrWrite(a)} ${a} to REG_A
write OP_INCR to REG_OP
cpu_exec`;

const commandDecrement = (a) => `${_copyOrWrite(a)} ${a} to REG_A
write OP_DECR to REG_OP
cpu_exec`;

const commandDivide = (a, b) => `${_copyOrWrite(a)} ${a} to REG_A
${_copyOrWrite(b)} ${b} to REG_B
write OP_DIV to REG_OP
cpu_exec`;

const commandModulus = (a, b) => `${_copyOrWrite(a)} ${a} to REG_A
${_copyOrWrite(b)} ${b} to REG_B
write OP_MOD to REG_OP
cpu_exec`;

const commandMultiply = (a, b) => `${_copyOrWrite(a)} ${a} to REG_A
${_copyOrWrite(b)} ${b} to REG_B
write OP_MUL to REG_OP
cpu_exec`;

// ============
//  Conditions
// ============

const argumentIgnore = '_';

const _simpleEqual = (a, b, command, true_condition, false_condition) => {
    let output = `${_copyOrWrite(a)} ${a} to REG_A`;

    if (b !== null) {
        output += `\n${_copyOrWrite(b)} ${b} to REG_B`;
    }

output += `\nwrite ${command} to REG_OP
cpu_exec`;

    output += `\njump_if ${true_condition}`;

    if (false_condition && false_condition !== argumentIgnore) {
        output += `\njump_if_not ${false_condition}`;
    }

    return output;
}

const commandIsNumber = (a, true_condition, false_condition) => _simpleEqual(a, null, 'OP_IS_NUM', true_condition, false_condition);

const commandEqual = (a, b, true_condition, false_condition) => _simpleEqual(a, b, 'OP_CMP_EQ', true_condition, false_condition);

const commandNotEqual = (a, b, true_condition, false_condition) => _simpleEqual(a, b, 'OP_CMP_NEQ', true_condition, false_condition);

const commandLessThan = (a, b, true_condition, false_condition) => _simpleEqual(a, b, 'OP_CMP_LT', true_condition, false_condition);
const commandLessThanOrEqual = (a, b, true_condition, false_condition) => _simpleEqual(a, b, 'OP_CMP_LE', true_condition, false_condition);

const commandMoreThan = (a, b, true_condition, false_condition) => _simpleEqual(b, a, 'OP_CMP_LT', true_condition, false_condition);
const commandMoreThanOrEqual = (a, b, true_condition, false_condition) => _simpleEqual(b, a, 'OP_CMP_LE', true_condition, false_condition);

const commandContains = (a, b, true_condition, false_condition) => _simpleEqual(a, b, 'OP_CONTAINS', true_condition, false_condition);

// =============
//  Precompiler
// =============

const _copyOrWrite = (text) => {
    const isCopyable = text.startsWith('var:') || !/"(.+)"/.test(text);
    return isCopyable ? 'copy' : 'write';
}

const commandsMap = {
    // Math commands
    'add': commandAdd,
    'sub': commandSubtract,
    
    '++': commandIncrement,
    'inc': commandIncrement,

    '--': commandDecrement,
    'dec': commandDecrement,

    'div': commandDivide,
    'mod': commandModulus,
    'mlt': commandMultiply,

    // Conditions
    'is_num': commandIsNumber,
    'is_eq': commandEqual,
    'is_neq': commandNotEqual,
    'is_less': commandLessThan,
    'is_less_or_equal': commandLessThanOrEqual,
    'is_more': commandMoreThan,
    'is_more_or_equal': commandMoreThanOrEqual,
    'is_contains': commandContains
};

const precompileCommand = (command) => {
    const tokens = command.split(' ');
    const commandName = tokens[0];
    const args = tokens.slice(1);

    let output = command; // Default case - count unknown command as native KaguOS and just copy it to output

    if (commandName in commandsMap) {
        output = commandsMap[commandName](...args);
    }

    return `
// ${command}
${output}`;
}

// console.log(precompileCommand('add FREE_MEMORY_START "2"'));
// console.log(precompileCommand('++ REG_RES'));
// console.log(precompileCommand('inc REG_RES'));
// console.log(precompileCommand('sub var:dadadad *REG_RES'));
console.log(precompileCommand('is_num 2 label:true label:false'));
