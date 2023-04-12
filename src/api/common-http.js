import axios from 'axios'
export default axios.create({
    baseURL:'https://myfirstweb-udeq.onrender.com',
    headers:{
        'Content-Type':'application/json'
    }
})