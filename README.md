
# empleados_demo
Prueba técnica para BRAND FACTORY

# Prueba Técnica: Gestión de Empleados (Brand Factory Demo)

El proyecto implementa un sistema CRUD completo para la gestión de Empleados, Puestos y Asignaciones, simulando una API REST mediante **LocalStorage** para la persistencia de datos.

## 📋 Requisitos Previos

Para ejecutar este proyecto necesitas tener instalado en tu entorno:

* **Node.js**: v18.13.0 o superior.
* **Angular CLI**: v17.0.0 o superior.

## 🛠️ Instrucciones de Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en tu máquina local:

### 1. Clonar el repositorio

Descarga el código fuente:

```bash
git clone https://github.com/JesusSaith/empleados_demo.git
cd empleados_demo
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar el servidor de desarrollo

```bash
ng serve
```

### 4. Acceder a la aplicación

Una vez que la consola muestre **"Compiled successfully"**, abre tu navegador y visita:
[http://localhost:4200/](http://localhost:4200/)

## 5. Estructura del Proyecto

El código fuente se encuentra organizado en `src/app/` siguiendo una arquitectura modular y escalable:

* **/components**: Contiene las vistas principales (personas, puestos, empleados-puestos).
* **/services**: Lógica de negocio y comunicación de datos (data.service.ts).
* **/models**: Definición estricta de interfaces TypeScript (empleados.interface.ts).
* **/pipes**: Utilidades de transformación de datos (filtro-global.pipe.ts).

## 6. 🧪 Guía de Prueba (Flujo Recomendado)

Al iniciar la aplicación por primera vez, la base de datos (LocalStorage) estará vacía. Se recomienda seguir este flujo para validar todas las funcionalidades:

* **Crear Personas**: Navega a la pestaña Personas y registra al menos un empleado (ej. "Juan Pérez").
* **Crear Puestos**: Navega a la pestaña Puestos y crea un cargo (ej. "Desarrollador Frontend").
* **Realizar Asignación**: Navega a la pestaña Asignaciones.
* **Vinculación**: Utiliza los selectores para vincular al Empleado con el Puesto y guarda el registro.
* **Verificación de Persistencia**: Recarga la página (F5) para confirmar que los datos se mantienen guardados y las relaciones se visualizan correctamente.

---

Desarrollado por: **Meneses Conde Jesús Saith**
Fecha: **Febrero 2026**
