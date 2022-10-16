# Optimization of the bot startup speed
A simple command `yarn run start` starts the bot using `ts-node`. At startup it dynamically compiles everything .ts files, so the launch may take a little longer for 5-10 seconds.

Here we will consider another option - we will compile all the files from the bot in advance.

## Compilation of all bot files
- Enter the command `yarn run build`

## Launching the bot
- Enter the command `yarn run start_build`

## What's the catch?
You probably noticed that the bot started up several times faster. However, the catch is that you will have to write `yarn run build` every time you change a file in the `src/` directory, whether it's a config or a regular change to a language file.

## I don't want to constantly prescribe `yarn run build`
If you are currently actively editing files in the project and restarting the bot for verification, then you can run the TypeScript compiler in tracking mode: `yarn run tsc_wm` (TypeScript Compiler Watch Mode)

TypeScript will compile all the files for you and you won't have to manually write `yarn run build`, only `yarn run start_build`.

## Is it worth it?
I don'T think it's worth it. We do not guarantee the smooth operation of such a method in the future (after updating the bot, it is advisable to erase the folders `build/` and `typings/` in order to avoid unnecessary problems). Dynamic compilation does not affect the performance of the bot in any way, because when everything is .ts files will be compiled the bot will work as on a regular Node.js . In addition, it is inconvenient, because after any change in the code, you need to manually compile the bot. However, the choice is yours.

----
> Back to [README.md](../../README.md)