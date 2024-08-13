import requests
from bs4 import BeautifulSoup
import re

def get_web_info(url,keywords):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        div = soup.select_one('div.common')
        if div:
            data = []
            for title in div.find_all('a'):
                title_text = title.get_text(strip=True)
                if any(keyword in title_text for keyword in keywords):
                    link = title['href']  # 링크를 가져오기
                    # 링크에서 ? 뒤의 부분만 가져오기
                    if '?' in link:
                        link = link.split('?')[0] + link.split('?')[1]  # ? 앞과 뒤를 합침
                    else:
                        link = link  # ?가 없으면 그대로 사용
                    full_link = f"https://www.catholic.ac.kr/ko/campuslife/notice_outside.do?{link}"
                    data.append((title_text, full_link))  # 제목과 링크를 튜플로 저장
            return data
        else:
            return []
