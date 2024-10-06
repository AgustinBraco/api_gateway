export const generateID = () => {
  let id = ''
  for (let i = 0; i < 24; i++)
    id += Math.floor(Math.random() * 16).toString(16)
  return id
}