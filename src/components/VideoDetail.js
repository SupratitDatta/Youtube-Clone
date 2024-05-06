import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
    const [videoDetail, setVideoDetail] = useState(null);
    const [videos, setVideos] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
            .then((data) => setVideoDetail(data.items[0]))

        fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
            .then((data) => setVideos(data.items))
    }, [id]);

    if (!videoDetail?.snippet) return <Loader />;

    const { snippet: { title, channelId, channelTitle, thumbnails }, statistics: { viewCount, likeCount } } = videoDetail;

    return (
        <Box minHeight="90vh">
            <Stack direction="row">
                <Box sx={{ width: "100%", paddingLeft: "2vw", paddingRight: "2vw", position: "sticky", top: "100px" }}>
                    <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
                    <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
                        {title}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
                        <Link to={`/channel/${channelId}`}>
                            <Stack direction="row" alignItems="center">
                                <img src={thumbnails?.high?.url} alt="Channel Logo" style={{ height: "34px", width: "34px", borderRadius: "50%", marginTop: "20px", cursor: "pointer" }} />
                                <Typography variant={{ sm: "subtitle1", md: 'h6' }} color="#fff" ml={1}>
                                    {channelTitle}
                                    <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                                </Typography>
                                <Button variant="contained" color="crimson">Subscribe</Button>
                            </Stack>
                        </Link>
                        <Stack direction="row" gap="20px" alignItems="center">
                            <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                {parseInt(viewCount).toLocaleString()} views
                            </Typography>
                            <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                {parseInt(likeCount).toLocaleString()} likes
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
                <Box sx={{ width: "50%", paddingLeft: "20px", maxHeight: "100vh", overflowY: "auto" }}>
                    <Videos videos={videos} direction="column" />
                </Box>
            </Stack>
        </Box>
    );
};

export default VideoDetail;



// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import ReactPlayer from "react-player";
// import { Typography, Box, Stack } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// import { Videos, Loader } from "./";
// import { fetchFromAPI } from "../utils/fetchFromAPI";

// const VideoDetail = () => {
//     const [videoDetail, setVideoDetail] = useState(null);
//     const [videos, setVideos] = useState(null);
//     const { id } = useParams();

//     useEffect(() => {
//         fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
//             .then((data) => setVideoDetail(data.items[0]))

//         fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
//             .then((data) => setVideos(data.items))
//     }, [id]);

//     if (!videoDetail?.snippet) return <Loader />;

//     const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

//     return (
//         <Box minHeight="90vh">
//             <Stack direction="row">
//                 <Box sx={{ width: "100%", paddingLeft: "2vw", paddingRight: "2vw", position: "sticky", top: "100px" }}>
//                     <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
//                     <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
//                         {title}
//                     </Typography>
//                     <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
//                         <Link to={`/channel/${channelId}`}>
//                             <Typography variant={{ sm: "subtitle1", md: 'h6' }} color="#fff" >
//                                 {channelTitle}
//                                 <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
//                             </Typography>
//                         </Link>
//                         <Stack direction="row" gap="20px" alignItems="center">
//                             <Typography variant="body1" sx={{ opacity: 0.7 }}>
//                                 {parseInt(viewCount).toLocaleString()} views
//                             </Typography>
//                             <Typography variant="body1" sx={{ opacity: 0.7 }}>
//                                 {parseInt(likeCount).toLocaleString()} likes
//                             </Typography>
//                         </Stack>
//                     </Stack>
//                 </Box>
//                 <Box sx={{ width: "50%", paddingLeft: "20px", maxHeight: "100vh", overflowY: "auto" }}>
//                     <Videos videos={videos} direction="column" />
//                 </Box>
//             </Stack>
//         </Box>
//     );
// };

// export default VideoDetail;
