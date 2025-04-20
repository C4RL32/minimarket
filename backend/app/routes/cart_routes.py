from flask import Blueprint, request, jsonify

cart_bp = Blueprint('cart_bp', __name__)
orders = []

@cart_bp.route('/api/order', methods=['POST'])
def create_order():
    data = request.json
    if not data or 'items' not in data or not data['items']:
        return jsonify({'message': 'Pedido vacío'}), 400

    orders.append(data['items'])
    return jsonify({'message': 'Pedido recibido con éxito'}), 201
