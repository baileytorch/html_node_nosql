from business.services import BookService, UserService, MenuService

class CLI:
    def __init__(self, book_svc: BookService, user_svc: UserService, menu_svc: MenuService):
        self.book_svc = book_svc
        self.user_svc = user_svc
        self.menu_svc = menu_svc
        self.actions = {
            "list_books": self.action_list_books,
            "list_users": self.action_list_users,
            "add_book": self.action_add_book,
            "add_user": self.action_add_user,
            "exit": self.action_exit
        }
        self.running = True

    def show_menu(self):
        menu_items = self.menu_svc.load_menu()
        for item in menu_items:
            print(item)
        return {item.key: item.action for item in menu_items}

    def run(self):
        while self.running:
            key_to_action = self.show_menu()
            choice = input("Seleccione opción: ").strip()
            action_key = key_to_action.get(choice)
            if not action_key:
                print("Opción inválida.")
                continue
            action = self.actions.get(action_key)
            if action:
                action()
            else:
                print("Acción no implementada.")

    def action_list_books(self):
        books = self.book_svc.list_books()
        for b in books:
            print(b)

    def action_list_users(self):
        users = self.user_svc.list_users()
        for u in users:
            print(u)

    def action_add_book(self):
        isbn = input("ISBN: ").strip()
        title = input("Título: ").strip()
        author = input("Autor: ").strip()
        copies = input("Copias (n): ").strip() or "1"
        try:
            copies = int(copies)
        except:
            copies = 1
        book = self.book_svc.add_book(isbn, title, author, copies)
        print("Libro agregado:", book)

    def action_add_user(self):
        username = input("Username: ").strip()
        email = input("Email: ").strip()
        role = input("Role (student/professor): ").strip()
        extra = {}
        if role == "student":
            extra["student_id"] = input("Student ID: ").strip()
            extra["career"] = input("Carrera: ").strip()
        else:
            extra["faculty_id"] = input("Faculty ID: ").strip()
            extra["department"] = input("Departamento: ").strip()
        user = self.user_svc.add_user(username, email, role, extra=extra)
        print("Usuario agregado:", user)

    def action_exit(self):
        print("Saliendo...")
        self.running = False