from app import create_app, db
from models import Teacher, Student, Class
from werkzeug.security import generate_password_hash

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()

    # Create Teacher
    teacher = Teacher(
        email='teacher@school.com',
        password=generate_password_hash('password123'),
        name='John Doe'
    )
    db.session.add(teacher)
    db.session.commit()
    print("Test teacher created: teacher@school.com / password123")

    # Create Class
    class_10a = Class(name='Class 10A', subject='Mathematics', teacher_id=teacher.id)
    db.session.add(class_10a)
    db.session.commit()

    # Create Student
    student = Student(
        name='Alice Smith',
        email='student@school.com',
        password=generate_password_hash('password123'),
        roll_number='10A01',
        class_id=class_10a.id
    )
    db.session.add(student)
    db.session.commit()
    print("Test student created: student@school.com / password123")
