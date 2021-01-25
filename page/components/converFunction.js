import { Clipboard, Alert } from 'react-native'

export function convertRupiah(value) {
    let reverse = value.toString().split('').reverse().join('')
    let result1 = reverse.match(/\d{1,3}/g)
    let result = result1.join('.').split('').reverse().join('')
    return result
}

export function convertDate(date) {
    var today = new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).split(' ').join(' ');

    return today
}

export function clipboard(value) {
    Clipboard.setString(value)
    Alert.alert('Success', 'Copied to clipboard')
}