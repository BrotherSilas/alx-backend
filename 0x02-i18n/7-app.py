#!/usr/bin/env python3
"""Flask app with timezone support"""
from flask import Flask, render_template, request, g
from flask_babel import Babel, gettext
import pytz
from pytz.exceptions import UnknownTimeZoneError

app = Flask(__name__)

users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


class Config:
    """Config class"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)
babel = Babel(app)


def get_user():
    """Returns user dict if ID exists"""
    login_id = request.args.get('login_as')
    if login_id:
        return users.get(int(login_id))
    return None


@app.before_request
def before_request():
    """Sets user as global on flask.g.user"""
    g.user = get_user()


@babel.localeselector
def get_locale():
    """Get locale with priority"""
    locale = request.args.get('locale')
    if locale and locale in app.config['LANGUAGES']:
        return locale
    if g.user and g.user['locale'] in app.config['LANGUAGES']:
        return g.user['locale']
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@babel.timezoneselector
def get_timezone():
    """Get timezone with priority"""
    try:
        # Find timezone parameter in URL
        timezone = request.args.get('timezone')
        if timezone:
            return pytz.timezone(timezone)

        # Find timezone from user settings
        if g.user and g.user['timezone']:
            return pytz.timezone(g.user['timezone'])

    except UnknownTimeZoneError:
        pass

    # Default to UTC
    return pytz.UTC


@app.route('/')
def index():
    """Home page"""
    return render_template('7-index.html')


if __name__ == '__main__':
    app.run(debug=True)
