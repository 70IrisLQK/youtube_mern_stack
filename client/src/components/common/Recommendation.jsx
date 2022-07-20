import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card';

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoRes = await axios.get(`/api/v1/videos/tags?tags=${tags}`);
        setVideos(videoRes.data);
      } catch (error) {}
    };
    fetchVideo();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (
        <Card type='sm' key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
