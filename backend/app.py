from flask import Flask, request, jsonify, make_response
from os import environ
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DB_URL')
db = SQLAlchemy(app)

class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    phone = db.Column(db.String(16), unique=True, nullable=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(16), unique=False, nullable=False)

    def json(self):
        return {'id':self.id, 'name':self.name, 'phone':self.phone, 'username': self.username, 'email': self.email, 'password':self.password}
    
db.create_all()

#cria usuário
@app.route('/api/usuarios', methods=['POST'])
def create_user():
    try:
        req = request.get_json()
        user = User(
            name = req['name'],
            phone = req['phone'],
            username = req['username'],
            email = req['email'],
            password = req['password']
        )
        db.session.add(user)
        db.session.commit()
        return make_response(jsonify({'message': 'Usuário criado'}), 201)
    except:
        return make_response(jsonify({'message': 'Erro ao criar o usuário'}), 500)

#listar usuários
@app.route('/api/usuarios', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        return make_response(jsonify([user.json() for user in users]), 200)
    except:
        return make_response(jsonify({'message': 'Erro ao listar usuário'}), 500)

#carregar usuário
@app.route('/api/usuarios/<int:id>', methods=['GET'])
def get_user(id):
    try:
        user = User.query.filter_by(id=id).first()
        if user:
            return make_response(jsonify({'user': user.json()}), 200)
        return make_response(jsonify({'message': 'Usuario nao encontrado'}), 404)
    except:
        return make_response(jsonify({'message': 'Erro ao listar usuário'}), 500)

#atualizar usuário
@app.route('/api/usuarios/<int:id>', methods=['PUT'])
def update_user(id):
    try:
        user = User.query.filter_by(id=id).first()
        if user:
            data = request.get_json()
            user.name = data['name']
            user.phone = data['phone']
            user.username = data['username']
            user.email = data['email']
            user.password = data['password']
            db.session.commit()
            return make_response(jsonify({'message': 'Usuario atualizado'}), 200)
        return make_response(jsonify({'message': 'Usuario nao encontrado'}), 404)
    except:
        return make_response(jsonify({'message': 'Erro ao atualizar o usuário'}), 500)

    
#deletar usuário
@app.route('/api/usuarios/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response(jsonify({'message': 'Usuario deletado'}), 200)
        return make_response(jsonify({'message': 'Usuario nao encontrado'}), 404)
    except:
        return make_response(jsonify({'message': 'Erro ao deletar o usuário'}), 500)
        