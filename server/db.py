import mysql.connector
from os import getenv
from dotenv import load_dotenv

load_dotenv()

DB_NAME = "wordle_plus_db"
TABLE_NAME = "WORDS"
MAX_WORD_LEN = 20

##### Database Functions #####
def create_db(db_name):
  db = mysql.connector.connect(
    host=getenv("DB_URI"),
    user=getenv("DB_USER"),
    passwd=getenv("DB_PASSWORD")
  )
  cursor = db.cursor()
  cursor.execute(f'CREATE DATABASE {db_name}')

def connect_db(db_name):
  return mysql.connector.connect(
    host=getenv("DB_URI"),
    user=getenv("DB_USER"),
    passwd=getenv("DB_PASSWORD"),
    database=db_name
  )
##############################
##### Table Functions #####
def show_tables(cursor):
  cursor.execute("SHOW TABLES")

def create_word_table(cursor):
  drop_word_table(cursor)
  cursor.execute(f'CREATE TABLE {TABLE_NAME} (WORD VARCHAR({MAX_WORD_LEN}) NOT NULL, FREQ INT NOT NULL)')

def drop_word_table(cursor):
  cursor.execute(f'DROP TABLE IF EXISTS {TABLE_NAME}')

def describe_word_table(cursor):
  cursor.execute(f'DESCRIBE {TABLE_NAME}')
  for x in cursor:
    print(x)

def show_word_table(cursor):
  cursor.execute(f'SELECT * FROM {TABLE_NAME}')
  for x in cursor:
    print(x)
###########################
##### Table Operations #####
def insert_word(db, cursor, word, freq):
  cursor.execute(f'INSERT INTO {TABLE_NAME} (WORD, FREQ) VALUES (%s,%s)', (word, freq))
  db.commit()

# dataList should be of type [string, int]
def insert_words(db, cursor, dataList):
  cursor.execute(f'INSERT INTO {TABLE_NAME} (WORD, FREQ) VALUES (%s,%s)', dataList)
  db.commit()

def delete_word(db, cursor, word):
  cursor.execute(f'DELETE FROM {TABLE_NAME} WHERE word = "{word}"')
  db.commit()
############################

if __name__ == "__main__":
  db = connect_db(DB_NAME)
  cursor = db.cursor()
  describe_word_table(cursor)
  db.close()
