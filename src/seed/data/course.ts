export const course: Course_i[]= [
    {
        id: 1,
        stage_id: 1,
        description: "PROPEDÉUTICO",
        instructor_id: null
    },
    {
        id: 2,
        stage_id: 2,
        description: "I FILOSOFÍA",
        instructor_id: null
    },
    {
        id: 3,
        stage_id: 2,
        description: "II FILOSOFÍA",
        instructor_id: null
    },
    {
        id: 4,
        stage_id: 2,
        description: "III FILOSOFÍA",
        instructor_id: null
    },
    {
        id: 5,
        stage_id: 3,
        description: "I TEOLOGÍA",
        instructor_id: null
    },
    {
        id: 6,
        stage_id: 3,
        description: "II TEOLOGÍA",
        instructor_id: null
    },
    {
        id: 7,
        stage_id: 3,
        description: "III TEOLOGÍA",
        instructor_id: null
    },
    {
        id: 8,
        stage_id: 3,
        description: "IV TEOLOGÍA",
        instructor_id: null
    },
]

interface Course_i{
    id:         number,
    stage_id:   number,
    description: string,
    instructor_id: null
}