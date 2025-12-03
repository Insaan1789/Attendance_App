from flask import Blueprint, render_template
from flask_login import login_required, current_user

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('role_selection.html')

@main.route('/dashboard')
@login_required
def dashboard():
    if not current_user.get_id().startswith('teacher_'):
        return redirect(url_for('main.student_dashboard'))
    return render_template('dashboard.html', name=current_user.name)

@main.route('/student-dashboard')
@login_required
def student_dashboard():
    if not current_user.get_id().startswith('student_'):
        return redirect(url_for('main.dashboard'))
    return render_template('student_dashboard.html', name=current_user.name)

@main.route('/submit-otp', methods=['POST'])
@login_required
def submit_otp():
    # Placeholder for OTP logic
    return "OTP Submitted"
