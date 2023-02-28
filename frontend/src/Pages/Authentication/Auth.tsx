'use client';

import styled from 'styled-components';
import { WINDOW_MD_THRESHOLD, WINDOW_SM_THRESHOLD } from '../../Utils/common';
import AuthBase from './AuthBase';

const Auth = styled(AuthBase)`
  background-color: #080710;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  *, *:before, *:after{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .content {
    /* height: 520px; */
    width: 400px;
    position: absolute;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
    @media screen and (max-width: ${WINDOW_MD_THRESHOLD}px) {
      width: 80%;
    }
    @media screen and (max-width: ${WINDOW_SM_THRESHOLD}px) {
      width: 90%;
    }
  }
  .content .shape{
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
  
    @media screen and (max-width: ${WINDOW_MD_THRESHOLD}px) {
      height: 150px;
      width: 150px;
    }
    @media screen and (max-width: ${WINDOW_SM_THRESHOLD}px) {
      height: 100px;
      width: 100px;
    }
  }
  .shape:first-child{
    background: linear-gradient(
      #1845ad,
      #23a2f6
    );
    left: -80px;
    top: -400px;
    @media screen and (max-width: ${WINDOW_MD_THRESHOLD}px) {
      left: -50px;
      top: -300px;
    }
    @media screen and (max-width: ${WINDOW_SM_THRESHOLD}px) {
      left: -10px;
      top: -250px;
    }
  }
  .shape:last-child{
    background: linear-gradient(
      to right,
      #ff512f,
      #f09819
    );
    right: -100px;
    bottom: -350px;
    @media screen and (max-width: ${WINDOW_MD_THRESHOLD}px) {
      right: -50px;
      bottom: -350px;
    }
    @media screen and (max-width: ${WINDOW_SM_THRESHOLD}px) {
      right: -10px;
      bottom: -250px;
    }
  }

  .auth-form {
    background-color: rgba(255,255,255,0.13);
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    padding: 50px 35px;
  
    @media screen and (max-width: ${WINDOW_MD_THRESHOLD}px) {
      padding: 30px 25px;
    }
    @media screen and (max-width: ${WINDOW_SM_THRESHOLD}px) {
      padding: 20px 15px;
    }
  }
  .auth-form * {
    font-family: 'Poppins',sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }
  .auth-form h3 {
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
  }

  label{
    display: block;
    font-size: 16px;
    font-weight: 500;
  }
  .validation-error {
    color: #ff3636;
    :empty {
      height: 24px;
    }
  }
  input {
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    margin-top: 8px;
    font-weight: 300;
    padding: 0 12px;
    font-size: 16px;
    @media screen and (max-width: ${WINDOW_MD_THRESHOLD}px) {
      height: 44px;
      padding: 0 10px;
    }
    @media screen and (max-width: ${WINDOW_SM_THRESHOLD}px) {
      height: 40px;
      padding: 0 8px;
    }
  }
  ::placeholder{
    color: #e5e5e5;
  }

  .submit-button {
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    padding: 15px 0;
    @media screen and (max-width: ${WINDOW_MD_THRESHOLD}px) {
      padding: 10px 0;
      font-size: 16px;
    }
    @media screen and (max-width: ${WINDOW_SM_THRESHOLD}px) {
      padding: 8px 0;
      font-size: 16px;
    }
  }

  .auth-form-footer {
    a {
      font-weight: bold;
      text-decoration: none;
      span {
        color: lightblue;
        cursor: pointer;

        :hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

export default Auth;
