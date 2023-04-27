
export function genUUID () {
    let num = "";
    for(let i = 0; i < 15; i++) {
        num += Math.floor(Math.random()*10);
    }

    return num;
}