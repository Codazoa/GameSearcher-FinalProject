import classes
from flask import Flask, render_template, url_for, request
import whoosh
from whoosh.index import open_dir
from whoosh.fields import *
from whoosh.qparser import QueryParser
from whoosh.qparser import MultifieldParser
from whoosh import qparser

# flask server for backend

app = Flask(__name__)

@app.route('/search')
def search():
    return {'test': 123}

if __name__ == '__main__':
    app.run(debug=True)
