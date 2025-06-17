Web Platform - Django + Tailwind + Kubernetes + AWS

Este proyecto es una plataforma web desarrollada con un enfoque moderno y escalable. Utiliza Django como backend principal, Tailwind CSS para el diseño responsivo, y está orquestado con Kubernetes, detrás de un Nginx reverse proxy y desplegado en AWS

Stack Tecnológico

Backend: Django (Python 3.10+)

Frontend: HTML5, Tailwind CSS, JavaScript

Servidor Web: Nginx (reverse proxy, TLS, static/media handling)

Contenedores: Docker

Orquestación: Kubernetes (manifests en YAML, configuraciones independientes por entorno)

Cloud Provider: AWS (EC2, S3, optional: RDS/PostgreSQL)

CI/CD: Compatible con GitHub Actions o GitLab CI


......

Segurida

Variables de entoro gestionadas con .env y secretos montados por volumen/Secrets API

CSRF, CORS y cabeceras estrictas configuradas

Autenticacion JWT o session-based (según módulo)

Integración con S3 para almacenamiento de media


✓✓✓ Testing y Linting

Django Test Framework

Pytest opcional

Flake8 + Black

ESLint para scripts JS


✓✓✓Licencia

Este proyecto es privado y desarrollado con fines de aprendizaje técnico y pruebas de infraestructura real. No incluye ningún componente generado por IA ni plantillas de terceros.
