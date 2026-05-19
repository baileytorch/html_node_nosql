from pymongo import MongoClient
from modelos.entidades import Book, UserBase, MenuItem

class MongoRepository:
    def __init__(self, uri="mongodb://localhost:27017", db_name="university_library"):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]
        self.books = self.db["books"]
        self.users = self.db["users"]
        self.menu = self.db["menu"]

    # Books
    def insert_book(self, book: Book):
        doc = book.to_dict()
        self.books.insert_one(doc)

    def get_books(self):
        return [Book.from_dict(d) for d in self.books.find()]

    # Users
    def insert_user(self, user: UserBase):
        doc = user.to_dict()
        self.users.insert_one(doc)

    def get_users(self):
        return [UserBase.from_dict(d) for d in self.users.find()]

    # Menu
    def get_menu(self):
        docs = list(self.menu.find().sort("key", 1))
        return [MenuItem.from_dict(d) for d in docs]

    def seed_sample_data(self):
        # Seed menu si está vacío
        if self.menu.count_documents({}) == 0:
            items = [
                {"key": "1", "label": "Listar libros", "action": "list_books"},
                {"key": "2", "label": "Listar usuarios", "action": "list_users"},
                {"key": "3", "label": "Agregar libro", "action": "add_book"},
                {"key": "4", "label": "Agregar usuario (estudiante/profesor)", "action": "add_user"},
                {"key": "0", "label": "Salir", "action": "exit"}
            ]
            self.menu.insert_many(items)

        # Seed ejemplo libros
        if self.books.count_documents({}) == 0:
            sample_books = [
                {"isbn": "978-1", "title": "Algoritmos y Estructuras", "author": "A. Autor", "copies": 3},
                {"isbn": "978-2", "title": "Base de Datos NoSQL", "author": "B. Autor", "copies": 2}
            ]
            self.books.insert_many(sample_books)

        # Seed ejemplo usuarios
        if self.users.count_documents({}) == 0:
            sample_users = [
                {"username": "estudiante1", "email": "est1@uni.edu", "role": "student", "extra": {"student_id": "S001", "career": "Ingeniería"}},
                {"username": "profesor1", "email": "prof1@uni.edu", "role": "professor", "extra": {"faculty_id": "P001", "department": "Ciencias"}}
            ]
            self.users.insert_many(sample_users)