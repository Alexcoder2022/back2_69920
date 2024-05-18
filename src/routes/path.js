import { dirname } from 'path'
import { fileURLToPath } from 'url'
export const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname)  //C:\Users\Alexis\Desktop\1-Entrega Alex\src\routes