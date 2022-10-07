import pymongo 
from pymongo import MongoClient
from datetime import date
#import future frontend text field data sets here

#user certificate for access to DB
cluster = MongoClient("mongodb+srv://andrew:1234@cluster0.wxau5r6.mongodb.net/?retryWrites=true&w=majority")

#define database and collection for adding data
db = cluster["PomodoroData"]
collection = db["UserData"]

#function to be used to add entries to database
def submitPost(username, inputsubject, usercomments):
    #get current date
    today = date.today()
    date_str = today.strftime('%m/%d/%Y')    
    #need to somehow get username and other info from into db post
    post = {'name': username, 'date': date_str, 'subject': inputsubject, 'comments': usercomments}
    #make post
    collection.insert_one(post)

submitPost('jessi', 'physics', 'i focused on not being bored and then my cat sat on me.')