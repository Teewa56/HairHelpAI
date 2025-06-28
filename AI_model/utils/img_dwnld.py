#A script to download images from unsplash
import requests
import os
from dotenv import load_dotenv
load_dotenv()

ACCESS_KEY = os.getenv('Access_Key')
query = 'healthy female hair'
per_page = 50
total_images = 500
save_dir = 'downloaded_images'

os.makedirs(save_dir, exist_ok=True)

for page in range(1, (total_images // per_page) + 2):
    url = f'https://api.unsplash.com/search/photos?query={query}&page={page}&per_page={per_page}&client_id={ACCESS_KEY}'
    response = requests.get(url).json()
    for i, result in enumerate(response['results']):
        img_url = result['urls']['regular']
        img_data = requests.get(img_url).content
        with open(f"{save_dir}/img_{page}_{i}.jpg", 'wb') as handler:
            handler.write(img_data)