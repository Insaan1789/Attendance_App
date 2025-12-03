from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
import os

db = SQLAlchemy()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'dev-secret-key' # Change this in production
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///attendance.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'

    from models import Teacher, Student
    
    @login_manager.user_loader
    def load_user(user_id):
        try:
            type_, id_ = user_id.split('_')
            if type_ == 'teacher':
                return Teacher.query.get(int(id_))
            elif type_ == 'student':
                return Student.query.get(int(id_))
        except ValueError:
            return None

    # Register Blueprints
    from auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    with app.app_context():
        db.create_all()

    return app
