from flask import Flask, render_template, url_for, request
import os, os.path
from flask_cors import CORS
import whoosh
from whoosh.index import create_in
from whoosh.index import open_dir
from whoosh.fields import *
from whoosh.qparser import QueryParser
from whoosh.qparser import MultifieldParser
from whoosh import qparser
import json

# flask server for backend

app = Flask(__name__)
CORS(app)
@app.route('/', methods=['GET', 'POST'])
def home():
    return ('Hello world')

@app.route('/gameresults', methods=['GET', 'POST'])
def search():
    global mySearcher
    mySearcher = WhooshSearcher()
    mySearcher.open_index()
    query = 'Halo CE'
    title, image, url, console = mySearcher.search(query)

    return "title, image, url, console"

class MySchema(SchemaClass):
    # database schema to use in the whoosh index
    url = ID(stored=True)
    title = TEXT(stored=True)
    image = ID(stored=True)
    release = ID(stored=True)
    dev = KEYWORD(stored=True, scorable=True)
    pub = KEYWORD(stored=True, lowercase=True, scorable=True)
    genres = KEYWORD(stored=True, lowercase=True, scorable=True)
    mode = KEYWORD(stored=True, lowercase=True, scorable=True)
    platforms = KEYWORD(stored=True, lowercase=True, scorable=True)
    summary = TEXT(stored=True, analyzer=analysis.StemmingAnalyzer())
    body = TEXT(analyzer=analysis.StemmingAnalyzer())


class WhooshSearcher(object):
    def __init__(self):
        super(WhooshSearcher, self).__init__()
        self.searchLimit = 10
        self.mode = 1 # 0: conjuntive   1: disjunctive
        self.advSearch = False # boolean to distinguish advanced search

    def search(self, queryEntered):
        # create the lists to return
        title = list()
        image = list()
        url = list()
        console = list()

        # search index for query
        with self.indexer.searcher() as search:
            if self.advSearch:
                if self.mode == 1:
                    query = MultifieldParser(['title', 'dev', 'pub','genres','mode','platforms','summary','body'], schema=self.indexer.schema, group=qparser.OrGroup)
                elif self.mode == 0:
                    query = MultifieldParser(['title', 'dev', 'pub','genres','mode','platforms','summary','body'], schema=self.indexer.schema)
            else:
                if self.mode == 1:
                    query = QueryParser('title', schema=self.indexer.schema, group=qparser.OrGroup)
                elif self.mode == 0:
                    query = QueryParser('title', schema=self.indexer.schema)

            query = query.parse(queryEntered)
            results = search.search(query, limit=self.searchLimit)

            # add results to lists for return
            for x in results:
                title.append(x['title'])
                image.append(x['image'])
                url.append(x['url'])
                console.append(x['platforms'])

        # return title, image, and content of each
        return title, image, url, console

    def open_index(self):
        if os.path.exists('../indexdir/MAIN_WRITELOCK'):
            self.indexer = open_dir('../indexdir')
        else: # otherwise tell user the problem and suggest indexing
            print('Something is wrong with the index\n')
            print('Try running the indexer again\npython3 gameSearch.py -i\n')
            print('Index Directory Error')





if __name__ == '__main__':
    global mySearcher
    mySearcher = WhooshSearcher()
    mySearcher.open_index()

    app.run(debug=True)
