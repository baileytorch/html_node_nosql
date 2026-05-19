class User:
    def __init__(self, username, email):
        self.username = username
        self.email = email

    def __str__(self):
        return f"User(username={self.username}, email={self.email})"


class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __str__(self):
        return f"Product(name={self.name}, price={self.price})"


if __name__ == "__main__":
    user = User("john_doe", "john@example.com")
    product = Product("Laptop", 999.99)

    print(user)
    print(product)

# Nuevo entrypoint que arranca la CLI y el DB seed

from data.repositorio import MongoRepository
from business.services import BookService, UserService, MenuService
from presentation.cli import CLI

def main():
    repo = MongoRepository()  # usa mongodb://localhost:27017 por defecto
    repo.seed_sample_data()
    book_svc = BookService(repo)
    user_svc = UserService(repo)
    menu_svc = MenuService(repo)
    cli = CLI(book_svc, user_svc, menu_svc)
    cli.run()

if __name__ == "__main__":
    main()