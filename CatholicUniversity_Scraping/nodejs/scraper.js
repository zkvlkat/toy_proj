const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');

// 정적 파일 제공을 위한 미들웨어 추가
app.use(express.static(path.join(__dirname, 'public')));

async function getWebInfo(url, keywords) {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const $ = cheerio.load(response.data);
            const div = $('div.common');
            if (div.length > 0) {
                const data = [];
                div.find('a').each((index, element) => {
                    const title = $(element).text().trim();
                    if (keywords.some(keyword => title.includes(keyword))) {
                        let link = $(element).attr('href');
                        if (link.includes('?')) {
                            const parts = link.split('?');
                            link = parts[0] + parts[1];
                        }
                        const fullLink = `https://www.catholic.ac.kr/ko/campuslife/notice_outside.do?${link}`;
                        data.push([title, fullLink]);
                    }
                });

                return data;
            }
        }
        return [];
    } catch (error) {
        console.error('Error fetching web info:', error);
        return [];
    }
}

app.get('/api/scrape-data', async (req, res) => {
    const keywordsList = [
        ["보안", ["취약점", "보안", "웹", "화이트해커", "사이버", "모의침투", "개발보안"]],
        ["개발, 인공지능", ["프로그래밍", "개발", "SW", "Develop", "Developer", "AI", "인공지능", "A.I."]],
        ["기타", ["해커톤", "e스포츠", "e-스포츠", "아카데미", "Academy", "ICT", "클라우드", "cloud", "창업", "분석", "아이디어", "컨퍼런스", "IOT"]]
    ];

    const data = Object.fromEntries(keywordsList.map(([key]) => [key, []]));

    for (let i = 0, num = 1; i <= 90; i += 10, num++) {
        const pageNumber = `페이지${num}`;
        const url = `https://www.catholic.ac.kr/ko/campuslife/notice_outside.do?mode=list&&articleLimit=10&article.offset=${i}`;

        for (const [key, keywords] of keywordsList) {
            const tempInfo = await getWebInfo(url, keywords);
            tempInfo.unshift([pageNumber, '#']);
            data[key].push(tempInfo);
        }
    }
    /*
    console.log('추출된 최종 내용:');
    for (const [category, pages] of Object.entries(data)) {
        console.log(`\n카테고리: ${category}`);
        pages.forEach((page, pageIndex) => {
            console.log(`  ${page[0][0]}:`);
            page.slice(1).forEach(([title, link]) => {
                console.log(`    - ${title}`);
                console.log(`      ${link}`);
            });
        });
    }
    */
    //res.render('update', { data });
    res.json(data);
});

// 루트 경로에 대한 처리 추가
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
