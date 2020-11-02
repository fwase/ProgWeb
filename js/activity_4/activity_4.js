class IntegerSet {
    constructor (maxValue) {
        this.maxValue = maxValue
        this.availableValue = []
        this.setInitialValues();
    }

    setInitialValues () {
        for(let i = 0 ; i < this.maxValue ; i++){
            this.availableValue.push(false);
        }
    }

    insert (value) {
        if(value >= this.maxValue){
            console.error("Value higher than " + (this.maxValue-1))
            return
        }
        
        this.availableValue[value] = true;

        
    }

    delete (value){
        if(value >= this.maxValue){
            console.error("Value higher than " + (this.maxValue-1))
            return
        }
        
        this.availableValue[value] = false;
    }

    union (otherConj) {
        let valuesConj1 = []
        let valuesConj2 = []

        for(let i = 0 ; i < this.maxValue ; i++){
            if(this.availableValue[i] === true){
                valuesConj1.push(i);
            }
        }

        for(let i = 0 ; i < otherConj.length ; i++){
            if(otherConj[i] === true){
                valuesConj2.push(i);
            }
        }

        return valuesConj1.concat(valuesConj2)
    }

    intersection (otherConj) {
        let valuesConj1 = []
        let valuesConj2 = []

        for(let i = 0 ; i < this.maxValue ; i++){
            if(this.availableValue[i] === true){
                valuesConj1.push(i);
            }
        }

        for(let i = 0 ; i < otherConj.length ; i++){
            if(otherConj[i] === true){
                valuesConj2.push(i);
            }
        }

        return valuesConj1.filter(value => valuesConj2.includes(value))
    }

    difference (otherConj) {
        let valuesConj1 = []
        let valuesConj2 = []

        for(let i = 0 ; i < this.maxValue ; i++){
            if(this.availableValue[i] === true){
                valuesConj1.push(i);
            }
        }

        for(let i = 0 ; i < otherConj.length ; i++){
            if(otherConj[i] === true){
                valuesConj2.push(i);
            }
        }

        return valuesConj1.filter(value => !valuesConj2.includes(value))
    }

    toString () {
        let string = ""

        for(let i = 0 ; i < this.maxValue ; i++){
            if(this.availableValue[i] === true){
                string += this.availableValue[i].toString() + ", "
            }
        }

        return string
    }

    getMaxValue () {
        return this.getMaxValue
    }

    getAvailableValues () {
        return this.availableValue
    }
}