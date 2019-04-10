module.exports = {
    plugins: [
        // require('autoprefixer')({
        //     grid: true
        // }),
        require('postcss-import')({
            plugins: [
                require('stylelint')({
                    "rules": {
                        "block-no-empty": true,
                        "unit-whitelist": ["em", "rem", "%", "s", "fr", "vh", "dpi", "px"]
                    } 
                })
            ]
        }),
        require('postcss-color-hwb')(),
        require('postcss-preset-env')({
            stage: 1,
            autoprefixer: {
                grid: true
            }
        }),
        require('css-mqpacker')(),
        require("cssnano")({
            autoprefixer: false,
        }),
    ]
}