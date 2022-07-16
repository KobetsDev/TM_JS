export function IsValid(x) {
    for (let value = 0; value < x.length; value++) {
        // console.log('Error', x[value])
        if (x[value] == undefined && x[value] == "") {

            return false
        }

    }
    return true
}