import { studentData, type Student } from "./w1"

//pure ? ✅
function getStudentByName(students: Student[], name: string): Student | null {
    // let x = students.filter(item => item.name === name)[1] ?? null
    // console.log('1111111111111111111111111111111')
    let x = students.find(item => item.name === name) ?? null
    // console.log(x)
    // console.log('name ' + name)
    return x
}


function addStudent(students: Student[], newStudent: Student): Student {
    let newData = structuredClone(students) //pure ? ✅
    if (getStudentByName(newData, newStudent.name) === null) {
        newData.push(newStudent) //pure ? ✅
    }
    return newStudent
}

function deleteStudent(students: Student[], name: string): Student[] {
    let newData = structuredClone(students) //pure ? ✅
    return newData.filter(item => item.name.toLowerCase() !== name.toLowerCase()) //pure ? ✅
}

function updateStudent(students: Student[], std: Student): Student[] {
    let find_std = getStudentByName(students, std.name)
    if (find_std === null) {

        let newData = deleteStudent(students, std.name)
        newData.push(std)
        return newData
    }
    return students //pure ? ✅
}


console.log('\n---------- ต้นฉบับ -----------')
console.table(studentData)
console.log('\n')

console.log('\n---------- เพิ่ม std -----------')
const newStd = addStudent(studentData, { name: 'test', score: 0 })
console.table(newStd)
console.log('\n')

console.log('\n---------- edit std -----------')
const newData = updateStudent(studentData, newStd)
console.table(newData)
console.log('\n')

console.log('\n---------- ต้นฉบับ -----------')
console.table(studentData)
console.log('\n')