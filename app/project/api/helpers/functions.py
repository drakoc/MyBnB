import random


def code_generator(length=6):
    numbers = '0123456789'
    return ''.join(random.choice(numbers) for i in range(length))
