# ✨ XENIA DREAMS

## 🌍 Descripción del proyecto

**XENIA DREAMS** es una plataforma web diseñada para dar oportunidades a estudiantes internacionales que desean venir a estudiar a España.

El objetivo del proyecto es facilitar el acceso a la educación a alumnos que buscan una oportunidad de mejorar su formación, simplificando el proceso de solicitud mediante un formulario online moderno, rápido y automatizado.

---

## 🎯 Objetivo

Dar soporte digital a estudiantes que desean estudiar en España, centralizando el proceso de solicitud y almacenamiento de datos en una arquitectura moderna basada en frontend y backend desacoplados.

---

## ⚙️ Arquitectura del sistema

El sistema está dividido en dos partes principales:

### 🖥️ Frontend (Vite)
- HTML
- Tailwind CSS
- JavaScript (Vanilla)

### 🧠 Backend (Docker + Apache + PHP)
- PHP como API REST
- Apache dentro de contenedor Docker
- Archivo `conexion.php` para conexión a base de datos

### ☁️ Base de datos
- AWS Aurora DB (MySQL compatible)

---

## 🔄 Flujo de funcionamiento

El sistema sigue el siguiente flujo:

1. El usuario rellena el formulario y pulsa **"Guardar estudiante"**
2. JavaScript intercepta el `submit` (`preventDefault`)
3. JS realiza una petición `fetch()` al backend PHP
4. El backend PHP (en Docker Apache) recibe los datos
5. PHP incluye y usa `conexion.php`
6. `conexion.php` establece conexión con AWS AuroraDB
7. Se guardan los datos del estudiante en la base de datos
8. PHP responde en formato **JSON**
9. JavaScript recibe la respuesta y muestra un **alert / mensaje en pantalla**

---

## 🔁 Esquema del flujo

Frontend → fetch() → PHP (API) → conexion.php → AWS AuroraDB → respuesta JSON → Frontend UI

---

## 🛠️ Tecnologías utilizadas

### Frontend
- HTML5
- Vite
- JavaScript (Vanilla)
- Tailwind CSS

### Backend
- PHP
- Apache (Docker)
- API REST en PHP

### Base de datos
- AWS Aurora DB (MySQL compatible)

---

## 📁 Estructura del proyecto
/frontend
│
├── index.html
├── /src
│ ├── main.js
│ ├── form.js
│ └── styles (Tailwind)
│
/backend
│
├── /api
│ ├── guardar_estudiante.php
│ └── conexion.php
│
├── Dockerfile
└── apache config

---

## 🖼️ Imágenes del funcionamiento

A continuación se muestran las capturas más importantes del flujo de la aplicación **XENIA DREAMS**, desde el formulario hasta la respuesta del backend.

---

### 🧑‍🎓 Formulario de registro
Pantalla principal donde el estudiante introduce sus datos para solicitar información o plaza.

![Formulario de estudiante](./imagesReadme/formulario.avif)

---

### 📤 Envío de datos (Frontend → Backend)
El momento en el que JavaScript intercepta el formulario y envía los datos al backend mediante `fetch()`.

![Fetch request](./images/fetch.png)

---

### 🧠 Procesamiento en el backend (PHP + Apache)
El backend recibe la petición, procesa los datos y utiliza `conexion.php` para conectar con la base de datos.

![Backend PHP](./images/backend.png)

---

### ☁️ Resultado final en base de datos (AWS AuroraDB)
Los datos del estudiante quedan almacenados correctamente en la base de datos.

![Base de datos](./images/database.png)