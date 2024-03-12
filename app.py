#!/usr/bin/env python3
"""
app
"""
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/", strict_slashes=False)
def index_page():
    """
    index page
    """
    return render_template("index.html")

@app.route("/item", strict_slashes=False)
def item_page():
    """
    item page
    """
    return render_template("item.html")

@app.route("/cart", strict_slashes=False)
def cart_page():
    """
    cart page
    """
    return render_template("cart.html")

@app.route("/checkout", strict_slashes=False)
def checkout_page():
    """
    checkout page
    """
    return render_template("checkout.html")

@app.route("/order", strict_slashes=False)
def order_page():
    """
    order page
    """
    return render_template("order.html")

@app.route("/orders", strict_slashes=False)
def orders_page():
    """
    orders page
    """
    return render_template("orders.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
