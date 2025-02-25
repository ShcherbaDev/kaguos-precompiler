import { readFile, writeFile } from 'node:fs/promises';
import * as math from './commands/math.js';
import * as conditions from './commands/conditions.js';
import * as string from './commands/string.js';

// =============
//  Precompiler
// =============

const commandsMap = {
    // Math
    'add': math.commandAdd,
    'sub': math.commandSubtract,
    
    '++': math.commandIncrement,
    'inc': math.commandIncrement,

    '--': math.commandDecrement,
    'dec': math.commandDecrement,

    'div': math.commandDivide,
    'mod': math.commandModulus,
    'mlt': math.commandMultiply,

    // Conditions
    'is_num': conditions.commandIsNumber,
    'is_eq': conditions.commandEqual,
    'is_neq': conditions.commandNotEqual,
    'is_less': conditions.commandLessThan,
    'is_less_or_equal': conditions.commandLessThanOrEqual,
    'is_more': conditions.commandMoreThan,
    'is_more_or_equal': conditions.commandMoreThanOrEqual,
    'is_contains': conditions.commandContains,

    // String
    'length': string.getLength,
    'is_starts_with': string.isStartsWith,
    'column_get': string.getColumn,
    'column_replace': string.replaceColumn,
    'concat': string.concat
};

const precompileCommand = (command) => {
    const tokens = command.split(' ');
    const commandName = tokens[0];
    const args = tokens.slice(1);

    let output = command; // Default case - count unknown command as native KaguOS and just copy it to output

    if (!(commandName in commandsMap)) {
        return output;
    }

    return `// ${command}\n${commandsMap[commandName](...args)}`;
}

const [inputFilePath, outputFilePath] = process.argv.slice(2);

if (!inputFilePath) {
    console.log('No input file provided');
    process.exit(0);
}

(async () => {
    try {
        const data = await readFile(inputFilePath, { encoding: 'utf-8' });
        
        const precompilatonResult = data
            .trim()
            .split('\n')
            .map((command) => precompileCommand(command))
            .join('\n');
        
        // No output file provided - log to stdout
        if (!outputFilePath) {
            console.log(precompilatonResult);
        }
        else {
            await writeFile(outputFilePath, precompilatonResult);
        }
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }

    process.exit(0);
})();
