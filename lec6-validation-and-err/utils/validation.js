exports.isAgeValid = (age) => {
    return age && age >= 0 && age <= 100;
}

exports.isNameValid = (name) => {
    return name && name.length > 3;
}