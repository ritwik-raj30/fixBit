import React from 'react';
import styled from 'styled-components';
import mem1_pic from '../../assets/ambika.jpg';
import mem2_pic from '../../assets/ritwik.jpg';
import mem3_pic from '../../assets/kunal.jpg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  .members {
    margin: 80px auto;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .member img {
    width: 100%;
    border-radius: 10px;
    display: block;
  }

  .member {
    flex-basis: 31%;
  }
`;

const About = () => {
  return (
    <Container>
      <h2 className='heading'>Meet Us !!</h2>
      <div className="members">
        <div className="member">
          <img src={mem1_pic} alt='ambika' />
        </div>
        <div className="member">
          <img src={mem2_pic} alt='ritwik' />
        </div>
        <div className="member">
          <img src={mem3_pic} alt='kunal' />
        </div>
      </div>
    </Container>
  );
};

export default About;
