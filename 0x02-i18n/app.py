#!/usr/bin/env python3
"""Flask app with current time display"""
from flask import Flask, render_template, request, g
from flask_babel import Babel, gettext, format_datetime
import pytz
from pytz.exceptions import UnknownTimeZoneError
from datetime import datetime

app = Flask(__name__)
# ... (previous code remains the same until the route)


@app.route('/')
def index():
    """Home page with current time"""
    current_time = format_datetime(datetime.now(get_timezone()))
    return render_template('index.html', current_time=current_time)
