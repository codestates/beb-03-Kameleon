import styled from 'styled-components';

export const PollForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 -10px 20px;
`;
export const PollWrapper = styled.div`
  flex: 1 1;
  padding: 0 10px;
`;
export const PollLabel = styled.label<{
  isAgree: boolean | null;
  value: string;
}>`
  display: flex !important;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s;
  cursor: pointer;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  height: 80px;
  opacity: ${({ isAgree, value }) => {
    if (isAgree === true && value === 'yes') {
      return `1`;
    } else if (isAgree === false && value === 'no') {
      return `1`;
    } else {
      return '0.25';
    }
  }};
  text-transform: uppercase;

  border-color: ${({ value }) => {
    if (value === 'yes') {
      return `#66adff`;
    } else if (value === 'no') {
      return `#f15e7e`;
    }
  }};
  color: ${({ value }) => {
    if (value === 'yes') {
      return `#66adff`;
    } else if (value === 'no') {
      return `#f15e7e`;
    }
  }};
`;
export const PollInput = styled.input`
  border: 0;
  padding: 0;
  outline: 0;
  background: transparent;
  color: inherit;
  font: inherit;
`;
