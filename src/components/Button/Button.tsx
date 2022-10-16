import React from 'react'
import { styled } from '../../styles';

const Button = styled('button', {
  backgroundColor: '$blue9',
  borderRadius: '0.5rem',
  color: '$gray12',
  fontSize: '13px',
  fontFamily: '$main',
  padding: '10px 15px',
  border: 'none',
  transition: '0.3s all',
  '&:hover': {
    backgroundColor: '$blue8',
    cursor: 'pointer'
  },
});

export { Button }

