const { channelId, fetchYtDataByChannelId } = require('../helpers/Social/Youtube');
const { fetchIGDataById, userIdByUname } = require('../helpers/Social/Instagram');


/**
  *  @route   POST /api/launchpad/fetch/IGdata
  *  @desc    Fetch instagram data using rapid API
  *  @access  Public
*/
const fetchIGdata = async (req, res) => {
    const { uname } = req.body;
    try {
        const IgId = await userIdByUname(uname);
        if (IgId) {
            const userData = await fetchIGDataById(IgId);
            if (userData.status != undefined && userData.status === 200) {
                res.status(200).send({
                    success: true,
                    result: userData.data,
                    message: "data fetched successfully"
                });
            } else {
                res.status(401).send({
                    success: false,
                    result: null,
                    message: "failed to fetch data"
                });
            }
        } else {
            res.status(401).send({
                success: false,
                result: null,
                message: "failed to fetch IG user_id "
            });
        }

    } catch (error) {
        console.log("Launchpad -> Fetching IG data  Error: ", error);
        return res.status(500).json(error);
    }
}

/**
  *  @route   POST /api/launchpad/fetch/YTdata
  *  @desc    Fetch youtube data using link with the help of scraper and gogoleapis
  *  @access  Public
*/

const fetchYTdata = async (req, res) => {
    const { url } = req.body;
    try {
        const channelID = await channelId(url);
        if (channelID.startsWith("UC")) {
            const ytData = await fetchYtDataByChannelId(channelID);
            if (ytData.status && ytData.status === 200 && ytData.data.pageInfo.totalResults != 0) {
                res.status(200).json({
                    success: true,
                    result: ytData.data,
                    message: "Youtube data fetched successfully",
                });
            } else {
                res.status(400).json({
                    success: false,
                    result: null,
                    message: "unable to fetch youtube data",
                });
            }
        } else {
            res.status(400).json({
                success: false,
                result: null,
                message: channelID
            });
        }
        return;
    } catch (error) {
        console.log("Launchpad -> Fetching IG data  Error: ", error);
        return res.status(500).json(error);
    }
}
/**
  *  @route   POST /api/launchpad/fetch/YTdata/ID
  *  @desc    Fetch youtube data using id with the help of gogoleapis
  *  @access  Public
*/

const fetchYtDataById = async (req, res) => {
    const { channelId } = req.body;
    try {
        if (channelId.startsWith("UC")) {
            const ytData = await fetchYtDataByChannelId(channelId);
            if (ytData.status && ytData.status === 200 && ytData.data.pageInfo.totalResults != 0) {
                res.status(200).json({
                    success: true,
                    result: ytData.data,
                    message: "Youtube data fetched successfully",
                });
            } else {
                res.status(400).json({
                    success: false,
                    result: null,
                    message: "unable to fetch youtube data",
                });
            }

        } else {
            res.status(400).json({
                success: false,
                result: null,
                message: "Invalid channel id"
            });
        }
        return;
    } catch (error) {
        console.log("Launchpad -> Fetching IG data  Error: ", error);
        return res.status(500).json(error);
    }
}

module.exports = {
    fetchIGdata,
    fetchYTdata,
    fetchYtDataById
};