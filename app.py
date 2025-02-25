from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

# Flask app instance
app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database and bcrypt
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    mobile = db.Column(db.String(15), unique=True, nullable=False)
    dob = db.Column(db.String(10), nullable=False)
    password = db.Column(db.String(255), nullable=False)

# Create the database tables
with app.app_context():
    db.create_all()

# Register API
@app.route('/')
def home():
   return "<h1>Welcome to the Flask API!</h1>"
@app.route('/register', methods=['POST'])

def register():
    data = request.json
    existing_user = User.query.filter_by(email=data['email']).first()
    
    if existing_user:
        return jsonify({"error": "Email already registered"}), 400

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    
    new_user = User(
        userName=data['userName'],
        email=data['email'],
        mobile=data['mobile'],
        dob=data['dob'],
        password=hashed_password
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": "User registered successfully"}), 201

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
