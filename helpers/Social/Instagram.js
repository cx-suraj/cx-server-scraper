const { default: axios } = require("axios");

// TODO store in .env file
const Rapid_key = "15f47a62e0msh4b128a135cfa1d1p120197jsn4ae2d1cccc70"

/**
 * Get IG-id account id using username
 *
 * @param {string} uname IG uname
 * @returns {Promise<string>} Channel data
 */
const userIdByUname = async (uname) => {
    const options = {
        method: 'GET',
        url: 'https://instagram-scraper-2022.p.rapidapi.com/ig/user_id/',
        params: { user: uname },
        headers: {
            'X-RapidAPI-Key': Rapid_key,
            'X-RapidAPI-Host': 'instagram-scraper-2022.p.rapidapi.com'
        }
    };
    const resp = await axios.request(options);
    if (resp.status === 200) {
        return resp.data.id;
    }
    return false;
}
/**
 * Get IG account data using IG-id
 *
 * @param {string} id IG-id
 * @returns {Promise<object>} IG account data
 */
const fetchIGDataById = async (igId) => {
    const options = {
        method: 'GET',
        url: 'https://instagram-scraper-2022.p.rapidapi.com/ig/info/',
        params: { id_user: igId },
        headers: {
            'X-RapidAPI-Key': Rapid_key,
            'X-RapidAPI-Host': 'instagram-scraper-2022.p.rapidapi.com'
        }
    };
    const response = await axios.request(options);
    if (response.status === 200) {
        return response;
    }
    return false;
}

module.exports = {
    fetchIGDataById,
    userIdByUname,
}