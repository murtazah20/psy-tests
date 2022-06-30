export function createControl(config, validation) {
    return {
        ...config,
        validation,
        valid: !validation, // Если передали что то в валидацию значение по умолчанию будет false
        touched: false,
        value: ''
    }
}

export function validate (value, validation = null) {
    if(!validation){
        return true
    }

    let isValid = true 

    if(validation.required) {
        isValid = value.trim() !== '' && isValid
    }
    if(value <= validation.minLength){
        isValid = false && isValid
    }
    return isValid

}

export function  validateForm(formControls){
    let isFormValid = true

    for (let control in formControls) {
        if (formControls.hasOwnProperty(control)) {
          isFormValid = formControls[control].valid && isFormValid
        }
      }

    return isFormValid
}