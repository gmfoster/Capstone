from flask import Flask

app = Flask(__name__)

from app import routes
from app import pastebin
from app import manager
from app import pwned
from app import get_data
