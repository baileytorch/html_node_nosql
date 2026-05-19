# Proyecto POO con Python + MongoDB

este proyecto es una demostración de los principios de la POO en Python. Estructurado en capas (data, modelos, negocio), para separar las responsabilidades del código, hacerlo más modular y facilitar la mantención.

## Project Structure

```
python-oop-project
├── src
│   ├── main.py          # Entry point of the application
│   ├── models           # Contains data model classes
│   ├── services         # Contains business logic services
│   └── utils            # Contains utility functions and classes
├── tests                # Contains unit tests for the application
├── requirements.txt     # Lists project dependencies
├── README.md            # Project documentation
└── .gitignore           # Files to ignore in version control
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd python-oop-project
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage

To run the application, execute the following command:
```
python src/main.py
```

## Testing

To run the tests, use the following command:
```
pytest tests/
```

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.