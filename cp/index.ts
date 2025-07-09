type student = {
    id: string
    name: string
    age: number
}
let data: student[] = []

while (true) {
    const input: string = prompt() ?? ''
    if (input?.toLocaleLowerCase() === "exit") {
        break
    }
    let stdData = input.split(" ")
    if (stdData.length < 3) {
        console.log("invalid data")
        continue
    }
    data.push({
        id: stdData[0] ?? '',
        name: stdData[1] ?? '',
        age: parseInt(stdData[2] ?? '0')
    })
}