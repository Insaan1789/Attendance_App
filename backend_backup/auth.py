from flask import Blueprint, render_template, redirect, url_for, request, flash
from flask_login import login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from models import Teacher, Student
from app import db

auth = Blueprint('auth', __name__)

@auth.route('/login/<role>', methods=['GET', 'POST'])
def login(role):
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        user = None
        if role == 'teacher':
            user = Teacher.query.filter_by(email=email).first()
        elif role == 'student':
            user = Student.query.filter_by(email=email).first()
        
        if user and check_password_hash(user.password, password):
            login_user(user)
            if role == 'teacher':
                return redirect(url_for('main.dashboard'))
            else:
                return redirect(url_for('main.student_dashboard'))
        else:
            flash('Please check your login details and try again.')
            
    return render_template('login.html', role=role)

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))
