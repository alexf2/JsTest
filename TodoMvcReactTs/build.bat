@echo off

rem npm i
rem tsd install


rem Start build automatically: uses package.config scripts
rem npm run build


rem Building manually

call tsc --version

call tsc -p js

call browserify --version

call browserify js/app.js -o js/bundle.js

