import os, requests
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("menu.html")

@app.route("/pong", methods=["POST"])
def play():
    gameSpeed = request.form.get("speed")
    return render_template("pong.html", gameSpeed = gameSpeed)

@app.route("/user1")
def user1Win():
    return render_template("winner.html", user = "User 1")

@app.route("/user2")
def user2Win():
    return render_template("winner.html", user = "User 2");
