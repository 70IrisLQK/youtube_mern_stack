import { useState } from 'react';
import Menu from './components/common/Menu';
import Navbar from './components/common/Navbar';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './utils/Theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Video from './pages/Video';
import Home from './pages/Home';
import Login from './pages/Login';
import Search from './pages/Search';

const Container = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.bgLighter};
`;

const Main = styled.div`
  flex: 7;
`;
const Wrapper = styled.div`
  padding: 22px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path='/'>
                  <Route index element={<Home type='random' />} />
                  <Route path='trending' element={<Home type='trending' />} />
                  <Route
                    path='subscription'
                    element={<Home type='subscription' />}
                  />
                  <Route path='search' element={<Search />} />
                  <Route path='login' element={<Login />}></Route>
                  <Route path='video'>
                    <Route path=':videoId' element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
