class User:
    def __init__(self, username, email):
        self.username = username
        self.email = email

    def __str__(self):
        return f'User(username={self.username}, email={self.email})'


class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __str__(self):
        return f'Product(name={self.name}, price={self.price})'