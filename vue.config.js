/*
 * @Description: 配置文件
 * @Author: kevin256
 * @LastEditors: kevin256
 */

 module.exports = {
 	publicPath: './',
 	devServer: {
 		open: true,
 		proxy: {
 			'/api': {
				 //target: 'http://localhost:3000/', // 本地后端地址
				target: 'http://47.115.85.237:3000/', // 线上后端地址
 				changeOrigin: true,  //允许跨域
 				pathRewrite: {
 					'^/api': ''
 				}
 			}
 		}
 	}
 }
