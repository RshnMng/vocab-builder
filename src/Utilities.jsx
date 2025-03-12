const utils = {
        saveToLocal : (name, value) => {
        let dataJson = JSON.stringify(value);
        localStorage.setItem(name, dataJson);
    },
    
    getFromLocal : (name) => {
        let dataJson = localStorage.getItem(name);
        let data = JSON.parse(dataJson);
        return data;
    },
       createRandomId: () => {
        let randomNum = Math.floor(Math.random() * 10000);
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        const randomLetter = alphabet.charAt(randomIndex);
        
        return randomLetter + randomNum;
    }
}

export default {utils}