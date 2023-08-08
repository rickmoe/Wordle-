from flask import Flask, request
from word_manager import get_random_words, get_daily_word, check_word

app = Flask(__name__)

######## API Routes ########
### Get ###
@app.route("/daily")
def get_daily():
    return get_daily_word(), 200

@app.route("/words/<word_length>")
def get_words(word_length):
    num_words = request.args.get("num-words")
    num_words = int(num_words) if num_words else 10
    words = get_random_words(int(word_length), num_words)
    return words, 200

@app.route("/is-valid/<word>")
def get_is_valid(word):
    return "valid" if check_word(word) else "invalid", 200
### Post ###
# Unused
### Put ###
# Unused
### Delete ###
# Unused
############################
if __name__ == "__main__":
    app.run(debug=True)