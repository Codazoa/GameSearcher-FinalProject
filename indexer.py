import whoosh
import os
from datetime import datetime
from whoosh.index import create_in
from whoosh.index import open_dir
from whoosh.fields import *
from alive_progress import alive_bar
import json

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
    summary = TEXT(stored=True)
    body = TEXT(stored=True)


def create_index(filename):
    # create index directory if it doesnt exist
    if not os.path.exists('indexdir'):
        print('Creating index directory.')
        os.mkdir('indexdir')

    # create index in the index directory
    ix = create_in('indexdir', MySchema)
    writer = ix.writer()

    # load the JSON data to create the index
    with open(filename, 'r') as inFile:
        data = json.load(inFile)

    # step through each item and add the documents to the index
    print(f'Adding items from {filename} to index')
    webdata = data.get('gameData')
    id = 0
    with alive_bar(len(webdata)) as bar:
        for item in webdata:
            id += 1
            title = item.get('title')
            url = item.get('url')
            image = item.get('image')
            release = item.get('release')
            # release = datetime.strptime(release.strip(), format='%B %d, %Y')

            dev = item.get('developer')
            pub = item.get('publisher')
            genre = item.get('genres')
            modes = item.get('modes')
            platforms = item.get('platforms')
            summary = item.get('summary')
            body = item.get('body')
            writer.add_document(title=title, url=url,
                image=image, release=release.strip(), dev=dev, pub=pub, genres=genre,
                mode=modes, platforms=platforms, summary=summary, body=body)
            bar()

    # close the writer (this part can take some time)
    print('Committing changes to index... Please wait...')
    writer.commit()

    # set the indexer for use with searching later
    print(f'Index created with {id} tuples.')

def main():
    create_index('gameData.json')


if __name__ == '__main__':
    main()
