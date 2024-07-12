import requests
from bs4 import BeautifulSoup
import re

def get_web_info(url,keywords):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        div = soup.select_one('div.common')
        if div:
            data = [
                    title.get_text(strip=True)
                    for title in div.find_all('a')
                    if any(keyword in title.get_text() for keyword in keywords)
                    ]
            return [re.sub(r'[\n\t\r]','',item) for item in data]
        else:
            return []
    else:
        print(f"Error: Request failed with status code {response.status_code}")
