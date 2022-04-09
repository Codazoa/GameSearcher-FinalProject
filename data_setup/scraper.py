from bs4 import BeautifulSoup
import whoosh
from whoosh.index import create_in
from whoosh.index import open_dir
from whoosh.fields import *
import pandas as pd
import requests
import re
import time
from alive_progress import alive_bar
import os, sys
import time
import json

# class MySchema(SchemaClass):
#     # database schema to use in the whoosh index
#     url = ID(stored=True)
#     title = TEXT(stored=True)
#     imageurl = ID(stored=True)
#     content = TEXT(stored=True)

class Scraper(object):
    def __init__(self):
        baseURL = "https://en.wikipedia.org/wiki/"
        consoleLists = [
            'List_of_PlayStation_games_(A–L)',
            'List_of_PlayStation_games_(M–Z)',
            'List_of_PlayStation_2_games_(A–K)',
            'List_of_PlayStation_2_games_(L–Z)',
            'List_of_PlayStation_3_games_(A–C)',
            'List_of_PlayStation_3_games_(D–I)',
            'List_of_PlayStation_3_games_(J–P)',
            'List_of_PlayStation_3_games_(Q–Z)',
            'List_of_PlayStation_4_games',
            'List_of_PlayStation_4_games_(M–Z)',
            'List_of_PlayStation_5_games',
            'List_of_Xbox_games',
            'List_of_Xbox_360_games_(A–L)',
            'List_of_Xbox_360_games_(M–Z)',
            'List_of_Xbox_One_games_(A–L)',
            'List_of_Xbox_One_games_(M–Z)',
            'List_of_Xbox_Series_X_and_Series_S_games',
            'List_of_Super_Nintendo_Entertainment_System_games',
            'List_of_Nintendo_64_games',
            'List_of_GameCube_games',
            'List_of_Wii_games',
            'List_of_Wii_U_games',
            'List_of_Nintendo_Entertainment_System_games',
            'List_of_Nintendo_Switch_games_(0–9_and_A)',
            'List_of_Nintendo_Switch_games_(B)',
            'List_of_Nintendo_Switch_games_(C–G)',
            'List_of_Nintendo_Switch_games_(H–P)',
            'List_of_Nintendo_Switch_games_(Q–Z)']
        self.consoleLists = [baseURL + x for x in consoleLists]
        self.knownConsoles = list()

    def getTableLinks(self, url):
        """ finds all the links on a page and appends them to a list """
        bs = BeautifulSoup(requests.get(url).text, 'html.parser')
        table = bs.find(lambda tag: tag.name=='table' and tag.has_attr('id') and tag['id']=="softwarelist")
        gameNames = table.findAll('i')
        gameLinkList = list()
        for entry in gameNames:
            if entry.find('a'):
                link = 'https://en.wikipedia.org' + entry.find('a').get('href')
                if link not in gameLinkList and 'redlink=1' not in link:
                    gameLinkList.append(link)
        return gameLinkList

    def getGameLinks(self):
        gameLinks = list()
        print('Getting links to use')
        with alive_bar(len(self.consoleLists)) as bar:
            for consoleLink in self.consoleLists:
                gameLinks.extend(x for x in self.getTableLinks(consoleLink))
                bar()

        print()
        return gameLinks

    def findTitle(self, infoBox):
        title = infoBox.find(lambda tag: tag.name=='th' and tag.has_attr('class') and "infobox-above" in tag['class'])
        if not title:
            title = infoBox.find(lambda tag: tag.name=='caption' and tag.has_attr('class') and "infobox-title" in tag['class'])
        return title.text

    def findImageUrl(self, infoBox):
        try:
            imageUrl = infoBox.find('img')['srcset'].split()[0]
        except TypeError:
            return ''
        return 'https:' + imageUrl

    def cleanList(self, data):
        # clean the list
        countryCodes = ['WW:', 'NA:', 'EU:', 'JP:']
        clean = list(map(lambda x: x.strip('\n \n'), data))
        clean = list(map(lambda x: re.sub('\[.*?\]', '', x), clean))
        clean = list(map(lambda x: re.sub('..:','',x), clean))
        return clean

    def findInfo(self, infoRows, infoType):
        info = list()
        for row in infoRows:
            heading = row.find('th')
            if(heading and infoType in heading.text.lower()):
                data = row.find('td')
                if(data.find_all('li')):
                    info = [x.text for x in data.find_all('li')]
                else:
                    info = [data.text]
        info = self.cleanList(info)
        return info

    def createDataDict(self, gameLink):
        # returns dictionary of relevant information from url
        # {
        #     'title': 'game name',
        #     'url': 'gameLink',
        #     'image': 'url of image',
        #     'release': date,
        #     'developer': 'dev name',
        #     'publishers': ['list of publishers'],
        #     'genres': ['list of genres'],
        #     'modes': ['list of modes'],
        #     'console': ['list of consoles'],
        #     'summaryContent': 'summary here',
        #     'bodyContent': 'body page content'
        # }
        rawHtml = requests.get(gameLink).text
        bs = BeautifulSoup(rawHtml, 'html.parser')
        infoBox = bs.find('table', {'class': 'infobox'})
        infoRows = infoBox.find_all('tr')

        title = self.findTitle(infoBox)
        url = gameLink
        image = self.findImageUrl(infoBox)

        release = self.findInfo(infoRows, 'release')
        release = re.sub('^[^\s]+','',release[0])

        developer = self.findInfo(infoRows, 'developer')
        publisher = self.findInfo(infoRows, 'publisher')

        genre = self.findInfo(infoRows, 'genre')
        mode = self.findInfo(infoRows, 'mode')

        platform = self.findInfo(infoRows, 'platform')
        # knownConsoles.extend([x for x in platform if x not in self.knownConsoles])

        body = bs.find_all('p', {'class': ''})

        summary = body[0].text.strip()

        body = " ".join([x.text.strip() for x in body[1:]])

        gameObj = {
            'title': title,
            'url': url,
            'image': image,
            'release': release,
            'developer': ','.join(developer),
            'publisher': ','.join(publisher),
            'genres': ','.join(genre),
            'modes': ','.join(mode),
            'platforms': ','.join(platform),
            'summary': summary,
            'body': body
        }

        return gameObj

def createDict(scraper, gameLinks):
    jsonDict = {
        'gameData': []
    }
    with alive_bar(len(gameLinks)) as bar:
        for item in gameLinks:
            print(item)
            try:
                gameObj = scraper.createDataDict(item)
                print(f'Collected data on {gameObj.get("title")}\n')
            except:
                continue
            jsonDict['gameData'].append(gameObj)
            bar()
            time.sleep(0.1)

    return jsonDict

def writeToJson(data):
    filename = 'gameData.json'

    with open(filename, 'w') as outfile:
        json.dump(data, outfile, indent = 2) # dump new json data back into file

def filterLink(url):
    print(f'Checking {url}')
    bad = ['#games', 'series', 'manga']
    for word in bad:
        if re.search(word, url.lower()):
            return False
        if word in BeautifulSoup(requests.get(url).text, 'html.parser').find_all('p')[0].text:
            return False


    return True

def main():
    scraper = Scraper()
    i = 1
    gameLinks = scraper.getGameLinks()
    # gameLinks = list(filter(lambda x: filterLink(x), gameLinks[:50]))
    jsonDict = createDict(scraper, gameLinks)
    writeToJson(jsonDict)
    print("Done")

if __name__ == '__main__':
    main()
