# Flask Internationalization (i18n) Project

## Description
This is a Flask application that demonstrates internationalization and localization features. The project showcases implementation of a web application that can switch between different languages (English and French), handle different timezones, and display content based on user preferences.

## Features
- Basic Flask web application setup
- Internationalization using Flask-Babel
- Language selection based on:
  - URL parameters
  - User preferences
  - Browser settings
- Mock user login system
- Timezone handling
- Parameterized templates
- Display of localized timestamps

## Requirements
- Python 3.7
- Flask
- Flask-Babel==2.0.0
- pytz
- Ubuntu 18.04 LTS

## Project Structure
0x02-i18n/
├── app.py
├── babel.cfg
├── templates/
│   └── index.html
├── translations/
│   ├── en/
│   │   └── LC_MESSAGES/
│   │       ├── messages.mo
│   │       └── messages.po
│   └── fr/
│       └── LC_MESSAGES/
│           ├── messages.mo
│           └── messages.po
└── README.md

## Installation
1. Clone the repository:
```bash
git clone [repository-url]
cd 0x02-i18n

Install dependencies:
pip3 install flask_babel==2.0.0
pip3 install flask

Usage
Run the Flask application
python3 app.py

Access the application:
Default: http://127.0.0.1:5000/
Force French: http://127.0.0.1:5000/?locale=fr
Login as user: http://127.0.0.1:5000/?login_as=1

Babel Commands
To update translations:
# Extract messages
pybabel extract -F babel.cfg -o messages.pot .

# Create/Update translations
pybabel init -i messages.pot -d translations -l en
pybabel init -i messages.pot -d translations -l fr

# Compile translations
pybabel compile -d translations

Coding Style
All Python files are formatted according to pycodestyle version 2.5
All files are executable
All modules, classes, and functions have documentation

Authors
Silas Edet
License
Alx License
