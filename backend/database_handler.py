import psycopg2
import pandas as pd
from flask import jsonify
from parser import parse_courses

# Database configuration
DB_CONFIG = {
    'dbname': 'my_app',
    'user': 'your_username',
    'password': 'your_password',
    'host': 'localhost',
    'port': 5432
}

# Function to connect to the database
def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)

# Function to store parsed courses in the database
def store_courses_in_db(courses_df: pd.DataFrame):
    conn = get_db_connection()
    cur = conn.cursor()

    for _, row in courses_df.iterrows():
        cur.execute(
            """
            INSERT INTO courses (course_code, program, code, class_nbr, section, component, days_times, room)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (row['course_code'], row['program'], row['code'], row['class_nbr'],
             row['section'], row['component'], row['days_times'], row['room'])
        )

    conn.commit()
    cur.close()
    conn.close()

# Combined handler for parsing and storing
def handle_parse_and_store(request):
    # Get text input from request
    text = request.json.get('text', '')
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    # Parse courses
    try:
        courses_df = parse_courses(text)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    # Store parsed courses in database
    try:
        store_courses_in_db(courses_df)
    except Exception as e:
        return jsonify({'error': f"Failed to store courses: {str(e)}"}), 500

    return jsonify({'message': 'Courses parsed and stored successfully'}), 201
