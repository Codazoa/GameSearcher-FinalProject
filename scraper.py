from bs4 import BeautifulSoup
import whoosh
from whoosh.index import create_in
from whoosh.index import open_dir
import pandas as pd
import requests
import re
import time

# class IndexEntry

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


def main():
    scraper = Scraper()
    i = 1
    for x in scraper.consoleLists:
        for gameLink in scraper.getTableLinks(x):
            print(f'{i}\t{gameLink}')
            i+=1
    pass

if __name__ == '__main__':
    main()
