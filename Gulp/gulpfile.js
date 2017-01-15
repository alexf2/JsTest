const gulp = require('gulp')
const del = require("del")
const gdebug = require("gulp-debug")

gulp.task('clear', () => {
  return Promise.all([del('dst'), del('dst2')])
})

gulp.task('hello', (callb) => {
  console.log('hello')
	callb()
})

gulp.task('hello2', (callb) => {
  console.log('hello2')

  return new Promise( (resolve, reject) =>  { resolve('Ok') } )
})

const dump = (file) => {
  const {base, basename, relative} = file
  console.log({base, basename, relative})
}

gulp.task('copy', () => {
  return gulp.src('src/**/*.*') //берём всё из src вглубь, при этом базой будет весь путь, а relative - само имя файла
    .pipe(gdebug({title: 'src'}))
    .on('data', dump)
    .pipe(gdebug({title: 'dst'}))
    .pipe(
      gulp.dest( (f) => ('dst/' + f.extname.replace(/^\./g, '')) )
    )
})

gulp.task('copy2', () => {
  return gulp.src('src/app/**/*.*', {base: 'src'}) //здесь урезаем базу, поэтому в relative path попадёт всё, что ниже src
    .on('data', dump)
    .pipe(
      gulp.dest( (f) => ('dst2/' + f.extname.replace(/^\./g, '')) )
    )
})

gulp.task('default', gulp.series('clear', gulp.parallel('hello', 'hello2', 'copy', 'copy2')))
