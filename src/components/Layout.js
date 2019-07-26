import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Layout = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  .header {
    margin: 0;
    text-align: center;
    background: #282c34;
    color: white;
    padding: 20px;
  }
`;

export default ({ children }) => (
  <Wrapper>
    <Layout>{children}</Layout>
  </Wrapper>
);
