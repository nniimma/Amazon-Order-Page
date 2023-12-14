export function centToDollar(amount){
    return (Math.round(amount) / 100).toFixed(2)
}

// default help not to need the {} while importing
export default centToDollar