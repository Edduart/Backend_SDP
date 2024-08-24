export const permissions: permisos[] = [
  {
    id:           1,
    name:         "PERMISO PARA CREAR INSTRUCTORES",
    type:         "C",
    table:        "INSTRUCTOR"

  },
  {
    id:           2,
    name:         "PERMISO PARA EDITAR INSTRUCTORES",
    type:         "U",
    table:        "INSTRUCTOR"
  },
  {
    id:           3,
    name:         "PERMISO PARA ELIMINAR INSTRUCTORES",
    type:         "D",
    table:        "INSTRUCTOR"
  },
  {
    id:           4,
    name:         "PERMISO PARA VER INSTRUCTORES",
    type:         "R",
    table:        "INSTRUCTOR"
  },
  {
    id:           5,
    name:         "PERMISO PARA CREAR USUARIOS",
    type:         "C",
    table:        "USER"
  },
  {
    id:           6,
    name:         "PERMISO PARA EDITAR USUARIOS",
    type:         "U",
    table:        "USER"
  },
  {
    id:           7,
    name:         "PERMISO PARA VER USUARIOS",
    type:         "R",
    table:        "USER"
  },
  {
    id:           8,
    name:         "PERMISO PARA ELIMINAR USUARIOS",
    type:         "D",
    table:        "USER"
  },
  {
    id:            9,
    name:         "PERMISO PARA CREAR SEMINARISTAS",
    type:         "C",
    table:        "SEMINARIAN"
  },
  {
    id:           10,
    name:         "PERMISO PARA EDITAR SEMINARISTAS",
    type:         "U",
    table:        "SEMINARIAN"
  },
  {
    id:           11,
    name:         "PERMISO PARA VER SEMINARISTAS",
    type:         "R",
    table:        "SEMINARIAN"
  },
  {
    id:           12,
    name:         "PERMISO PARA ELIMINAR SEMINARISTAS",
    type:         "D",
    table:        "SEMINARIAN"
  },
  {
    id:           13,
    name:         "PERMISO PARA CREAR TESTS",
    type:         "C",
    table:        "TEST"
  },
  {
    id:           14,
    name:         "PERMISO PARA EDITAR TESTS",
    type:         "U",
    table:        "TEST"
  },
  {
    id:           15,
    name:         "PERMISO PARA VER TESTS",
    type:         "R",
    table:        "TEST"
  },
  {
    id:           16,
    name:         "PERMISO PARA ELIMINAR TESTS",
    type:         "D",
    table:        "TEST"
  },
  {
    id:           17,
    name:         "PERMISO PARA CREAR ETAPAS",
    type:         "C",
    table:        "STAGE"
  },
  {
    id:           18,
    name:         "PERMISO PARA EDITAR ETAPAS",
    type:         "U",
    table:        "STAGE"
  },
  {
    id:           19,
    name:         "PERMISO PARA VER ETAPAS",
    type:         "R",
    table:        "STAGE"
  },
  {
    id:           20,
    name:         "PERMISO PARA ELIMINAR ETAPAS",
    type:         "D",
    table:        "STAGE"
  },
  {
    id:           21,
    name:         "PERMISO PARA CREAR CURSOS",
    type:         "C",
    table:        "COURSE"
  },
  {
    id:           22,
    name:         "PERMISO PARA EDITAR CURSOS",
    type:         "U",
    table:        "COURSE"
  },
  {
    id:           23,
    name:         "PERMISO PARA VER CURSOS",
    type:         "R",
    table:        "COURSE"
  },
  {
    id:           24,
    name:         "PERMISO PARA ELIMINAR CURSOS",
    type:         "D",
    table:        "COURSE"
  },
  {
    id:           25,
    name:         "PERMISO PARA CREAR MATERIAS",
    type:         "C",
    table:        "SUBJECT"
  },
  {
    id:           26,
    name:         "PERMISO PARA EDITAR MATERIAS",
    type:         "U",
    table:        "SUBJECT"
  },
  {
    id:           27,
    name:         "PERMISO PARA VER MATERIAS",
    type:         "R",
    table:        "SUBJECT"
  },
  {
    id:           28,
    name:         "PERMISO PARA ELIMINAR MATERIAS",
    type:         "D",
    table:        "SUBJECT"
  },
  {
    id:           29,
    name:         "PERMISO PARA VER LAS NOTAS PROPIAS UNICAMENTE",
    type:         "R",
    table:        "TESTS"
  },
  {
    id:           30,
    name:         "ACCESO TOTAL AL SISTEMA",
    type:         "A",
    table:        "ADMIN"
  },
];

interface permisos{
  id: number,
  name: string,
  type: string,
  table: string
}