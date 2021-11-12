const {src, dest, parallel, series, watch}= require('gulp');
const browserSync= require('browser-sync').create();
const concat = require('gulp-concat');
const del= require('del');

function BrowserSync(){
    browserSync.init({
        server:{baseDir:'./'},
        notify:false
    })
}

function Csss(){
  return src(['css/normalize.css', 'css/all.css','css/**/*.css', '!css/style.css'])    //'!css/style.css' - чтобы небыло зацикливания, не вотчить 'css/style.css'
    .pipe(concat('style.css'))
    .pipe(dest('css/'))
    .pipe(browserSync.stream())
}
function Del(){
    return del('style.css');
}

function Startwatch(){
  watch(['css/**/*.css', '!css/style.css'], Csss);      //'!css/style.css' - чтобы небыло зацикливания, не вотчить 'css/style.css'
}

exports.browsersync= BrowserSync;
exports.css= Csss
exports.default = series(Del, parallel(Csss, BrowserSync, Startwatch));    
