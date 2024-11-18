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

# Function to store parsed class sections in the database
def store_class_sections_in_db(class_sections_df: pd.DataFrame):
    class_sections_df = class_sections_df[class_sections_df['component'] == 'LEC']
    conn = get_db_connection()
    cur = conn.cursor()

    for _, row in class_sections_df.iterrows():
        cur.execute(
            """
            INSERT INTO class_section (class_number, course_code, section_number, room, schedule)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT (class_number) DO NOTHING
            """,
            (row['class_nbr'], row['course_code'], row['section'], row['component'], row['room'], row['days_times'])
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

    # Parse Class Sections
    try:
        class_sections_df = parse_courses(text)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    # Store parsed Class Sections in database
    try:
        store_class_sections_in_db(class_sections_df)
    except Exception as e:
        return jsonify({'error': f"Failed to store class sections: {str(e)}"}), 500

    return jsonify({'message': 'Class Sections parsed and stored successfully'}), 201
