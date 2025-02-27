# KaguOS precompiler (WIP)

Simple precompiler written in javascript for reducing the amount of code needed to create programs for [KaguAsm](https://github.com/vovaskochko/KaguOS?tab=readme-ov-file#kaguasm-language).

Based on instructions from practice 5 ([instructionSet.html](https://github.com/ShcherbaDev/kaguos-precompiler/blob/master/instructionSet.html)).

## How to use

```
node kga_precompile.js <input_file> [output_file]
```

`input_file` (REQUIRED) is a path to a file that should be precompiled.

`output_file` is an output file path. If it is not provided, then the precompilation result (ready to use .kga file) will be printed in console.

Example: `node kga_precompile.js test.kgc test.kga`
