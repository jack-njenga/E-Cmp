#!/usr/bin/env python3

"""
app
"""

from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route("/", strict_slashes=False)
def index_page():
    """
    index page
    """
    return render_template("index.html") # from the templates folder

@app.route('/build/<path:path>')
def serve_build(path):
    """
    Serve files from the build folder
    """
    return send_from_directory('build', path)

@app.route("/item", strict_slashes=False)
def item_page():
    """
    item page
    """
    return render_template("item.html")

@app.route("/shop", strict_slashes=False)
def shop_page():
    """
    shop page
    """
    return render_template("shop.html")

@app.route("/category", strict_slashes=False)
def category_page():
    """
    category page
    """
    return render_template("category.html")

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

@app.route("/aboutus", strict_slashes=False)
def aboutus_page():
    """
    aboutus page
    """
    return render_template("aboutus.html")

@app.route("/contactus", strict_slashes=False)
def contactus_page():
    """
    contactus page
    """
    return render_template("contactus.html")

@app.route("/account", strict_slashes=False)
def account_page():
    """
    account page
    """
    return render_template("account.html")

@app.route("/account/manage", strict_slashes=False)
def manage_acc_page():
    """
    account management page
    """
    return render_template("account_manage.html")

@app.route("/account/notification", strict_slashes=False)
def notification_acc_page():
    """
    account notification page
    """
    return render_template("account_notification.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)

