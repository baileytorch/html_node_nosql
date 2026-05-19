# Reemplazo/añadido: entidades para la biblioteca

class BaseEntity:
    def to_dict(self):
        d = self.__dict__.copy()
        return d

    @classmethod
    def from_dict(cls, d):
        return cls(**d)


class Book(BaseEntity):
    def __init__(self, isbn, title, author, copies=1, _id=None):
        self._id = _id
        self.isbn = isbn
        self.title = title
        self.author = author
        self.copies = copies

    def __str__(self):
        return f"Book(isbn={self.isbn}, title={self.title}, author={self.author}, copies={self.copies})"

    @classmethod
    def from_dict(cls, d):
        return cls(d.get("isbn"), d.get("title"), d.get("author"), d.get("copies", 1), d.get("_id"))


class UserBase(BaseEntity):
    def __init__(self, username, email, role, _id=None, extra=None):
        self._id = _id
        self.username = username
        self.email = email
        self.role = role  # "student" o "professor"
        self.extra = extra or {}

    def __str__(self):
        return f"User(username={self.username}, email={self.email}, role={self.role}, extra={self.extra})"

    @classmethod
    def from_dict(cls, d):
        return cls(d.get("username"), d.get("email"), d.get("role"), d.get("_id"), d.get("extra"))


class MenuItem(BaseEntity):
    def __init__(self, key, label, action, _id=None):
        self._id = _id
        self.key = key
        self.label = label
        self.action = action

    @classmethod
    def from_dict(cls, d):
        return cls(d.get("key"), d.get("label"), d.get("action"), d.get("_id"))

    def __str__(self):
        return f"{self.key}) {self.label}"