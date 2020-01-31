import random


## Creating the board, how to set the head and body of the snake, and how to print the board each move.
class Board:

    def __init__(self):
        self.create_new_board(10, 10)

    def create_new_board(self, width, height):
        board = []
        for h in range(height):
            board.append(['.'] * width)
        self._board = board

    def set_head(self, head):
        self._board[head._y_coord][head._x_coord] = 'H'

    def set_fruit(self, fruit):
        self._board[fruit._y_coord][fruit._x_coord] = 'F'

    def set_body(self, body):
        self._board[body._y_coord][body._x_coord] = 'B'

    def print_board(self):
        for x in self._board:
            for coord in x:
                print(coord, end='  ')
            print()

## Creates coordinates to be used later in a list
class Coord:
    def __init__(self, x_coord, y_coord):
        self._x_coord = x_coord
        self._y_coord = y_coord

##__init__ randomly sets the head to coordinates within the board
class Game():
    def __init__(self):
        self._board = Board()
        self._head = Coord(random.randint(0, 9), random.randint(0, 9))
        self._board.set_head(self._head)
        self._body = [self._head]
        self.get_fruit()
        self._status = 'playing'

## move(direction) takes in input and changes the coordinates of the head.
    def move(self, direction):
        self._board.create_new_board(10, 10)
        curr_x = self._head._x_coord
        curr_y = self._head._y_coord
        if (direction == 'up' or'Up'):
            curr_y -= 1
        elif (direction == 'down'or 'Down'):
            curr_y += 1
        elif (direction == 'right' or 'Right'):
            curr_x += 1
        elif (direction == 'left' or 'Left'):
            curr_x -= 1

        self._head = Coord(curr_x, curr_y)
        for body in self._body:
            self._board.set_body(body)

        if (curr_x == self._fruit._x_coord and curr_y == self._fruit._y_coord):
            self._body = [Coord(curr_x, curr_y)] + self._body
            self.get_fruit()

            ## Check for gamebreaking or gamewinning decisions which will end the loop of playing the game
        else:
            for body in self._body:
                if (curr_x == body._x_coord and curr_y == body._y_coord):
                    self._status = 'Game Over!'
                    return
            ## Reset Body pieces if the head of the snake did not eat fruit
            self._body = [Coord(curr_x, curr_y)] + self._body
            del self._body[-1]

        ## Check for gamebreaking or gamewinning decisions which will end the loop of playing the game
        if curr_x > 9 or curr_x < 0:
            self._status = 'Game Over!'
            if (game._status != 'playing'):
                return
        if curr_y > 9 or curr_y < 0:
            self._status = 'Game Over!'
            if (game._status != 'playing'):
                return
        ## Set the head and fruit once more
        self._board.set_head(self._head)
        self._board.set_fruit(self._fruit)

        if len(self._body) + 2 == 100:
            self._status = 'You Won! The Game is Over'
    ## How the fruit respawns
    def get_fruit(self):
        head_x = self._head._x_coord
        head_y = self._head._y_coord
        while (True):
            x = random.randint(0, 9)
            y = random.randint(0, 9)
            if (x != head_x and y != head_y):
                no_collision = True
                for body in self._body:
                    if (x == body._x_coord and y == body._y_coord):
                        no_collision = False
                if (no_collision):
                    break
        self._fruit = Coord(x, y)
        self._board.set_fruit(self._fruit)

## Loop to run the game
if __name__ == "__main__":
    game = Game()
    game._board.print_board()
    while (True):
        move = input('Whats your move? ')
        game.move(str(move))
        game._board.print_board()
        if (game._status != 'playing'):
            print(game._status)
            break








