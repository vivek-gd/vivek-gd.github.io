const express = require('express');
const app = express();
const port = 3000;

// 引入搜索路由
const searchRoutes = require('./search');
app.use('/search', searchRoutes);

// 假设你的网站其他路由和中间件在这里定义（如果有的话）

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});