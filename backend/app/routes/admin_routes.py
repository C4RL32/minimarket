from flask import Blueprint, jsonify, request

admin_bp = Blueprint('admin_bp', __name__)
products = []

@admin_bp.route('/api/admin/products', methods=['GET'])
def admin_get_products():
    return jsonify(products)

@admin_bp.route('/api/admin/products', methods=['POST'])
def admin_create_product():
    data = request.json
    products.append(data)
    return jsonify({'message': 'Product agregado'}), 201

@admin_bp.route('/api/admin/products/<name>', methods=['DELETE'])
def admin_delete_product(name):
    global products
    products = [p for p in products if p['name'] != name]
    return jsonify({'message': 'Producto eliminado'}), 200

@admin_bp.route('/api/admin/products/<name>', methods=['PUT'])
def admin_update_product(name):
    data = request.json
    for p in products:
        if p['name'] == name:
            p.update(data)
            return jsonify({'message': 'Producto actualizado'}), 200
        return jsonify({'massage': 'Producto no encontrado'}), 404