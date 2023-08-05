from flask import Flask, request, jsonify

app = Flask(__name__)

######## API Routes ########
### Get ###
@app.route("/daily")
def get_daily_word():
    return "carrot", 200

@app.route("/words/<word_length>")
def get_words(word_length):
    words = []
    word_length = int(word_length)
    num_words = request.args.get("num-words")
    num_words = int(num_words) if num_words else 10
    if word_length == 6:
        words = ["shroud", "cheese", "export"]
    elif word_length == 5:
        words = ["cheek", "rogue", "water"]
    elif word_length == 4:
        words = ["word", "type", "post"]
    else:
        return [], 400
    print(words)
    return words, 200

@app.route("/is-valid/<word>")
def get_is_valid(word):
    return "valid", 200
### Post ###
# Unused
### Put ###
# Unused
### Delete ###
# Unused
############################
if __name__ == "__main__":
    app.run(debug=True)