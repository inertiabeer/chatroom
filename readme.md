## 0.2版本发布
更新了很多webpack的插件.完善了脚手架的功能
### 运行
运行环境里面需要安装webpack -g 
通过webpack --watch
### chatroom
 登录界面由我之前写好的一个登录界面来显示，设定后端api为
 login，logout，logup，对数据库进行操作
 
 每次申请一个账户的时候在数据库中新建一个和use_+name的用户表
 getname获取用户的名称
 
 
### session
 
用的express-session，设定为login的时候设定为req.session.user={username:xxx,password:xxx}
### React

现在的基础组件有一个send，负责发送消息，还有一个消息组件，以及包裹消息组件的显示
### socket.io

client:说明客户端有人发消息了。

serverMessage: 服务端向外发送消息。


### 修改了box组件

使得消息发送的时候可以直接下滑，而且修改了send的输入方式，可以利用enter直接发送

### 实现css气泡

利用三角形和rotate实现了css气泡
### 修改了webpack配置

利用webpack3的配置，然后修改了一下babel，对send.js中的发送空格消息进行修改，发现两个比较有趣的事情，一个是需要用state的toString()值进行判断，另一个是keyup事件中，判断state的时候，state就已经是\n了

### 改用了fetch

当浏览器不支持fetch的时候，还是发ajax

### 移动端适配

### font icon

### 调整输入法造成的错误