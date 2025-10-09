# Python Server

Este projeto é um servidor backend construído com Django e Django REST Framework. Ele expõe uma API RESTful para um modelo de produtos.

## ✅ Pré-requisitos

- Python 3.8 ou superior instalado no sistema
- `pip` instalado
- Git (opcional)

## ⚙️ Como executar?

### 1. Clone o repositório (se aplicável)

```bash
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
````

### 2. Crie um ambiente virtual no Windows

```bash
python -m venv venv
```

### 3. Ative o ambiente virtual

```bash
venv\Scripts\activate
```

Você verá algo como `(venv)` antes do prompt no terminal, indicando que o ambiente virtual está ativo.

### 4. Instale as dependências

```bash
pip install -r requirements.txt
```

> Certifique-se de que o arquivo `requirements.txt` contém todas as dependências, incluindo `Django` e `djangorestframework`.

### 5. Aplique as migrações do banco de dados

```bash
python manage.py migrate
```

### 6. Inicie o servidor

```bash
python manage.py runserver
```

### 7. Acesse a API

Abra o navegador e acesse:

```
http://127.0.0.1:8000/api/produtos/
```

## 8. Comando completo
```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver

```


## 📦 Estrutura básica da API

* `GET /api/produtos/` — lista todos os produtos
* `POST /api/produtos/` — cria um novo produto
* `GET /api/produtos/<id>/` — obtém detalhes de um produto
* `PUT /api/produtos/<id>/` — atualiza um produto
* `DELETE /api/produtos/<id>/` — remove um produto

---


## 🛠️ Ferramentas utilizadas

* [Django](https://www.djangoproject.com/)
* [Django REST Framework](https://www.django-rest-framework.org/)
