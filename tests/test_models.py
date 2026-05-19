import unittest
from src.models import User  # Assuming User is a class defined in models

class TestUserModel(unittest.TestCase):

    def setUp(self):
        self.user = User(name="Test User", email="test@example.com")

    def test_user_creation(self):
        self.assertEqual(self.user.name, "Test User")
        self.assertEqual(self.user.email, "test@example.com")

    def test_user_string_representation(self):
        self.assertEqual(str(self.user), "Test User")

    def test_user_email_validation(self):
        self.assertTrue(self.user.is_valid_email())

if __name__ == '__main__':
    unittest.main()