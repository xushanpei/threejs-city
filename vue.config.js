module.exports = {
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    publicPath: "",
    devServer: {
        open: true, //浏览器自动打开页面
        host: "0.0.0.0", //如果是真机测试，就使用这个IP
        port: 8080,
        https: false,
        hotOnly: false, //热更新（webpack已实现了，这里false即可）
        proxy: {
            //配置跨域
            "/apis": {
                target: "https://www.yaomo3d.com/",
                ws:true,
                changeOrigin:true,
                pathRewrite:{
                    '^/apis':''
                }
            }
        }
    },

}