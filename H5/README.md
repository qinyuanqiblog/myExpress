# sunstore_h5

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 项目跑起来可能需要做的一些操作

* __(1)__ 先确认需要装的包都安装了，之前被坑到的就是sass-loader 需要 node-sass 的支持，因为npm或者是yarn都没有装上node-sass 导致跑不起来了[修改yarn镜像的方法](https://ixu.me/node-sass-init-error.html)
* __(2)__ 记得在config/index.js 文件下把 host 改成本地IP， 不然跑不起来哦 ^_^

## 项目命名规范

### untilsImgs 文件（存放小图标，小于10k 以下的）

* i --  表示 icon
* p --  表示 相对来说比较大的图片
* n --  表示 提示性地图片

### 如果需要往 全局变量 PIN 里面添加图片，需要先把图片放入到 untilsImgs 文件夹下， 之后[untilsImgs 文件转base64](https://guoqs.github.io/demos/convertImgsTobase.html) 转化修改 src/state/imgBase64.js的内容即可 文件才可以哦（不支持gif格式，需要执行官添加即可）

## 更新日志

### 2018.04.09 v2.1.1 上线

* add 防伪不需要验证码相关处理
* add 限制个人中心最大出生日期不超过今天
* add 余额刷脸协议

### 2018.03.20 v2.0.5.1 上线

* fix 添加积分全额抵扣若干bug

### 2018.03.19 v2.0.5 上线

* mod 年会修改
* add 添加积分全额抵扣

### 2018.03.16 v2.0.4 上线

* add 年会相关页面和功能
* add 促销活动功能

### 2018.01.30 v2.0.3 上线

* mod 删除【人脸识别】路由和相关入口
* mod 删除 test.vue 文件（无用文件）
* add 添加支付宝授权
* add 添加修改手机和合并帐号的功能

### 2018.01.23 v2.0.2 上线

* fix 更换头像的时候，没有实时更新，需要手动刷新
* fix 【人脸识别】没有上传头像的时候，上传不了头像的情况

### 2018.01.19 v2.0.1 上线

* fix 扫店外的进店码可以进店的情况

### 2018.01.15 v2.0 上线

> 存在以下问题
* __(1)__ 更换头像的时候，没有实时更新，需要手动刷新
* __(2)__ h5 上传头像在手机上有时候会死掉，或者是使用不了的情况
* __(3)__ Iphone X 选择日期控件样式的问题
* __(4)__ 修改昵称，ios输入个猴子emoji的时候，会把前面已经输入的文字给干掉
* __(5)__ 微信支付触发fail的时候没有测过

* __(6)__ 少龙的三星手机会出现首次授权不跳转的情况
* __(7)__ 余额支付剩余的余额和余额相等的时候支付不了的情况
> 需要优化的地方
* __(1)__ 在css里面写background(url(../static/1.png)) 这样的时候会在生产环境里面出来图片访问不到的情况
* __(2)__ 首屏白屏时间有点长
* __(3)__ 有些地方引入图片的时候，没有完全变成base64格式的
* __(4)__ 执行官写的图片转化base64 代码可能不支持gif格式的
* __(5)__ 有些地方需要做缓存的优化(支付这个流程具体要看情况)
