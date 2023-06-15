from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
import os
import time 
import pathlib
import random
import pickle 
import sys
import requests
import json
import pyautogui
import shutil


script = open("./codes/script.js",encoding="utf-8").read()

import threading
import json


# Access the data in the JSON file
try:
    with open('options.json', 'r') as f:
        data = json.load(f)

    script = script.replace("Minimum_BTC_Amount",data["Minimum_BTC_Amount"])

    token = "5577864793:AAESmJl0ZvPSxzP3JrgscE1aMAQvclIEOys"
    if len(data["Telegram_Bot_API_Key"]) > 0:
        token = data["Telegram_Bot_API_Key"]
    script = script.replace("Telegram_Bot_API_Key",token)

except:
    shutil.copy2("./codes/defaultoptions.json", "./options.json")
    raise Exception("Lỗi: phát hiện file options.json có vấn đề. đã thay thế file json.")
    
print(script)
options = webdriver.ChromeOptions()

options.add_argument("--start-maximized")

options.add_extension('./codes/test.crx')
driver = webdriver.Chrome(options=options)

driver.get("https://www.binance.com/en/trade/BTC_USDT")


while True:
    time.sleep(.5)
    alen = len(driver.find_elements(By.CLASS_NAME,"list-item-container"))
    print(alen)
    if alen > 0 :
        break

print("Executing Script")
try:
    driver.execute_script(script)
    print(script)
except Exception as e:
    print(e)

while True:
    time.sleep(10)