@echo off

rem npm i
rem tsd install

call tsc --version

call tsc -p js

call browserify --version

call browserify js/app.js -o js/bundle.js

