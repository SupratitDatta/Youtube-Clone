import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";

const VideoCard = ({ video: { id: { videoId }, snippet } }) => {

    const [channelDetail, setChannelDetail] = useState(null);

    useEffect(() => {
        const fetchChannelDetails = async () => {
            if (snippet?.channelId) {
                const data = await fetchFromAPI(`channels?part=snippet&id=${snippet.channelId}`);
                setChannelDetail(data?.items[0]?.snippet);
            }
        };
        fetchChannelDetails();
    }, [snippet?.channelId]);
    
    function getVideoAge(createdTime) {
        const currentDate = new Date();
        const videoDate = new Date(createdTime);

        const timeDifference = currentDate - videoDate;

        const millisecondsPerSecond = 1000;
        const secondsPerMinute = 60;
        const minutesPerHour = 60;
        const hoursPerDay = 24;
        const daysPerMonth = 30;
        const monthsPerYear = 12;

        const milliseconds = timeDifference;
        const seconds = milliseconds / millisecondsPerSecond;
        const minutes = seconds / secondsPerMinute;
        const hours = minutes / minutesPerHour;
        const days = hours / hoursPerDay;
        const months = days / daysPerMonth;
        const years = months / monthsPerYear;

        if (years >= 1) {
            return `${Math.floor(years)} year${Math.floor(years) !== 1 ? 's' : ''} ago`;
        } else if (months >= 1) {
            return `${Math.floor(months)} month${Math.floor(months) !== 1 ? 's' : ''} ago`;
        } else if (days >= 1) {
            return `${Math.floor(days)} day${Math.floor(days) !== 1 ? 's' : ''} ago`;
        } else if (hours >= 1) {
            return `${Math.floor(hours)} hour${Math.floor(hours) !== 1 ? 's' : ''} ago`;
        } else if (minutes >= 1) {
            return `${Math.floor(minutes)} minute${Math.floor(minutes) !== 1 ? 's' : ''} ago`;
        } else {
            return `${Math.floor(seconds)} second${Math.floor(seconds) !== 1 ? 's' : ''} ago`;
        }
    }
    return (
        <Card sx={{ width: { xs: '100%', sm: '358px', md: "320px", }, boxShadow: "none", borderRadius: 0, backgroundColor: "#121212", }}>
            <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`}>
                <CardMedia image={snippet?.thumbnails?.high?.url || demoThumbnailUrl} alt={snippet?.title}
                    sx={{ width: { xs: '100%', sm: '358px' }, height: 180, borderRadius: 5, width: "auto" }}
                />
            </Link>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} >
                    <img src={channelDetail?.thumbnails?.default?.url || demoThumbnailUrl}  style={{ height: "34px", width: "34px", borderRadius: "50%", marginTop: "20px", cursor: "pointer" }} />
                </Link>
                <CardContent sx={{ backgroundColor: "#121212", height: '80px' }}>
                    <Link to={videoId ? `/video/${videoId}` : demoVideoUrl} >
                        <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
                            {snippet?.title.slice(0, 50) || demoVideoTitle.slice(0, 50)}
                        </Typography>
                    </Link>
                    <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} >
                        <Typography variant="subtitle2" color="gray">
                            {snippet?.channelTitle || demoChannelTitle}
                            <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                        </Typography>
                    </Link>
                    <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} style={{ display: "flex", flexDirection: "row", gap: "2" }} >
                        <Typography variant="subtitle2" color="gray" style={{ marginRight: "10px" }}>
                            {snippet?.views || "1M views"}
                        </Typography>
                        <Typography variant="subtitle2" color="gray">
                            {getVideoAge(snippet?.publishTime) || "Long Ago"}
                        </Typography>
                    </Link>
                </CardContent>
            </div>
        </Card>
    );
}

export default VideoCard