# laboratory
技术实践实验室

## 基本架构
- webpack
- node/koa

## 使用说明
### 如果如何启动开发环境？

运行命令 npm start，你的开发环境就准备好了，可以进行开发工作了。

### 如何修改开发环境监听端口（防止和其它静态资源站端口冲突）

在 /src/build/js/config.js中修改port。

### 如何打包输出生产环境代码

运行命令 npm run build，打包完毕在dist目录下查看webpack输出的代码bundle-[hash].js 和 bundle-[hash].css


### src目录各文件夹的作用
- /src/app 用来放页面目录，一个页面对应一个目录
- /src/components 文件夹下面是用来放置公用组件的，比如分页组件。每个文件夹代表了一个组件。
- /src/lib 里面放置的是通用类库。
- /src/common 这个文件夹会单独打成包。里面包含了所有页面共享的样式、字体、icon-font，比如重置样式。

### 如何添加新的页面？

在 /src/app 下新建一个文件夹。这个目录下的每一个文件夹对应了一个页面。

### 页面文件夹下的具体目录结构是怎样的？

参考/src/app/testPage 注意，js文件夹下有一个叫app.js的文件，这是js的入口文件，名字必须是app.js。


