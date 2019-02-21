export const getName = ({ firstName, lastName, username }) => {
    if(!firstName && !lastName) return username
    if(firstName && lastName) return `${firstName} ${lastName}`
    return firstName?firstName:lastName
  }
