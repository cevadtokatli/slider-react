const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const rollup = require('rollup');
const replace = require('rollup-plugin-replace');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const typescriptPlugin = require('rollup-plugin-typescript');
const typescript = require('typescript');
const pkg = require('./package');

gulp.task('css', () => {
    return gulp.src('./node_modules/marvina-slider/dist/css/marvina-slider.min.css')
    .pipe(gulp.dest('./dist/css'));
});

const banner = `/*!
 * marvina-slider-react
 * version: ${pkg.version}
 *  author: ${pkg.author.name} <${pkg.author.email}>
 * website: ${pkg.author.url}
 *  github: ${pkg.repository.url}
 * license: ${pkg.license}
 */  
`;
gulp.task('bundle', async () => {
    const bundle = await rollup.rollup({
        input: './src/index.tsx',
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            nodeResolve(),
            commonjs({
                include: [
                    'node_modules/**',
                ],
                namedExports: {
                    'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement', 'cloneElement']
                },
            }),
            typescriptPlugin({
                typescript
            })
        ]
    });

    await bundle.write({
        banner,
        file: 'dist/js/marvina-slider.js',
        format: 'umd',
        name: 'MarvinaSlider'
    });

    await bundle.write({
        banner,
        file: 'dist/js/marvina-slider.common.js',
        format: 'cjs'
    });

    await bundle.write({
        banner,
        file: 'dist/js/marvina-slider.esm.js',
        format: 'es'
    });
});

gulp.task('minify', () => {
    return gulp.src('dist/js/marvina-slider.js')
    .pipe(uglify({
        output: {
            comments: /marvina-slider-react/
        }
    }))
    .pipe(rename('marvina-slider.min.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch-bundle', () => {
    return gulp.watch('./src/**', gulp.series('bundle'));
});

gulp.task('default', gulp.series('watch-bundle'));
gulp.task('build', gulp.series('css', 'bundle', 'minify'));