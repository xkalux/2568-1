export interface Student {
    name: string
    score: number
    tries?: number
}

//mock database
export let studentData: Student[] = [
    { name: "Menta", score: 90, tries: 1 },
    { name: "Manita", score: 70, tries: 4 },
    { name: "Phiyada", score: 95 }
]

//pure ? ✅
function getStudentByName(students: Student[], name: string): Student | null {
    for (let index = 0; index < students.length; index++) {
        if (students[index]) {
            //@ts-ignore
            if (students[index].name.toLowerCase() === name.toLowerCase()) {
                let std = students[index]
                //@ts-ignore
                return { ...std }
            }
        }
    }
    return null
}


function addStudent(students: Student[], newStudent: Student): Boolean {
    if (getStudentByName(students, newStudent.name) === null) {
        students.push(newStudent) //pure ? ❌
        return true
    }
    return false
}

function deleteStudent(students: Student[], name: string): Boolean {
    for (let index = 0; index < students.length; index++) {
        //@ts-ignore
        if (students[index].name.toLowerCase() === name.toLowerCase()) {
            studentData.splice(index, 1)
            return true
        }
    }
    return false
}

function updateStudent(students: Student[], name: string, score: number) {
    let std = getStudentByName(students, name)
    if (std) {
        deleteStudent(students, name)
        std.score = score
        std.tries = std.tries ? std.tries++ : 1
        addStudent(students, std)
    }
}


// console.log('\n---------- ต้นฉบับ -----------')
// console.table(studentData)
// console.log('\n')


// console.log('\n---------- เพิ่ม std -----------')
// addStudent(studentData, { name: 'test', score: 0 })
// console.table(studentData)
// console.log('\n')

// console.log('\n---------- edit std -----------')
// updateStudent(studentData, "test", 89)
// console.table(studentData)
// console.log('\n')