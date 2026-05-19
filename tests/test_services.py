import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src")))

import unittest
from unittest.mock import MagicMock
from business.services import BookService, UserService, MenuService
from modelos.entidades import Book, UserBase

class TestServices(unittest.TestCase):
    def test_bookservice_add_and_list_calls_repo(self):
        repo = MagicMock()
        svc = BookService(repo)
        book = svc.add_book("978-9", "Nuevo", "AutorX", 3)
        repo.insert_book.assert_called()
        self.assertIsInstance(book, Book)

        repo.get_books.return_value = [Book("x","t","a",1)]
        listed = svc.list_books()
        self.assertEqual(len(listed), 1)

    def test_userservice_add_and_list(self):
        repo = MagicMock()
        svc = UserService(repo)
        user = svc.add_user("u","u@u","student", extra={"student_id":"S1"})
        repo.insert_user.assert_called()
        self.assertIsInstance(user, UserBase)

        repo.get_users.return_value = [UserBase("u2","e","professor")]
        self.assertEqual(len(svc.list_users()), 1)

    def test_menuservice_load_menu(self):
        repo = MagicMock()
        svc = MenuService(repo)
        repo.get_menu.return_value = []
        self.assertEqual(svc.load_menu(), [])

if __name__ == "__main__":
    unittest.main()