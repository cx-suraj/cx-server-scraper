'use strict'

const { create } = require('axios');
const cheerio = require('cheerio');
const { youtube } = require('@googleapis/youtube');
require('dotenv').config();

const key = process.env.YOUTUBE_API_KEY;
const YT = youtube({
    version: 'v3',
    auth: key,
});
const axiosInstance = create({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
    },
    validateStatus: () => {
        return true
    }
})


/**
 * Check YouTube Url
 *
 * @param {string} url
 * @returns {boolean}
 */
const checkUrl = (url) => url.indexOf('youtube.com') !== -1 || url.indexOf('youtu.be') !== -1

/**
 * Get YouTube Channel ID By Url
 *
 * @param {string} url Channel Url
 * @returns {Promise<string>} Channel ID
 */

const channelId = async (url) => {
    if (checkUrl(url)) {
        const ytChannelPageResponse = await axiosInstance.get(url);
        const $ = cheerio.load(ytChannelPageResponse.data);
        const id = $('meta[itemprop="channelId"]').attr('content');
        if (id) {
            return id;
        }
    } else {
        return `"${url}" is not a YouTube url.`;
    }
    return `Unable to get "${url}" channel id.`;
}

/**
 * Get YouTube Video ID By Url
 *
 * @param {string} url Video Url
 * @returns {Promise<string>} Video ID
 */
const videoId = async (url) => {
    if (checkUrl(url)) {
        const ytChannelPageResponse = await axiosInstance.get(url)
        const $ = cheerio.load(ytChannelPageResponse.data)

        const id = $('meta[itemprop="videoId"]').attr('content')
        if (id) {
            return id
        }
    } else {
        throw Error(`"${url}" is not a YouTube url.`)
    }

    throw Error(`Unable to get "${url}" video id.`)
}

/**
 * Get channel data using channelId
 *
 * @param {string} id Channel ID
 * @returns {Promise<object>} Channel data
 */
async function fetchYtDataByChannelId(id) {
    return await YT.channels.list({
        "part": [
            "snippet,contentDetails,statistics"
        ],
        "id": [
            id
        ]
    }).then(function (response) {
        // console.log("channel response generated");
        return response;
    },
        function (err) { console.error("Execute error", err); });
}

module.exports = {
    channelId,
    videoId,
    fetchYtDataByChannelId
}