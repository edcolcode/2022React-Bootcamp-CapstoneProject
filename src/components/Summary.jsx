const Summary = () => {
    const error =  Error('Not implemented yet');

    const throwError = () => {
        throw error;
    };

    return (
        <>
            {throwError()}
        </>
    );
};

export default Summary;