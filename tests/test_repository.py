import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src")))

import unittest
from unittest.mock import MagicMock, patch
from data.repositorio import MongoRepository
from modelos.entidades import MenuItem, Book

class TestMongoRepository(unittest.TestCase):
    @patch("data.repository.MongoClient")
    def test_seed_sample_data_inserts_when_empty(self, mock_client_cls):
        # Prepare fake client/db/collections
        mock_client = MagicMock()
        mock_db = MagicMock()
        mock_menu = MagicMock()
        mock_books = MagicMock()
        mock_users = MagicMock()

        mock_menu.count_documents.return_value = 0
        mock_books.count_documents.return_value = 0
        mock_users.count_documents.return_value = 0

        mock_db.__getitem__.side_effect = lambda name: {"menu": mock_menu, "books": mock_books, "users": mock_users}[name]
        mock_client.__getitem__.return_value = mock_db
        mock_client_cls.return_value = mock_client

        repo = MongoRepository()
        repo.seed_sample_data()

        mock_menu.insert_many.assert_called()
        mock_books.insert_many.assert_called()
        mock_users.insert_many.assert_called()

    @patch("data.repository.MongoClient")
    def test_get_menu_and_books_return_entities(self, mock_client_cls):
        mock_client = MagicMock()
        mock_db = MagicMock()
        mock_menu = MagicMock()
        mock_books = MagicMock()

        # menu.find().sort(...) -> iterable of dicts
        menu_find = MagicMock()
        menu_find.sort.return_value = [{"key":"1","label":"Listar","action":"list"}]
        mock_menu.find.return_value = menu_find

        mock_books.find.return_value = [{"isbn":"978-1","title":"T","author":"A","copies":1}]

        mock_db.__getitem__.side_effect = lambda name: {"menu": mock_menu, "books": mock_books, "users": MagicMock()}[name]
        mock_client.__getitem__.return_value = mock_db
        mock_client_cls.return_value = mock_client

        repo = MongoRepository()
        menu = repo.get_menu()
        books = repo.get_books()

        self.assertIsInstance(menu[0], MenuItem)
        self.assertEqual(menu[0].label, "Listar")
        self.assertIsInstance(books[0], Book)
        self.assertEqual(books[0].title, "T")

if __name__ == "__main__":
    unittest.main()