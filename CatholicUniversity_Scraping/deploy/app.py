from flask import Flask, request, jsonify, render_template
import scraping
import firebase_admin
from firebase_admin import credentials

app = Flask(__name__)

@app.route('/', methods=["GET",'POST'])
def update_info():
    if request.method == "GET":
        keywords_list = [
                ("보안",["취약점", "보안", "웹", "화이트해커", "사이버", "모의침투", "개발보안"]),
                ("개발, 인공지능",["프로그래밍", "개발", "SW", "Develop", "Developer", "AI", "인공지능", "A.I."]),
                ("기타",["해커톤", "e스포츠", "e-스포츠", "아카데미", "Academy", "ICT", "클라우드", "cloud",     "창업","분석", "아이디어", "컨퍼런스", "IOT"])
        ]
        data = {key:[] for key, _ in keywords_list}
        
        for i in range(1,11): #30days data
            page_number = f"페이지{i}"
            url = f'https://www.catholic.ac.kr/front/boardlist.do?bbsConfigFK=24&cmsDirPkid=2055&cmsLocalPkid=1&searchField=ALL&searchValue=&currentPage={i}&searchLowItem=ALL'
            for key, keywords in keywords_list:
                temp_info = scraping.get_web_info(url,keywords)
            if not temp_info:
                temp_info = ['내용 없음']
            temp_info.insert(0,page_number)
            data[key].append(temp_info)
        return render_template("update.html",data=data)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000)
