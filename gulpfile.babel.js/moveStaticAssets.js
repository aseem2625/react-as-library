import gulp from 'gulp';

const filesToMove = [
	'src/static/**/*.*',
];

export const moveStaticAssets = () =>
	gulp.src(filesToMove)
		.pipe(gulp.dest('public/static/'));


export default moveStaticAssets;
