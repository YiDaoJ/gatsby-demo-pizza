import React from 'react';
import 'normalize.css';
import styled from 'styled-components';
import Footer from './Footer';
import GlobalStyles from '../styles/GlobalStyles';
import Nav from './Nav';
import Typography from '../styles/Typograph';
import stripes from '../assets/images/stripes.svg';

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyles />
      <Typography />
      <SiteBorderStyle>
        <ContentStyles>
          <Nav />
          {children}
          <Footer />
        </ContentStyles>
      </SiteBorderStyle>
    </>
  );
}

const ContentStyles = styled.div`
  background: white;
  padding: 2rem;
`;

const SiteBorderStyle = styled.div`
  max-width: 1000px;
  margin: 12rem auto 4rem auto;
  margin-top: clamp(2rem, 10vw, 12rem);
  background: white url(${stripes});
  background-size: 1500px; //调节条纹疏密
  padding: 5px;
  padding: clamp(5px, 1vw, 25px);
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.044);
  border: 5px solid white;
  @media (max-width: 1100px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;
