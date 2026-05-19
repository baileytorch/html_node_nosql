import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src")))

import unittest
from models.entities import Book, UserBase, MenuItem

class TestEntities(unittest.TestCase):
    def test_book_to_from_dict_and_str(self):
        b = Book("978-0", "Título", "Autor", 2, _id="abc")
        d = b.to_dict()
        self.assertEqual(d["isbn"], "978-0")
        b2 = Book.from_dict(d)
        self.assertEqual(b2.isbn, "978-0")
        self.assertIn("Título", str(b))

    def test_userbase_to_from_dict(self):
        u = UserBase("juan", "j@uni", "student", _id="u1", extra={"student_id":"S1"})
        d = u.to_dict()
        self.assertEqual(d["username"], "juan")
        u2 = UserBase.from_dict(d)
        self.assertEqual(u2.role, "student")

    def test_menuitem_from_and_str(self):
        m = MenuItem("1", "Listar", "list")
        d = m.to_dict()
        self.assertEqual(d["key"], "1")
        m2 = MenuItem.from_dict(d)
        self.assertEqual(str(m2), "1) Listar")

if __name__ == "__main__":
    unittest.main()