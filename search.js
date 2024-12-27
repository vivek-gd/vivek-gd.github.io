const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');

// 简单的模拟数据，实际应用中应该从数据库或文件系统中获取页面内容
const pages = {
    '计算机/计算机专业学习路线.html': '这是计算机专业学习路线的内容，包括基础知识、编程语言学习、项目实践等方面。',
    '计算机/编程技巧.html': '一些编程技巧，如代码优化、调试技巧、算法应用等。',
    // 其他页面内容...
};

// 搜索路由
router.get('/', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).send('请提供搜索关键词');
    }

    const results = [];
    // 遍历模拟的页面数据
    for (const page in pages) {
        if (pages[page].includes(query)) {
            results.push({
                title: page,
                content: pages[page],
                link: page // 这里假设页面链接就是文件名，实际应用中可能需要根据你的网站结构生成正确的链接
            });
        }
    }

    // 如果搜索结果为空，尝试在链接页面中搜索（这里简单地模拟了对单个链接页面的搜索，实际应用中可能需要更复杂的逻辑来遍历多个链接页面）
    if (results.length === 0) {
        const linkPage = '计算机/计算机专业学习路线.html'; // 假设要搜索的链接页面
        const linkPageContent = await axios.get(linkPage)
          .then(response => response.data)
          .catch(error => console.error(error));
        const $ = cheerio.load(linkPageContent);
        const text = $('body').text();
        if (text.includes(query)) {
            results.push({
                title: linkPage,
                content: text,
                link: linkPage
            });
        }
    }

    res.render('searchResults', { results });
});

module.exports = router;