export const permissions: permisos[] = [
  {
    id:           1,
    name:         "Permiso para crear instructores",
    type:         "C",
    table:        "instructor"

  },
  {
    id:           2,
    name:         "Permiso para editar instructores",
    type:         "U",
    table:        "instructor"
  },
  {
    id:           3,
    name:         "Permiso para eliminar instructores",
    type:         "D",
    table:        "instructor"
  },
  {
    id:           4,
    name:         "Permiso para ver instructores",
    type:         "R",
    table:        "instructor"
  },
  {
    id:           5,
    name:         "Permiso para crear usuarios",
    type:         "C",
    table:        "user"
  },
  {
    id:           6,
    name:         "Permiso para editar usuarios",
    type:         "U",
    table:        "user"
  },
  {
    id:           7,
    name:         "Permiso para ver usuarios",
    type:         "R",
    table:        "user"
  },
  {
    id:           8,
    name:         "Permiso para eliminar usuarios",
    type:         "D",
    table:        "user"
  },
  {
    id:            9,
    name:         "Permiso para crear seminaristas",
    type:         "C",
    table:        "seminarian"
  },
  {
    id:           10,
    name:         "Permiso para editar seminaristas",
    type:         "U",
    table:        "seminarian"
  },
  {
    id:           11,
    name:         "Permiso para ver seminaristas",
    type:         "R",
    table:        "seminarian"
  },
  {
    id:           12,
    name:         "Permiso para eliminar seminaristas",
    type:         "D",
    table:        "seminarian"
  },
  {
    id:           13,
    name:         "Permiso para crear tests",
    type:         "C",
    table:        "test"
  },
  {
    id:           14,
    name:         "Permiso para editar tests",
    type:         "U",
    table:        "test"
  },
  {
    id:           15,
    name:         "Permiso para ver tests",
    type:         "R",
    table:        "test"
  },
  {
    id:           16,
    name:         "Permiso para eliminar tests",
    type:         "D",
    table:        "test"
  },
  {
    id:           17,
    name:         "Permiso para crear etapas",
    type:         "C",
    table:        "stage"
  },
  {
    id:           18,
    name:         "Permiso para editar etapas",
    type:         "U",
    table:        "stage"
  },
  {
    id:           19,
    name:         "Permiso para ver etapas",
    type:         "R",
    table:        "stage"
  },
  {
    id:           20,
    name:         "Permiso para eliminar etapas",
    type:         "D",
    table:        "stage"
  },
  {
    id:           21,
    name:         "Permiso para crear cursos",
    type:         "C",
    table:        "course"
  },
  {
    id:           22,
    name:         "Permiso para editar cursos",
    type:         "U",
    table:        "course"
  },
  {
    id:           23,
    name:         "Permiso para ver cursos",
    type:         "R",
    table:        "course"
  },
  {
    id:           24,
    name:         "Permiso para eliminar cursos",
    type:         "R",
    table:        "course"
  },
  {
    id:           25,
    name:         "Permiso para crear materias",
    type:         "C",
    table:        "subject"
  },
  {
    id:           26,
    name:         "Permiso para editar materias",
    type:         "U",
    table:        "subject"
  },
  {
    id:           27,
    name:         "Permiso para ver materias",
    type:         "R",
    table:        "subject"
  },
  {
    id:           28,
    name:         "Permiso para eliminar materias",
    type:         "D",
    table:        "subject"
  },
];

interface permisos{
  id: number,
  name: string,
  type: string,
  table: string
}