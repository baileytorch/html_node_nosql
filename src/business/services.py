from data.repository import MongoRepository
from models.entities import Book, UserBase

class BookService:
    def __init__(self, repo: MongoRepository):
        self.repo = repo

    def list_books(self):
        return self.repo.get_books()

    def add_book(self, isbn, title, author, copies=1):
        book = Book(isbn, title, author, copies)
        self.repo.insert_book(book)
        return book

class UserService:
    def __init__(self, repo: MongoRepository):
        self.repo = repo

    def list_users(self):
        return self.repo.get_users()

    def add_user(self, username, email, role, extra=None):
        user = UserBase(username, email, role, extra=extra)
        self.repo.insert_user(user)
        return user

class MenuService:
    def __init__(self, repo: MongoRepository):
        self.repo = repo

    def load_menu(self):
        return self.repo.get_menu()