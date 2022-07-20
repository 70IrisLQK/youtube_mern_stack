import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import Comments from '../components/common/Comments';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  dislike,
  fetchVideoFailure,
  fetchVideoStart,
  fetchVideoSuccess,
  like,
} from '../redux/slice/VideoSlice';
import { subscription } from '../redux/slice/UserSlice';
import moment from 'moment';
import Recommendation from '../components/common/Recommendation';

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);

  const dispatch = useDispatch();

  const { videoId } = useParams();

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchVideo = async () => {
      dispatch(fetchVideoStart());
      try {
        const videoRes = await axios.get(`/api/v1/videos/${videoId}`);
        const channelRes = await axios.get(
          `/api/v1/users/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchVideoSuccess(videoRes.data));
      } catch (error) {
        dispatch(fetchVideoFailure());
      }
    };
    fetchVideo();
  }, [videoId, dispatch]);

  const handleLike = async () => {
    await axios.put(`/api/v1/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };

  const handleDisLike = async () => {
    await axios.put(`/api/v1/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSubscription = async () => {
    currentUser.subscribedUsers?.includes(channel._id)
      ? await axios.put(`/api/v1/users/unsubscribe/${channel._id}`)
      : await axios.put(`/api/v1/users/subscribe/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo && currentVideo.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views •{' '}
            {moment(currentVideo?.createdAt).fromNow()}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo &&
              currentVideo.likes.includes(currentUser && currentUser._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}
              {currentVideo && currentVideo.likes.length}
            </Button>
            <Button onClick={handleDisLike}>
              {currentVideo &&
              currentVideo.dislikes.includes(currentUser._id) ? (
                <ThumbDownOffAltIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.avatar} />
            <ChannelDetail>
              <ChannelName>{channel.username}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>
                {currentVideo && currentVideo.description}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSubscription}>
            {currentUser.subscribedUsers.includes(channel._id)
              ? 'SUBSCRIBED'
              : 'SUBSCRIBE'}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo && currentVideo._id} />
      </Content>
      <Recommendation tags={currentVideo && currentVideo.tags} />
    </Container>
  );
};

export default Video;
