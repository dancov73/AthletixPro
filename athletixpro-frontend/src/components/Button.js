// ...existing code...

const buttonStyle = {
    borderRadius: '12px',
    backgroundColor: 'red',
    // ...other styles...
};

// ...existing code...

function Button(props) {
    return (
        <button style={buttonStyle}>
            {props.children}
        </button>
    );
}

// ...existing code...
