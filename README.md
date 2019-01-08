## demo front project for CICD-Build image using bookstore [![Build Status](https://www.travis-ci.org/FJJLeon/k8s-bookstore-front.svg?branch=master)](https://www.travis-ci.org/FJJLeon/k8s-bookstore-front)

* 一个简单的前端页面，使用node构建，nginx部署
* 使用 Travis.CI 平台作CICD，并自动打包并制作 docker 镜像上传到 docker Hub，详见 .travis.yml 和 Dockerfile
* [后端](https://github.com/FJJLeon/k8s-bookstore)是一个springboot项目部署在tomcat上

### Problems：
* Dockerfile编写中 CMD和ENTRYPOINT指令理解，注意后者无法被docker run时的指令覆盖，若后者运行一个命令后结束，则整个container都会exit
* nginx的反向代理配置存在问题，改用了ajax请求直接发到后端端口上，这需要后端配置cors
* 访问的后端api与本地Ecilpse运行存在差别，需要形如 https://[ip]:[port]/[war包名]/[api]，而本地运行不需要war包名(不包括.war)

### Reference
* [SpringBoot配置Cors解决跨域请求问题](https://www.cnblogs.com/yuansc/p/9076604.html)
* [dockerfile 介绍](https://www.cnblogs.com/boshen-hzb/p/6400272.html)
