from flask import render_template, redirect, request, session, flash
from flask_app import app


# index route
@app.route('/')
def index():
    return render_template('index.html')