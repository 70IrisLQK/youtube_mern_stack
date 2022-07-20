import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const Container = styled.div`
  width: 360px;
  margin-bottom: 45px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 202px;
  background-color: #999;
`;

const Details = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
`;

const ChanelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChanelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  margin: 10px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});
  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`api/v1/users/${video.userId}`);
      setChannel(res.data);
    };

    fetchChannel();
  }, [video.userId]);

  return (
    <Link
      to={`/video/${video._id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChanelImage type={type} src={channel.avatar} />
          <Texts>
            <Title>{video.title}</Title>
            <ChanelName>{channel.username}</ChanelName>
            <Info>
              {video.views} Views • {moment(video.createdAt).fromNow()}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
