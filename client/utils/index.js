import moment from 'moment'

export const datetime = (value, format = 'YYYY年MM月DD日 HH:mm:ss') => {
  console.log('value: ', value)
  if (!value || isNaN(value)) return ''
  return moment(value * 1000).format(format)
}
