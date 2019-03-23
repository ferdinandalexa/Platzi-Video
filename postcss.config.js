module.exports = {
    plugins: [
        // require('autoprefixer')({
        //     grid: true
        // }),
        require('postcss-preset-env')({
            stage: 1,
            autoprefixer: {
                grid: true
            }
        }),
    ]
}