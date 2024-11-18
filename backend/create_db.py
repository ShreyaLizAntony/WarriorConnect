# run this file to create all the tables
from app import app, db

with app.app_context():
    db.create_all()