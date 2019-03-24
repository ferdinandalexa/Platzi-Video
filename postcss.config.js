module.exports = {
    plugins: [
        // require('autoprefixer')({
        //     grid: true
        // }),
        require('postcss-import')(),
        require('postcss-preset-env')({
            stage: 1,
            autoprefixer: {
                grid: true
            }
        }),
        require('postcss-color-hwb')(),
    ]
}