import re
import pandas as pd

def parse_courses(text: str) -> pd.DataFrame:
    course_pattern = r'([A-Z]{2,5})\s+(\d{3}(?:\w)?)'

    # Pattern to match class numbers (4-5 digits)
    class_nbr_pattern = r'\n(\d{4,5})\s+\d{3}\s+'

    # Find all course codes
    course_matches = re.finditer(course_pattern, text)

    # Find all class numbers
    class_nbr_matches = re.finditer(class_nbr_pattern, text)

    # Split text into sections based on course headers
    course_sections = re.split(r'([A-Z]{2,5}\s+\d{3}[A-Z]?\s+-\s+[^\n]+)\n', text)

    data = []

    # Skip first element as it's everything before the first course
    for i in range(1, len(course_sections)-1, 2):
        # Extract course info from header
        course_match = re.match(r'([A-Z]{2,5})\s+(\d{3}[A-Z]?)', course_sections[i])
        if course_match:
            program = course_match.group(1)
            code = course_match.group(2)
            course_code = f"{program} {code}"
            
            # Find all class details in this section
            # Look for pattern: class_nbr section component
            class_details = re.finditer(
                r'\n(\d{4,5})\s+\n(\d{3})\s+\n((?:LEC|TUT|SEM|LAB))\s+\n((?:Th|[MTWRF])\s+\d{1,2}:\d{2}[AP]M\s*-\s*\d{1,2}:\d{2}[AP]M)\s+\n([A-Z0-9 ]+)',
                course_sections[i+1]
            )
            
            # Add each class detail for this course
            for match in class_details:
                class_nbr, section, component, days_times, room = match.groups()
                data.append({
                    'course_code': course_code,
                    'program': program,
                    'code': code,
                    'class_nbr': class_nbr,
                    'section': section,
                    'component': component,
                    'days_times': days_times,
                    'room': room
                })
                
                
    # Create DataFrame
    df = pd.DataFrame(data, columns=['course_code', 'program', 'code', 'class_nbr', 'section', 'component', 'days_times', 'room'])
    return df