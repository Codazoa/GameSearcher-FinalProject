import classes
from flask import Flask, render_template, url_for, request
from flask_cors import CORS
import whoosh
from whoosh.index import open_dir
from whoosh.fields import *
from whoosh.qparser import QueryParser
from whoosh.qparser import MultifieldParser
from whoosh import qparser
import json

# flask server for backend

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return ('Hello world')

@app.route('/gameresults', methods=['POST', 'GET'])
def search():
    return "No search given"


if __name__ == '__main__':
    app.run(debug=True)
