from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    from .routes.cart_routes import cart_bp
    app.register_blueprint(cart_bp)

    return app
