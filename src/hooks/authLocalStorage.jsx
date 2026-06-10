import CryptoJS from 'crypto-js'
import { toast } from 'react-toastify'

const secretkey = 'asfvhjhk'


export const storeUser = (user)=>{
    console.log(secretkey)
    try {
        const encryptedUser = CryptoJS.AES.encrypt(
            JSON.stringify(user),
            secretkey
        ).toString()
        localStorage.setItem("user",encryptedUser)
    } catch (error) {
        console.log("Error Storing User",error)
    }

}

export const getUser = ()=>{
    try {
        const encryptedUser = localStorage.getItem("user")
        if(!encryptedUser) return null;

        const bytes = CryptoJS.AES.decrypt(encryptedUser,secretkey)
        const decryptedUser =  JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return decryptedUser
    } catch (error) {
        console.log("Error getting user",error)
    }
}

export const removeUser = ()=>{
    try {
        localStorage.removeItem('user')
    } catch (error) {
        toast.error(error)
    }
}