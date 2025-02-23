import React from 'react';
import styled from 'styled-components';

export default function ChatContainer() {
  return (
    <Container>
      Chat Container
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
`;