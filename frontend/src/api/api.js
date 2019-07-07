import axios from 'axios';
export const getQuestionWithAns = (data) => {
    return axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/',
        data: data,
    })
    .then(res => {
        return res.data;
    })
    .catch(error => {
    })
}