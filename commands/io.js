import * as utils from '../utils.js';

const readInputModes = [
    'KEYBOARD_READ_LINE', 'KEYBOARD_READ_LINE_SILENTLY',
    'KEYBOARD_READ_CHAR', 'KEYBOARD_READ_CHAR_SILENTLY'
];

const textColors = [
    'COLOR_NO',
    'COLOR_GREEN',
    'COLOR_YELLOW',
    'COLOR_RED',
    'COLOR_BLACK',
    'COLOR_BLUE',
    'COLOR_MAGENTA',
    'COLOR_CYAN',
    'COLOR_WHITE'
];

export const readInput = (mode) => `write ${mode in readInputModes ? mode : readInputModes[0]} to REG_A
write OP_READ_INPUT to REG_OP
cpu_exec`;

export const display = (text, color = textColors[0], isNewLine = true) => `${utils.copyOrWrite(text)} ${text} to DISPLAY_BUFFER
write ${color in textColors ? color : textColors[0]} to DISPLAY_COLOR
write ${isNewLine ? 'OP_DISPLAY_LN' : 'OP_DISPLAY'} to REG_OP
cpu_exec`;

// TODO: read/write
