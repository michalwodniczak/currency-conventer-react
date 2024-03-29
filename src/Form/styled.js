import styled from "styled-components";

export const Label = styled.span`
    display: block;
    margin: 0 auto;
    max-width: 250px;
    font-size: 20px;
    color: ${({ theme }) => theme.color.mineShaft};
`;

export const Input = styled.input`
    display: block;
    margin: 20px auto;
    width: 100%;
    max-width: 250px;
    padding: 10px;
    text-align: center;
`;

export const Button = styled.button`
    display: block;
    width: 100%;
    max-width: 250px;
    padding: 10px;
    margin: 20px auto;
    cursor: pointer;
`;

export const ResultText = styled.p`
    max-width: 500px;
    padding: 25px;
    border-radius: 5px;
    margin: 20px auto;
    text-align: center;
    background-color:${({ theme }) => theme.color.jungleGreen};
`;

export const Loading = styled.p`
    
    max-width: 500px;
    margin: 0 auto;
    min-height: 70px;
    background-color:${({theme}) => theme.color.jungleGreen};
    border-radius:5px;
`

export const Failure = styled.p`
    max-width: 500px;
    margin: 0 auto;
    background-color:${({theme}) => theme.color.jungleGreen};
    min-height: 70px;
    border-radius:5px;
`