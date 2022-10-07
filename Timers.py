#import module
from datetime import datetime
import time

#create timer function
def pomodoroTimer():
    #these lines are just for testing///////////////////////////////////
    print('The current time is:', datetime.now())
    #///////////////////////////////////////////////////////////////////

    timer = (25 * 60)
    while timer:
        time.sleep(1)
        timer -= 1
    print('Done! Nice Work!')
    #these lines are just for testing///////////////////////////////////
    print('The current time is:', datetime.now())
    #///////////////////////////////////////////////////////////////////

def breakTimer():
    #these lines are just for testing///////////////////////////////////
    print('The current time is:', datetime.now())
    #///////////////////////////////////////////////////////////////////
    timer = (5 * 60)
    while timer:
        time.sleep(1)
        timer -= 1
    print('Your break is over. :( Get back to work!')
    #these lines are just for testing///////////////////////////////////
    print('The current time is:', datetime.now())
    #///////////////////////////////////////////////////////////////////

#also for testing //////////////////////////////////////////////////////
pomodoroTimer()
breakTimer()
#///////////////////////////////////////////////////////////////////////
