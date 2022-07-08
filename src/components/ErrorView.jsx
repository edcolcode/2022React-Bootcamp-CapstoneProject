import styled from 'styled-components';

const StyledErrorDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 100%;
    height: 100%;
`

const Error = ({error, resetErrorBoundary}) => {
    // TODO: Log to some service or functionality
    console.log(error);

    const onReturnClick = (event) => {
        event.preventDefault();
        resetErrorBoundary();
    }

    return (
        <StyledErrorDiv>
            <h2>Something went wrong :(</h2>
            <a 
                href="/"
                onClick={onReturnClick}
            >
                Return to home page
            </a>
        </StyledErrorDiv>
    );
};

export default Error;