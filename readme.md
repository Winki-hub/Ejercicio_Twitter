# Primera API con 2 recursos

Queremos desarrollar una api restful con node para un proyecto copia de twitter. Aunque de momento, será solo una primera versión con usuarios y tweets como si fuese un blog personal.

![Ejercicio](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/067fd9f3-f0d8-4990-a78c-8e0d6a764864/Untitled.png)

Deberán estar implementadas las funcionalidades de:

- [x] Crear un nuevo usuario
- [x] ]Borrar un usuario
- [x] Editar el email de un usuario o el nombre (PATCH)
- [ ] Subir un tweet nuevo por parte de un usuario
- [ ] Ir a buscar un tweet en concreto por su id
- [ ] Borrar un tweet por su id
- [ ] Opcional: Obtener todos los tweets ordenados tanto asc como desc por la fecha de subida
- [x] Opcional: Guardar los usuarios en un fichero db.json y actualizarlo con cada cambio.
- [ ] Opcional: Guardar los tweets en un fichero db.json y actualizarlo con cada cambio.
- [ ] OBLIGATORIO: Usar router para cada recurso

OJO ! CONTROLA QUE LA API NO SE PUEDA QUEDAR PILLADA EN NINGÚN MOMENTO, controla campos vacíos, request inválidas, etc etc y devuelve el error en la respuesta y el código correcto para dicho caso.