const randomIntGenerator = (length:number)=>{
    const digis = '0123456789';
    let otp = '';

    for(let i  = 0 ; i < length ; i++){
        otp += digis[Math.floor(Math.random() * 10).toString()]
    }

    return otp ; 
}


console.log(randomIntGenerator(4))