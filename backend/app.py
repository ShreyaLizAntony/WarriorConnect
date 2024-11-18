from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from sqlalchemy.dialects.postgresql import ARRAY

app = Flask(__name__)

# setup the Postgres Database (need to do)
username = ""
password = ""
dbname = ""
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://{username}:{password}@localhost/{dbname}'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
api = Api(app)

# Junction table to connect Users to ClassSections
user_classes = db.Table(
    'user_classes',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('class_number', db.Integer, db.ForeignKey('class_section.class_number'), primary_key=True)
)

# ClassSection table
class ClassSection(db.Model):
	__tablename__ = 'class_section'
	class_number = db.Column(db.Integer, primary_key=True) # e.g., 2280
	course_code = db.Column(db.String(10), nullable=False)  # e.g., "CS 246"
	section_number = db.Column(db.Integer)  # e.g., 201
	instructor = db.Column(db.String(50))
	room = db.Column(db.String(10))  # e.g., "MC 4058"
	schedule = db.Column(db.String(100))  # e.g., "TTh 13:00 - 14:20"

	# Relationship to Users via user_classes
	students = db.relationship('User', secondary=user_classes, backref='class_sections')

# User table
class User(db.Model):
	__tablename__ = 'user'
	id = db.Column(db.Integer, primary_key = True)
	firstName = db.Column(db.String(25), nullable = False)
	lastName = db.Column(db.String(30))
	introduction = db.Column(db.String(500))
	academicTerm = db.Column(db.String(2))
	program = db.Column(db.String(60))
	instagram = db.Column(db.String(40))
	twitter = db.Column(db.String(40))
	linkedin = db.Column(db.String(40))
	discord = db.Column(db.String(40))
	snapchat = db.Column(db.String(40))
	email = db.Column(db.String(40))

	class_sections = db.relationship('ClassSection', secondary=user_classes, backref='students')


user_args = reqparse.RequestParser()
user_args.add_argument('firstName', type=str, required=True)
user_args.add_argument('lastName', type=str)
user_args.add_argument('introduction', type=str)
user_args.add_argument('academicTerm', type=str)
user_args.add_argument('program', type=str)
user_args.add_argument('classes', type=list, location='json')  # List of class numbers
user_args.add_argument('instagram', type=str)
user_args.add_argument('twitter', type=str)
user_args.add_argument('linkedin', type=str)
user_args.add_argument('discord', type=str)
user_args.add_argument('snapchat', type=str)
user_args.add_argument('email', type=str)

userFields = {
    'id': fields.Integer,
    'firstName': fields.String,
    'lastName': fields.String,
    'introduction': fields.String,
    'academicTerm': fields.String,
    'program': fields.String,
    'class_sections': fields.List(fields.String),
    'instagram': fields.String,
    'twitter': fields.String,
    'linkedin': fields.String,
    'discord': fields.String,
    'snapchat': fields.String,
    'email': fields.String
}


class ClassSections(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('course_code', type=str, required=True)
        parser.add_argument('section_number', type=int, required=True)
        parser.add_argument('instructor', type=str)
        parser.add_argument('room', type=str)
        parser.add_argument('schedule', type=str)
        args = parser.parse_args()

        section = ClassSection(
            course_code=args['course_code'],
            section_number=args['section_number'],
            instructor=args.get('instructor'),
            room=args.get('room'),
            schedule=args.get('schedule')
        )
        db.session.add(section)
        db.session.commit()
        return {"message": "Class section created successfully"}, 201


class Users(Resource):
	@marshal_with(userFields)
	def get(self):
		users = User.query.all()
		return users

	@marshal_with(userFields)
	def post(self):
		args = user_args.parse_args()
		user = User(
            firstName=args['firstName'],
            lastName=args.get('lastName'),
            introduction=args.get('introduction'),
            academicTerm=args.get('academicTerm'),
            program=args.get('program'),
            instagram=args.get('instagram'),
            twitter=args.get('twitter'),
            linkedin=args.get('linkedin'),
            discord=args.get('discord'),
            snapchat=args.get('snapchat'),
            email=args['email']
        )
		db.session.add(user)

        # Enroll the user in class sections
		if args.get('classes'):
			for class_number in args['classes']:
				class_section = ClassSection.query.get(class_number)
				if class_section:
					user.class_sections.append(class_section)
		
		db.session.commit()
		return user, 201
	

class User(Resource):
	@marshal_with(userFields)
	def get(self, id):
		user = User.query.filter_by(id=id).first()
		if not user:
			abort(404, message="User not found")
		return user
	
	@marshal_with(userFields)
	def patch(self, id):
		args = user_args.parse_args()
		user = User.query.filter_by(id=id).first()
		if not user:
			abort(404, message="User not found")

		# Update fields only if they are provided in the request
		if args.get("firstName"):
			user.firstName = args["firstName"]
		if args.get("lastName"):
			user.lastName = args["lastName"]
		if args.get("introduction"):
			user.introduction = args["introduction"]
		if args.get("academicTerm"):
			user.academicTerm = args["academicTerm"]
		if args.get("program"):
			user.program = args["program"]
		if args.get("instagram"):
			user.instagram = args["instagram"]
		if args.get("twitter"):
			user.twitter = args["twitter"]
		if args.get("linkedin"):
			user.linkedin = args["linkedin"]
		if args.get("discord"):
			user.discord = args["discord"]
		if args.get("snapchat"):
			user.snapchat = args["snapchat"]
		if args.get("email"):
			user.email = args["email"]

		# Update class sections if provided
		if args.get("classes"):
			user.class_sections.clear()
			for class_number in args["classes"]:
				class_section = ClassSection.query.get(class_number)
				if class_section:
					user.class_sections.append(class_section)

		db.session.commit()
		return user
	
	@marshal_with(userFields)
	def delete(self, id):
		user = User.query.filter_by(id=id).first()
		if not user:
			abort(404, message="User not found")

        # Clear the user's associations with class sections before deleting
		user.class_sections.clear()
		db.session.delete(user)
		db.session.commit()
		return {"message": "User deleted successfully"}, 204
	

api.add_resource(Users, '/api/users/')
api.add_resource(ClassSections, '/api/class-sections/')
api.add_resource(User, '/api/users/<int:id>')

@app.route('/') # ‘https://www.google.com/‘

def home():
	return "Hello, world!"

if __name__ == '__main__':
	app.run(port = 5000, debug = True)