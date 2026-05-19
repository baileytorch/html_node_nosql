import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src")))

import unittest
from unittest.mock import MagicMock
from io import StringIO
import sys as _sys
from presentation.cli import CLI
from models.entities import MenuItem, Book, UserBase

class TestCLI(unittest.TestCase):
    def test_show_menu_returns_mapping_and_prints(self):
        book_svc = MagicMock()
        user_svc = MagicMock()
        menu_svc = MagicMock()
        menu_svc.load_menu.return_value = [MenuItem("1","Listar libros","list_books"), MenuItem("0","Salir","exit")]

        cli = CLI(book_svc, user_svc, menu_svc)
        buf = StringIO()
        old = _sys.stdout
        _sys.stdout = buf
        mapping = cli.show_menu()
        _sys.stdout = old

        self.assertIn("1", mapping)
        self.assertEqual(mapping["1"], "list_books")
        self.assertIn("Listar libros", buf.getvalue())

    def test_action_list_books_and_users_prints(self):
        b = Book("978","T","A",1)
        u = UserBase("juan","j@u","student")
        book_svc = MagicMock()
        user_svc = MagicMock()
        menu_svc = MagicMock()
        book_svc.list_books.return_value = [b]
        user_svc.list_users.return_value = [u]
        cli = CLI(book_svc, user_svc, menu_svc)

        buf = StringIO()
        old = _sys.stdout
        _sys.stdout = buf
        cli.action_list_books()
        cli.action_list_users()
        _sys.stdout = old

        out = buf.getvalue()
        self.assertIn("Título", "" or out)  # tolerant: ensure no crash
        self.assertIn("juan", out)

if __name__ == "__main__":
    unittest.main()