 /*리모콘을 만든다  플로그인*/
var gulp = require("gulp"); 
var concat = require("gulp-concat");
var livereload = require("gulp-livereload");
var minifyhtml = require("gulp-minify-html");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");  //package.json파일의 이름을 그대로 적용
var cssmin = require("gulp-uglifycss");
var htmlPath = require("gulp-rewrite-image-path"); //설치후 json 파일이 이름 그대로 적용
var cssurl = require("gulp-rewrite-cssurl");

/* 주소가 바뀌면 한번에 싹 바꿀수 있음 */
var src = "src";
var dist = "dist";

var path = {
	//객체 안에는 ;이 들어가면 안됨
	s_img : src+"/images/**/*.*",
	d_img : dist+"/images",
	s_sass : src + "/sass/*.scss",
	d_css : dist + "/css",
	s_js : src + "/js/*.js",
	d_js : dist + "/js",
	s_html : src + "/**/*.html",
	d_html : dist + "/"
};

//gulp객체 이용, task()로 기능 구현해야 함
/*() =>  : function() {} 와 동일함. ecmascript 6버전임. 지원안되는 브라우져도 있어서 쓰는데도 있고
아닌곳도 있음*/
gulp.task("img-min", function() { 
	//소스 불러오기
	return gulp.src(path.s_img)  //image파일을 2진데이타로 불러옴. gulp.src
				.pipe(imagemin())   //pipe를 통해 imgaemin을 적용
				.pipe(gulp.dest(path.d_img));  //pipe를 통해 dest(목적지 지정)로 이동시켜줌
	
});

gulp.task("compile-sass", function() {
	return gulp.src(path.s_sass)
				.pipe(sass())
				.on('error', errFnc)//에러가 나도 watch가 멈추지 않는다.
				
				.pipe(cssmin())
				.pipe(gulp.dest(path.d_css));
});

function errFnc(error) { //에러 객체를 받아서
	console.log(error.toString()); //에러뜨면 창 띄우고
	this.emit('end'); // 종료하는 것을 실행하지 말고 끝내라
}

gulp.task("js-min",function() {
		
	return gulp.src(path.s_js) 
			.pipe(uglify()) //uglify메소드니까 ()해줌
			.pipe(gulp.dest(path.d_js))
});

gulp.task("html-min",function(){
	return gulp.src(path.s_html)	
			//.pipe(minifyhtml()) //압축
			.pipe(htmlPath({path:"images"})) // Path 바꿔줌 https://www.npmjs.com/package/gulp-rewrite-image-path/ 참조
			.pipe(gulp.dest(path.d_html));
})

gulp.task("watch", function(){
   livereload.listen();
   //gulp.watch(감시할 경로, 실행task);
   gulp.watch(path.s_img, ["img-min"]);
   gulp.watch(path.s_sass, ["compile-sass"]);
   gulp.watch(path.s_js, ["js-min"]);
   gulp.watch(path.s_html, ["html-min"]);
   gulp.watch(dist + '/**').on('change', livereload.changed);
});


//gulp만 쓰고 엔터만 누르면 []안의 task가 실행됨
gulp.task("default", ["img-min", "watch","compile-sass","js-min","html-min"], function() {
   return console.log("gulp task complete!!");
});

/*
gulp에서 기능생성 - task

gulp.task("hello",function() {
   return console.log("hello world~!");
});

gulp.task("welcome",function() {
   return console.log("welcome my world~!");
});

gulp.task("default",["hello","welcome"],function() {
   return console.log("====gulp task end====");
});   콜백함수 


gulpjs.com/plugins



*/







