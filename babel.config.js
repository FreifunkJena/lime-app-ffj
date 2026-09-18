module.exports = {
    presets: ["@babel/preset-env", "@babel/preset-typescript", "preact"],
    plugins: [
        "@lingui/babel-plugin-lingui-macro",
        ["@babel/plugin-transform-react-jsx", { pragma: "h" }],
        [
            "babel-plugin-jsx-pragmatic",
            {
                module: "preact",
                import: "h",
                export: "h",
            },
        ],
    ],
};
