import turtle, math, random
player=turtle.Turtle()
player.shape('turtle')
player.up()
s=player.getscreen()
big=1 #black turtle's size
dist=20 #cognition range
speed=5 #black turtle's speed
astL = [] #red turtles
score1=0 #score (variable)

def make(): #making red turtle
    a=turtle.Turtle()
    a.ht()
    a.speed(0)
    a.color('red')
    a.shape('turtle')
    a.up()
    a.goto(random.randint(-300,300),random.randint(-300,300))
    astL.append(a)
    a.st()    
for i in range(10):
    make()
score=turtle.Turtle()
score.ht()
score.up()
score.speed(0)
score.goto(-50,200)

    
def left():
    player.left(30)
def right():
    player.right(30)
def up():
    player.fd(speed)
def play(): #automatic (turtle.fd) + update score
    global score1,big,speed,dist,distribute
    player.fd(speed)
    score.clear()
    score.write('score: '+str(score1),font=('',20))

    for a in astL:
        a.right(random.randint(-180,180))
        a.fd(10)
        if player.distance(a) < dist:
            distribute=random.randrange(0,20,10)
            a.write(str(distribute),align='center',font=('',15))
            a.ht() #a.ht() hide turtle
            astL.remove(a)
            if distribute>0:
                dist*=1.1
                speed+=2
                big*=1.1
            score1+=distribute
            
            
            player.shapesize(big,big)
            make()
    if score1>=500:
        end=turtle.Turtle()
        end.ht()
        end.color('white')
        end.write('Game Clear!',font=('',50),align='center')
    else:
        s.ontimer(play,10)
s.onkeypress(left,'Left')
s.onkeypress(right,'Right')
s.onkeypress(up,'Up')
s.ontimer(play,10)
s.listen()

