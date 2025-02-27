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

export const commandReadInput = (mode) => `write ${mode in readInputModes ? mode : readInputModes[0]} to REG_A
write OP_READ_INPUT to REG_OP
cpu_exec`;

export const commandDisplay = (text, color = textColors[0], isNewLine = true) => `${utils.copyOrWrite(text)} ${text} to DISPLAY_BUFFER
write ${color in textColors ? color : textColors[0]} to DISPLAY_COLOR
write ${isNewLine ? 'OP_DISPLAY_LN' : 'OP_DISPLAY'} to REG_OP
cpu_exec`;

export const commandReadBlock = (diskName, blockNumber, error_condition) => {
	let output = `${utils.copyOrWrite(diskName)} ${diskName} to REG_A
${utils.copyOrWrite(blockNumber)} ${blockNumber} to REG_B
write OP_READ_BLOCK to REG_OP
cpu_exec`;
	
	if (error_condition) {
		output += `\njump_err ${error_condition}`;
	}

	return output;
}

// The instruction set says that it uses REG_BOOL_RES
// but I don't know what does it mean
export const commandWriteBlock = (diskName, blockNumber, text, error_condition) => {
	let output = `${utils.copyOrWrite(diskName)} ${diskName} to REG_A
${utils.copyOrWrite(blockNumber)} ${blockNumber} to REG_B
${utils.copyOrWrite(text)} ${text} to REG_C
write OP_WRITE_BLOCK to REG_OP
cpu_exec`;

	if (error_condition) {
		output += `\njump_err ${error_condition}`;
	}

	return output;
}

export const commandSetBackgroundColor = (color) => `write ${color in textColors ? color : textColors[0]} in REG_A
write OP_SET_BACKGROUND_COLOR to REG_OP
cpu_exec`;

export const commandRenderBitmap = (bitmapStartAddress, bitmapEndAddress) => `${utils.copyOrWrite(bitmapStartAddress)} ${bitmapStartAddress} to REG_A
${utils.copyOrWrite(bitmapEndAddress)} ${bitmapEndAddress} to REG_B
write OP_RENDER_BITMAP to REG_OP
cpu_exec`;
